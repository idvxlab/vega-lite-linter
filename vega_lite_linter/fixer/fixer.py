from .rules import Rules
from .cost import TransitionCost
from .actions import applyActions
from vega_lite_linter.translator import translator
from vega_lite_linter.linter import linter
from .optimize import optimize

import copy

def fixer(vl, facts, v_rules, allFields):
    # 1. get all possible actions
    detailActions = []
    for rule in v_rules:
        rid = rule['id']
        detailActions.append(getActions(vl, rid, rule["param1"], rule["param2"]))
    # return detailActions
    # 2. get all possible actions score
    # two parts of score:
    #   1. reward = 动作减少的违背 - alpha * 动作增加的违背
    #   2. cost = 动作的transition cost from Graphscape
    for index, rule in enumerate(detailActions):
        for action in rule:
            rid = action['rid']
            # todo 测试所有action的transitioncost正常计算得到
            transitionCost = getTransitionCost(action)

            if transitionCost:
                action['transition'] = transitionCost / 4.71
            else:
                action['transition'] = 1

            actionReward, newvl, fixRules, intro = getActionReward(vl, v_rules, rid, action, allFields)
            if actionReward:
                action['reward'] = actionReward
            else:
                action['reward'] = 0
            
            # 如果这个action intro 为空字符，说明无法执行这个动作
            # 从动作空间剔除掉
            if intro:
                action['_delete'] = False
            else:
                action['_delete'] = True
            
            w1 = 0.8
            w2 = 0.2
            action['score'] = w1 * action['reward'] - w2 * action['transition']
            # action['newvl'] = newvl
            action['fixRules'] = fixRules
            action['rid_idx'] = index
            action['action_intro'] = intro

    detailActionsFilter = [[action for action in rule if not action['_delete']] for rule in detailActions]

    # 3. use linear programming to find optimal set of actions
    # add action attribute 'apply' 
    updateActions, optimizeActions = optimize(detailActionsFilter)

    # remove duplicate actions
    optimizeActionsSet = set()
    newvl = copy.deepcopy(vl)
    for action in optimizeActions:
        actionName = action['action'] if action['action']!="REMOVE_COUNT" else "REMOVE_AGGREGATE"
        actionsParam = (actionName, action['param1'], action['param2'], action['action_intro'])
        if actionsParam in optimizeActionsSet:
            continue
        
        newvl, _ = applyActions(newvl, action['rid'], action, allFields)
        optimizeActionsSet.add(actionsParam)

    res = {
        'fixable': True if optimizeActions else False,
        'optimize_spec': newvl if optimizeActions else {},
        'optimize_actions': [{'action': action[0], 'param1': action[1], 'param2': action[2], 'action_intro': action[3]} for action in list(optimizeActionsSet)],#list(optimizeActionsSet),
        'possible_actions': updateActions,
        'violate_rules': v_rules,
        'origin_spec': vl
    }

    return res




def getActions(vl, rid, param1="", param2=""):
    generalActions = Rules.rules[rid]["actions"]
    actions = []
    
    for action in generalActions:
        if 'CHANGE_MARK' in action:
            actions.extend(getMarkActions(vl, rid))
        elif 'CHANGE_CHANNEL' in action:
            actions.extend(getChangeChannelActions(vl, rid, param1, param2))
        elif 'REMOVE_STACK' in action:
            stacked = ''
            for encoding in vl['encoding']:
                if "stack" in vl['encoding'][encoding]:
                    stacked = encoding
                    break
            if stacked:
                actions.append({
                    "action": "REMOVE_STACK",
                    "param1": stacked,
                    "param2": "",
                    "rid": rid})
        else:
            if '(' in action:
                presetParam = action.split("'")[1].lower()
                actions.append({
                    "action": action.split('(')[0],
                    "param1": presetParam,
                    "param2": "",
                    "rid": rid
                })
            else:
                actions.append({
                    "action": action,
                    "param1": param1,
                    "param2": param2,
                    "rid": rid
                })
    return actions


def getMarkActions(vl, rid):
    marks = ['area', 'bar', 'line', 'point', 'tick']
    # todo 默认一定有mark吗
    prevMark = vl['mark']
    actions = [{"action": ((prevMark + '_' + nextMark).upper()), 
                "param1": "", 
                "param2": "", 
                "rid": rid, 
                "originAction": "CHANGE_MARK"} for nextMark in marks if nextMark != prevMark]

    return actions

def getChangeChannelActions(vl, rid, channel, param2=""):
    if rid == 'stack_without_discrete_color_2':
        if 'color' not in vl['encoding']:
            actions = [{"action": "MOVE_"+channel.upper()+"_COLOR", 
                        "param1": channel, 
                        "param2": param2, 
                        "rid": rid, 
                        "originAction": "CHANGE_CHANNEL"}]
            return actions
    channels = ["X", "Y", "SIZE", "COLOR"]
    channelUsed = [channel.upper() for channel in list(vl["encoding"].keys())]

    actions = [{"action": (('MOVE_' + channel + '_' + newChannel).upper()), 
                "param1": "", 
                "param2": "", 
                "rid": rid, 
                "originAction": "CHANGE_CHANNEL"}
                for newChannel in channels if newChannel not in channelUsed]

    return actions

def getTransitionCost(action):
    if "originAction" in action and action['originAction'] == "CHANGE_MARK":
        return getattr(TransitionCost, action["action"])
    elif 'MOVE_' in action['action'] and not 'REMOVE_' in action['action']:
        return getattr(TransitionCost, action["action"])
    elif 'CHANGE_TYPE' in action['action'] or ('CORRECT' in action['action']):
        return getattr(TransitionCost, action["action"])
    elif 'LOG' in action['action'] or 'BIN' in action['action'] or 'ZERO' in action['action']:
        return getattr(TransitionCost, action["action"])
    elif action['param1']:
        return getattr(TransitionCost, action["action"] + '_' + action["param1"].upper())
    else:
        if action['action'] in ['REMOVE_COUNT_X', "REMOVE_COUNT_Y"]:
            return getattr(TransitionCost, action["action"])
    # else:

def getActionReward(vl, currRules, rid, action, allFields):
    """Compute the reward of a given action.

    Keyword arguments:
    vl -- the origin vegalite json
    currRules -- the rule set that vl violates
    rid -- the rule id considering this action
    action -- the current action
    allFields -- all fields in data

    Return:
    reward -- reward of the given action on the vl

    """
    # 1. get new vl after performing action
    newvl, intro = applyActions(vl, rid, action, allFields)
    # 2. get new rules of new vl from linter
    newSpec = translator(newvl, allFields)
    newRules = linter(newSpec)
    # 3. compare two rule set 
    # |c_i - c_i+1| / |c_i| - alpha * |c_i+1 - c_i| / |c_i+1|
    alpha = 0.05
    
    desSize = 0
    incSize = 0
    fixRules = []
    for index, curr in enumerate(currRules):
        if curr not in newRules:
            fixRules.append(index)
            desSize += 1
    for newr in newRules:
        if newr not in currRules:
            incSize += 1

    if len(newRules):
        reward = desSize / len(currRules) - alpha * incSize / len(newRules)
    else:
        reward = desSize / len(currRules)
    
    return reward, newvl, fixRules, intro

