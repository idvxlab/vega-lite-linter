import copy
from difflib import SequenceMatcher

def applyActions(vl, rid, action, allFields):
    """Apply action and return new vegalite json

    Keyword arguments:
    vl -- the origin vegalite json
    rid -- the rule id considering this action
    action -- the current action
    allFields -- all fields in data

    """
    actionName = action['action']
    if 'originAction' in action.keys():
        if action['originAction'] == "CHANGE_MARK":
            newvl = CHANGE_MARK(vl, action)
        elif action['originAction'] == "CHANGE_CHANNEL":
            newvl = CHANGE_CHANNEL(vl, action, rid)
    elif actionName == 'BIN':
        newvl = BIN(vl, action)
    elif actionName == 'REMOVE_BIN':
        newvl = REMOVE_BIN(vl, action)
    elif actionName.startswith("AGGREGATE"): # AGGREGATE_[]
        newvl = AGGREGATE(vl, action, rid)
    elif actionName.startswith('REMOVE_AGGREGATE'): # REMOVE_AGGREGATE_[]
        newvl = REMOVE_AGGREGATE(vl, action)
    elif actionName.startswith('CHANGE_AGGREGATE'):
        newvl = CHANGE_AGGREGATE(vl, action, rid)
    elif actionName.startswith("ADD_COUNT"):
        newvl = ADD_COUNT(vl, action)
    elif actionName.startswith("REMOVE_COUNT"):
        newvl = REMOVE_COUNT(vl, action, rid)
    elif actionName.startswith('REMOVE_LOG'): # 没有LOG
        newvl = REMOVE_LOG(vl, action)
    elif actionName.startswith("ZERO"):
        newvl = ZERO(vl, action)
    elif actionName.startswith("REMOVE_ZERO"):
        newvl = REMOVE_ZERO(vl, action)
    elif actionName.startswith("STACK"):
        newvl = STACK(vl, action)
    elif actionName.startswith("REMOVE_STACK"):
        newvl = REMOVE_STACK(vl, action)
    elif actionName.startswith("ADD_CHANNEL"):
        newvl = ADD_CHANNEL(vl, action, allFields)
    elif actionName.startswith("REMOVE_CHANNEL"):
        newvl = REMOVE_CHANNEL(vl, action, rid)
    elif actionName.startswith("ADD_FIELD"):
        newvl = ADD_FIELD(vl, action, allFields)
    elif actionName.startswith("REMOVE_FIELD"):
        newvl = REMOVE_FIELD(vl, action)
    elif actionName.startswith("CHANGE_FIELD"):
        newvl = CHANGE_FIELD(vl, action, rid, allFields)
    elif actionName.startswith("CHANGE_TYPE"):
        newvl = CHANGE_TYPE(vl, action, allFields)
    elif actionName.startswith("CORRECT_MARK"):
        newvl = CORRECT_MARK(vl, action)
    elif actionName.startswith("CORRECT_CHANNEL"):
        newvl = CORRECT_CHANNEL(vl, action)
    elif actionName.startswith("CORRECT_TYPE"):
        newvl = CORRECT_TYPE(vl, action)
    elif actionName.startswith("CORRECT_AGGREGATE"):
        newvl = CORRECT_AGGREGATE(vl, action)
    elif actionName.startswith("CORRECT_BIN"):
        newvl = CORRECT_BIN(vl, action)
    else:
        # TODO default case
        # what to do?
        newvl = copy.deepcopy(vl)

    return newvl

def CHANGE_MARK(vl, action):
    newvl = copy.deepcopy(vl)
    newMark = action['action'].split('_')[1]
    newvl['mark'] = newMark.lower()

    return newvl

def BIN(vl, action):
    newvl = copy.deepcopy(vl)
    param1 = action['param1'].lower()
    if param1 and param1 in newvl['encoding']:
        newvl['encoding'][param1]['bin'] = {"maxbins": 10}
    
    return newvl

def REMOVE_BIN(vl, action):
    newvl = copy.deepcopy(vl)
    param1 = action['param1'].lower()
    if param1 and param1 in newvl['encoding']:
        if 'bin' in newvl['encoding'][param1]:
            newvl['encoding'][param1].pop('bin')
    
    return newvl

def AGGREGATE(vl, action, rid):
    newvl = copy.deepcopy(vl)
    param1 = action['param1'].lower()

    if rid in ['aggregate_not_all_continuous', 'stack_with_non_positional_non_agg']:
        if param1 and param1 in newvl['encoding']:
            newvl['encoding'][param1]['aggregate'] = 'min'

    return newvl

def REMOVE_AGGREGATE(vl, action):
    newvl = copy.deepcopy(vl)
    param1 = action['param1'].lower()
    if param1 and param1 in newvl['encoding'] :
        newvl['encoding'][param1].pop('aggregate')
    
    return newvl

def CHANGE_AGGREGATE(vl, action, rid):
    newvl = copy.deepcopy(vl)
    param1 = action['param1'].lower()
    if param1 and param1 in newvl['encoding']:
        if rid == 'aggregate_o_valid':
            # hard(aggregate_o_valid,C,A) :- type(E,ordinal), aggregate(E,A), A != min, A != max, A != median, channel(E, C).
            newvl['encoding'][param1]['aggregate'] = 'min'
        elif rid == 'aggregate_t_valid':
            # hard(aggregate_t_valid,C,A) :- type(E,temporal), aggregate(E,A), A != min, A != max, channel(E, C).
            newvl['encoding'][param1]['aggregate'] = 'min'
        elif rid == 'stack_without_summative_agg':
            # hard(stack_without_summative_agg,C,A) :- stack(E,_), aggregate(E,A), not summative_aggregate_op(A), channel(E, C).
            # summative_aggregate_op(count;sum).
            newvl['encoding'][param1]['aggregate'] = 'sum'
    
    return newvl

def ADD_COUNT(vl, action):
    newvl = copy.deepcopy(vl)
    param1 = action["param1"].lower()
    if param1 and param1 in newvl['encoding']:
        newvl['encoding'][param1]['aggregate'] = 'count'
    
    return newvl

def REMOVE_COUNT(vl, action, rid):
    newvl = copy.deepcopy(vl)
    param1 = action['param1'].lower()
    if param1 and param1 in newvl['encoding']:
        if rid == 'count_on_x_and_y' and "aggregate" in newvl['encoding'][param1]:
            newvl['encoding'][param1].pop("aggregate")
        else:
            if param1 and param1 in newvl['encoding'] and "aggregate" in newvl['encoding'][param1]:
                newvl['encoding'][param1].pop("aggregate")
    
    return newvl

def REMOVE_LOG(vl, action):
    newvl = copy.deepcopy(vl)
    param1 = action['param1'].lower()
    if param1 and param1 in newvl['encoding']:
        if 'scale' in newvl['encoding'][param1] and 'type' in newvl['encoding'][param1]['scale']:
            newvl['encoding'][param1]['scale'].pop("type") # { "type": "log" }
    
    return newvl

def ZERO(vl, action):
    newvl = copy.deepcopy(vl)
    param1 = action['param1'].lower()
    # 需要加zero 说明原来写了"zero: false"
    if param1 and param1 in newvl['encoding']:
        if 'scale' in newvl['encoding'][param1] and 'zero' in newvl['encoding'][param1]['scale']:
            newvl['encoding'][param1]['scale']['zero'] = True
    
    return newvl

def REMOVE_ZERO(vl, action):
    newvl = copy.deepcopy(vl)
    param1 = action['param1'].lower()
    # 需要删除zero，说明zero在这个情况下的声明不合法
    if param1 and param1 in newvl['encoding']:
        if 'scale' in newvl['encoding'][param1] and 'zero' in newvl['encoding'][param1]['scale']:
            newvl['encoding'][param1]['scale'].pop('zero')
    
    return newvl

def STACK(vl, action):
    # no used
    newvl = copy.deepcopy(vl)
    return newvl

def REMOVE_STACK(vl, action):
    newvl = copy.deepcopy(vl)
    param1 = action['param1'].lower()

    # find stacked channel
    stacked = ''
    for encoding in vl['encoding']:
        if 'stack' in vl['encoding'][encoding]:
            stacked = encoding

    if stacked and stacked in newvl['encoding']:
        newvl['encoding'][stacked].pop('stack')
    
    return newvl

def ADD_CHANNEL(vl, action, allFields):
    # hard(no_encodings) :- not encoding(_).
    # hard(point_tick_bar_without_x_or_y) :- mark(point;tick;bar), not channel(_,x), not channel(_,y).
    # hard(line_area_without_x_y) :- mark(line;area), not channel(_,(x;y)).
    newvl = copy.deepcopy(vl)
    param1 = action['param1'].lower()

    if not allFields:
        return newvl
    if param1 in newvl['encoding']:
        # already have [param1] encoding
        return newvl

    if not param1:
        param1 = 'x'

    # prefer to add quantitative?
    useF = {}
    for field in allFields:
        if field['fieldtype'] == 'number':
            useF = field
            break
    
    if not useF:
        useF = allFields[0]

    newvl['encoding'][param1] = {
        "field": useF['field'],
        "type": useF['type']
    }
    return newvl

def REMOVE_CHANNEL(vl, action, rid):
    newvl = copy.deepcopy(vl)
    param1 = action['param1'].lower()
    if param1 and param1 in newvl['encoding']:
        if rid == 'repeat_channel':   
            # repeat了channel 删除带有dupl标签的
            for channel in newvl['encoding'].keys():
                if param1 + '_dupl_' in channel:
                    # that's it
                    newvl['encoding'].pop(channel)
        elif param1 in newvl['encoding']:
            newvl['encoding'].pop(param1)
    
    return newvl

def CHANGE_CHANNEL(vl, action, rid):
    newvl = copy.deepcopy(vl)
    prevChannel = action['action'].split('_')[1].lower()
    newChannel = action['action'].split('_')[2].lower()
    if rid == 'repeat_channel':
        # repeat了channel 替换带有dupl标签的
        for channel in newvl['encoding'].keys():
            if prevChannel + '_dupl_' in channel:
                # that's it
                newvl['encoding'][newChannel] = newvl['encoding'].pop(channel)

    else:
        newvl['encoding'][newChannel] = newvl['encoding'].pop(prevChannel)

    return newvl

def ADD_FIELD(vl, action, allFields):
    newvl = copy.deepcopy(vl)
    param1 = action['param1'].lower()
    if param1 not in newvl['encoding']:
        return newvl

    # hard(encoding_no_field_and_not_count,C) :- not field(E,_), not aggregate(E,count), encoding(E), channel(E, C).
    if not allFields:
        return newvl

    # prefer to add quantitative?
    useF = {}
    for field in allFields:
        if field['fieldtype'] == 'number':
            useF = field
            break
    
    if not useF:
        useF = allFields[0]
    
    newvl['encoding'][param1]['field'] = useF['field']
    newvl['encoding'][param1]['type'] = useF['type']

    return newvl

def REMOVE_FIELD(vl, action):
    newvl = copy.deepcopy(vl)
    param1 = action['param1'].lower()
    
    if param1 and param1 in newvl['encoding'] and 'field' in newvl['encoding'][param1]:
        newvl['encoding'][param1].pop('field')
    
    return newvl

def CHANGE_FIELD(vl, action, rid, allFields):
    newvl = copy.deepcopy(vl)
    param1 = action['param1'].lower()

    if not allFields:
        return newvl
    if param1 not in newvl['encoding']:
        return newvl
    usedFields = []
    for encoding in vl['encoding']:
        if 'field' in vl['encoding'][encoding]:
            usedFields.append(vl['encoding'][encoding]["field"])
    
    if rid in ['bin_q_o', 'log_q', 'zero_q', 'log_discrete', 'line_area_with_discrete', 'bar_tick_area_line_without_continuous_x_y']:
        if param1 in newvl['encoding'] and 'field' in newvl['encoding'][param1]:
            currField = newvl['encoding'][param1]['field']
            qField = {}
            for field in allFields:
                if field['fieldtype'] == 'number' and field['field'] not in usedFields:
                    qField = field
                    break
            if qField:
                newvl['encoding'][param1]['field'] = qField['field']
                newvl['encoding'][param1]['type'] = qField['type']
    
    elif rid in ['stack_discrete']:
        currField = newvl['encoding'][param1]['field']
        currType = newvl['encoding'][param1]['type']
        if currType != 'quantitative':
            # change field to continuous
            qField = {}
            for field in allFields:
                if field['fieldtype'] == 'number' and field['field'] not in usedFields:
                    qField = field
                    break
            if qField:
                newvl['encoding'][param1]['field'] = qField['field']
                newvl['encoding'][param1]['type'] = qField['type']
    
    elif rid in ['same_field_x_and_y']:
        currField = newvl['encoding'][param1]['field']
        currType = newvl['encoding'][param1]['type']
        qField = {}
        for field in allFields:
            if field['type'] == currType and field['field'] not in usedFields:
                qField = field
                break
        if qField:
            newvl['encoding'][param1]['field'] = qField['field']
            newvl['encoding'][param1]['type'] = qField['type']
    elif rid in ['bar_tick_continuous_x_y', 'stack_without_discrete_color_or_detail']:
        # 找ordinal nominal field
        qField = {}
        for field in allFields:
            if field['type'] in ['orindal', 'nominal'] and field['field'] not in usedFields:
                qField = field
                break
        
        if qField:
            newvl['encoding'][param1]['field'] = qField['field']
            newvl['encoding'][param1]['type'] = qField['type']

    return newvl

def CHANGE_TYPE(vl, action, allFields):
    newvl = copy.deepcopy(vl)
    param1 = action['param1'].lower()

    if not allFields or (param1 not in newvl['encoding']):
        return newvl

    if 'aggregate' in newvl['encoding'][param1] and newvl['encoding'][param1]['aggregate'] == 'count':
        newvl['encoding'][param1]['type'] = 'quantitative'
    else:
        currField = vl['encoding'][param1]['field']
        correctType = ""
        for field in allFields:
            if field['field'] == currField:
                correctType = field['type']
                newvl['encoding'][param1]['type'] = correctType

    return newvl

def CORRECT_MARK(vl, action):
    newvl = copy.deepcopy(vl)
    param1 = action['param1'].lower()

    possibleMark = ['area', 'bar', 'line', 'point', 'tick']
    score = []
    for mark in possibleMark:
        score.append(similar(param1, mark))
    maxPMark = possibleMark[score.index(max(score))]
    newvl['mark'] = maxPMark
    return newvl

def CORRECT_CHANNEL(vl, action):
    newvl = copy.deepcopy(vl)
    param1 = action['param1'].lower()
    param2 = action['param2'].lower()

    if param1 not in newvl['encoding']:
        return newvl

    possibleChannel = ['x', 'y', 'size', 'color']
    for channel in vl['encoding']:
        if channel in possibleChannel:
            possibleChannel.remove(channel)
    score = []
    for channel in possibleChannel:
        score.append(similar(param1, channel))
    
    maxPChannel = possibleChannel[score.index(max(score))]
    newvl['encoding'][maxPChannel] = newvl['encoding'].pop(param1)
    return newvl

def CORRECT_TYPE(vl, action):
    newvl = copy.deepcopy(vl)
    param1 = action['param1'].lower()
    param2 = action['param2'].lower()

    if param1 not in newvl['encoding']:
        return newvl

    possibleType = ["quantitative", "ordinal", "nominal", "temporal"]
    score = []
    for ptype in possibleType:
        score.append(similar(param2, ptype))
    
    maxPType = possibleType[score.index(max(score))]
    newvl['encoding'][param1]['type'] = maxPType
    
    return newvl

def CORRECT_AGGREGATE(vl, action):
    newvl = copy.deepcopy(vl)
    param1 = action['param1'].lower()
    param2 = action['param2'].lower()

    if param1 not in newvl['encoding']:
        return newvl

    possibleAgg = ["count", "mean", "median", "min", "max", "stdev", "sum"]
    score = []
    for agg in possibleAgg:
        score.append(similar(param2, agg))
    
    maxPAgg = possibleAgg[score.index(max(score))]
    newvl['encoding'][param1]['aggregate'] = maxPAgg
    
    return newvl

def CORRECT_BIN(vl, action):
    newvl = copy.deepcopy(vl)
    param1 = action['param1'].lower()
    param2 = int(action['param2'])

    if param1 not in newvl['encoding']:
        return newvl

    if param2 < 0:
        newvl['encoding'][param1]['bin']['maxbins'] = -param2
    else:
        newvl['encoding'][param1]['bin']['maxbins'] = 10

    
    return newvl

def similar(a, b):
    return SequenceMatcher(None, a, b).ratio()