from pulp import *

def optimize(actions):
    if not actions:
        return [], []
    prob = LpProblem('fixer', LpMaximize)

    flatAction = [action for rule in actions for action in rule]
    ACTION_SIZE = len(flatAction)
    

    # set LP variables
    X = [LpVariable("action_{}".format(i), lowBound = 0,  upBound = 1, cat='Binary') for i in range(len(flatAction))]
    X.sort(key=lambda x: int(x.name.split('_')[1]))
    # set objective
    z = 0
    for i in range(ACTION_SIZE):
        z += X[i] * flatAction[i]['score']
    prob += z

    # add constraints
    
    
    # always take same actions among rules
    # 找到相同的action
    actionsDict = {}
    for i in range(len(flatAction)):
        action = flatAction[i]
        key = action['action'] + '_' + action['param1'] #+ '_' + action['param2']
        if key in actionsDict:
            actionsDict[key].append(i)
        else:
            actionsDict[key] = [i]
        
    # 建立dict，key为rule idx，值为当前可以解决这个rule的action
    ruleToActions = {}
    for index, action in enumerate(flatAction):
        action_key = action['action'] + '_' + action['param1'] #+ '_' + action['param2']

        for rule in action['fixRules']:
            rid = rule
            if 'rid_' + str(rid) not in ruleToActions: # rid还没有对应的action
                ruleToActions['rid_' + str(rid)] = set([index])
            elif not ruleToActions['rid_' + str(rid)] & set(actionsDict[action_key]): # ! rid已经有了和当前action index 对应的同等action
                ruleToActions['rid_' + str(rid)].add(index)

    isAllConflict = checkConflict(ruleToActions, ACTION_SIZE)
    # 如果出现不可解的情况
    if isAllConflict:
        # actions from same rule only take one
        index = 0
        for rule in actions:
            size = len(rule)
            prob += sum(X[index: index+size]) == 1
            index += size
    else:
        ### update - actions for same rule only take one
        for rule in ruleToActions:
            prob += sum([X[i] for i in ruleToActions[rule]]) == 1

    
    for key in actionsDict:
        if len(actionsDict[key]) == 1:
            continue
        for index in range(1, len(actionsDict[key])):
            prob += X[actionsDict[key][index-1]] == X[actionsDict[key][index]]
            
    # solve the prob 
    # PULP_CBC_CMD(msg=0) for slience
    status = prob.solve(PULP_CBC_CMD(msg=0))

    if LpStatus[status] != 'Optimal':
        return [], []
    result = [0] * len(flatAction)

    for i in prob.variables():
        if 'dummy' in i.name:
            continue
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
            

    

def checkConflict(ruleToActions, size):
    # 利用联通图的概念，把两个action互相矛盾定义为联通
    # 如果存在某一个rule，他的所有action都已经互相矛盾
    # 则不能使用新方法来求解
    uf = [i for i in range(size)]

    actionOfRules = [list(ruleToActions[rid]) for rid in ruleToActions ]
    actionOfRules.sort(key = lambda a: len(a))
    def find(x):
        if uf[x] != x:
            uf[x] = find(uf[x])
        return uf[x]
    
    def union(x, y):
        uf[find(y)] = find(x)
    
    def isConnected(x, y):
        return find(x) == find(y)

    for rule in actionOfRules:
        # 首先检查所有规则的联通性
        if len(rule) <= 1:
            continue
        connected = 0
        for index in range(1, len(rule)):
            if isConnected(rule[0], rule[index]):
                connected+=1

        if connected == len(rule) - 1:
            return True
        else: # 如果这个规则对应的action合法。联通
            for index in range(1, len(rule)):
                union(rule[0], rule[index])
    
    return False

