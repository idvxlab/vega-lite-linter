from pulp import *

def optimize(actions):
    if not actions:
        return [], []
    prob = LpProblem('fixer', LpMaximize)


    flatAction = [action for rule in actions for action in rule]

    rulesDict = {}
    for i in range(len(flatAction)):
        thisAction = flatAction[i]
        index = thisAction['rid_idx'] # 这个action针对的rid_idx
        key = thisAction['action'] + '_' + thisAction['param1'] + '_' + thisAction['param2'] # 这个action的具体动作
        for fixRule in thisAction['fix']:
            # 检查 这个action 是不是能解决预设之外的rule, 并且这个action不相同
            # if fixRule != index and i not in actionsDict[key]:
            if index in rulesDict:
                rulesDict[index].add(i)
            else:
                rulesDict[index] = set([i])

    actionsDict = {}
    for i in range(len(flatAction)):
        action = flatAction[i]
        key = action['action'] + '_' + action['param1'] + '_' + action['param2']
        if key in actionsDict:
            actionsDict[key].append(i)
        else:
            actionsDict[key] = [i]
        
        if i in rulesDict[action['rid_idx']]:
            rulesDict[action['rid_idx']].remove(i)

    print(rulesDict)
            

    # set LP variables
    X = [LpVariable("action_{}".format(i), lowBound = 0,  upBound = 1, cat='Binary') for i in range(len(flatAction))]
    X.sort(key=lambda x: int(x.name.split('_')[1]))

    # set objective
    z = 0
    for i in range(len(flatAction)):
        z += X[i] * flatAction[i]['score']
    prob += z

    # add constraints
    # actions from same rule only take one
    index = 0
    for rule in actions:
        size = len(rule)
        prob += sum(X[index: index+size]) == 1
        index += size
    # always take same actions among rules
    for key in actionsDict:
        if len(actionsDict[key]) == 1:
            continue
        for index in range(1, len(actionsDict[key])):
            prob += X[actionsDict[key][index-1]] == X[actionsDict[key][index]]
            
    # solve the prob
    status = prob.solve(PULP_CBC_CMD(msg=0))

    if LpStatus[status] != 'Optimal':
        return [], []

    result = [0] * len(flatAction)
    for i in prob.variables():
        index = int(i.name.split('_')[1])
        result[index] = i.varValue

    # add result in to actions
    applyActions = []
    for rule in actions:
        for action in rule:
            res = result.pop(0)
            if res == 1:
                applyActions.append(action)
            action['apply'] = res
    
    return actions, applyActions
            

    
