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
            newvl, intro = CHANGE_MARK(vl, action)
        elif action['originAction'] == "CHANGE_CHANNEL":
            newvl, intro = CHANGE_CHANNEL(vl, action, rid)
    elif actionName == 'BIN':
        newvl, intro = BIN(vl, action)
    elif actionName == 'REMOVE_BIN':
        newvl, intro = REMOVE_BIN(vl, action)
    elif actionName.startswith("AGGREGATE"): # AGGREGATE_[]
        newvl, intro = AGGREGATE(vl, action, rid)
    elif actionName.startswith('REMOVE_AGGREGATE'): # REMOVE_AGGREGATE_[]
        newvl, intro = REMOVE_AGGREGATE(vl, action)
    elif actionName.startswith('CHANGE_AGGREGATE'):
        newvl, intro = CHANGE_AGGREGATE(vl, action, rid)
    elif actionName.startswith("ADD_COUNT"):
        newvl, intro = ADD_COUNT(vl, action)
    elif actionName.startswith("REMOVE_COUNT"):
        newvl, intro = REMOVE_COUNT(vl, action, rid)
    elif actionName.startswith('REMOVE_LOG'): # 没有LOG
        newvl, intro = REMOVE_LOG(vl, action)
    elif actionName.startswith("ZERO"):
        newvl, intro = ZERO(vl, action)
    elif actionName.startswith("REMOVE_ZERO"):
        newvl, intro = REMOVE_ZERO(vl, action)
    elif actionName.startswith("STACK"):
        newvl, intro = STACK(vl, action)
    elif actionName.startswith("REMOVE_STACK"):
        newvl, intro = REMOVE_STACK(vl, action)
    elif actionName.startswith("ADD_CHANNEL"):
        newvl, intro = ADD_CHANNEL(vl, action, allFields)
    elif actionName.startswith("REMOVE_CHANNEL"):
        newvl, intro = REMOVE_CHANNEL(vl, action, rid)
    elif actionName.startswith("ADD_FIELD"):
        newvl, intro = ADD_FIELD(vl, action, allFields)
    elif actionName.startswith("REMOVE_FIELD"):
        newvl, intro = REMOVE_FIELD(vl, action)
    elif actionName.startswith("CHANGE_FIELD"):       
        newvl, intro = CHANGE_FIELD(vl, action, rid, allFields)
    elif actionName.startswith("CHANGE_TYPE"):
        newvl, intro = CHANGE_TYPE(vl, action, allFields)
    elif actionName.startswith("CORRECT_MARK"):
        newvl, intro = CORRECT_MARK(vl, action)
    elif actionName.startswith("CORRECT_CHANNEL"):
        newvl, intro = CORRECT_CHANNEL(vl, action)
    elif actionName.startswith("CORRECT_TYPE"):
        newvl, intro = CORRECT_TYPE(vl, action)
    elif actionName.startswith("CORRECT_AGGREGATE"):
        newvl, intro = CORRECT_AGGREGATE(vl, action)
    elif actionName.startswith("CORRECT_BIN"):
        newvl, intro = CORRECT_BIN(vl, action)
    else:
        newvl = copy.deepcopy(vl)
        intro = ""

    return newvl, intro

def CHANGE_MARK(vl, action):
    oldMark = vl['mark']
    newvl = copy.deepcopy(vl)
    newMark = action['action'].split('_')[1]
    newvl['mark'] = newMark.lower()
    intro = "Change mark type from " + oldMark + " to " + newMark + "."

    return newvl, intro.capitalize()

def BIN(vl, action):
    newvl = copy.deepcopy(vl)
    intro = ""
    param1 = action['param1'].lower()
    if param1 and param1 in newvl['encoding']:
        newvl['encoding'][param1]['bin'] = True
        intro = "Use bin in the channel " + param1 + '.'
    return newvl, intro.capitalize()

def REMOVE_BIN(vl, action):
    newvl = copy.deepcopy(vl)
    param1 = action['param1'].lower()
    intro = ""
    if param1 and param1 in newvl['encoding']:
        if 'bin' in newvl['encoding'][param1]:
            newvl['encoding'][param1].pop('bin')
            intro = "Remove bin in the channel " + param1 + '.'

    return newvl, intro.capitalize()

def AGGREGATE(vl, action, rid):
    newvl = copy.deepcopy(vl)
    param1 = action['param1'].lower()
    intro = ""
    if rid in ['aggregate_not_all_continuous', 'stack_with_non_positional_non_agg']:
        if param1 and param1 in newvl['encoding']:
            newvl['encoding'][param1]['aggregate'] = 'min'
            intro = "Use min aggregation for the data in the channel " + param1 + '.'
    return newvl, intro.capitalize()

def REMOVE_AGGREGATE(vl, action):
    newvl = copy.deepcopy(vl)
    param1 = action['param1'].lower()
    intro = ""
    if param1 and param1 in newvl['encoding'] and 'aggregate' in newvl['encoding'][param1]:
        newvl['encoding'][param1].pop('aggregate')
        intro = "Remove aggregation in the channel " + param1 + '.'
    return newvl, intro.capitalize()

def CHANGE_AGGREGATE(vl, action, rid):
    newvl = copy.deepcopy(vl)
    param1 = action['param1'].lower()
    intro = ""
    if param1 and param1 in newvl['encoding']:
        if rid == 'aggregate_o_valid':
            # hard(aggregate_o_valid,C,A) :- type(E,ordinal), aggregate(E,A), A != min, A != max, A != median, channel(E, C).
            newvl['encoding'][param1]['aggregate'] = 'min'
            intro = "Use min aggregation for the data in the channel " + param1 + ' instead.'
        elif rid == 'aggregate_t_valid':
            # hard(aggregate_t_valid,C,A) :- type(E,temporal), aggregate(E,A), A != min, A != max, channel(E, C).
            newvl['encoding'][param1]['aggregate'] = 'min'
            intro = "Use min aggregation for the data in the channel " + param1 + ' instead.'
        elif rid == 'stack_without_summative_agg':
            # hard(stack_without_summative_agg,C,A) :- stack(E,_), aggregate(E,A), not summative_aggregate_op(A), channel(E, C).
            # summative_aggregate_op(count;sum).
            newvl['encoding'][param1]['aggregate'] = 'sum'
            intro = "Use sum aggregation for the data in the channel " + param1 + ' instead.'
    
    return newvl, intro.capitalize()

def ADD_COUNT(vl, action):
    newvl = copy.deepcopy(vl)
    param1 = action["param1"].lower()
    intro = ""
    if param1 and param1 in newvl['encoding']:
        newvl['encoding'][param1]['aggregate'] = 'count'
        intro = "Use count aggregation for the data in the channel " + param1 + '.'
    
    return newvl, intro.capitalize()

def REMOVE_COUNT(vl, action, rid):
    newvl = copy.deepcopy(vl)
    param1 = action['param1'].lower()
    intro = ""
    if param1 and param1 in newvl['encoding']:
        if rid == 'count_on_x_and_y' and "aggregate" in newvl['encoding'][param1]:
            newvl['encoding'][param1].pop("aggregate")
            intro = "Remove aggregation in the channel " + param1 + '.'
        else:
            if param1 and param1 in newvl['encoding'] and "aggregate" in newvl['encoding'][param1]:
                newvl['encoding'][param1].pop("aggregate")
                intro = "Remove aggregation in the channel " + param1 + '.'
    
    return newvl, intro.capitalize()

def REMOVE_LOG(vl, action):
    newvl = copy.deepcopy(vl)
    param1 = action['param1'].lower()
    intro = ""
    if param1 and param1 in newvl['encoding']:
        if 'scale' in newvl['encoding'][param1] and 'type' in newvl['encoding'][param1]['scale']:
            newvl['encoding'][param1]['scale'].pop("type") # { "type": "log" }
            intro = "Remove log scale in the channel " + param1 + '.'
    return newvl, intro.capitalize()

def ZERO(vl, action):
    newvl = copy.deepcopy(vl)
    param1 = action['param1'].lower()
    intro=""
    # 需要加zero 说明原来写了"zero: false"
    if param1 and param1 in newvl['encoding']:
        if 'scale' in newvl['encoding'][param1] and 'zero' in newvl['encoding'][param1]['scale']:
            newvl['encoding'][param1]['scale']['zero'] = True
            intro = "Set the zero baseline in the scale of channel " + param1 + '.'
    return newvl, intro.capitalize()

def REMOVE_ZERO(vl, action):
    newvl = copy.deepcopy(vl)
    param1 = action['param1'].lower()
    intro=""
    # 需要删除zero，说明zero在这个情况下的声明不合法
    if param1 and param1 in newvl['encoding']:
        if 'scale' in newvl['encoding'][param1] and 'zero' in newvl['encoding'][param1]['scale']:
            newvl['encoding'][param1]['scale'].pop('zero')
            intro = "Remove the zero baseline in the scale of channel " + param1 + '.'
    
    return newvl, intro.capitalize()

def STACK(vl, action):
    # no used
    newvl = copy.deepcopy(vl)
    return newvl, ""

def REMOVE_STACK(vl, action):
    newvl = copy.deepcopy(vl)
    param1 = action['param1'].lower()
    intro = ""
    # find stacked channel
    stacked = ''
    for encoding in vl['encoding']:
        if 'stack' in vl['encoding'][encoding]:
            stacked = encoding

    if stacked and stacked in newvl['encoding']:
        newvl['encoding'][stacked].pop('stack')
        intro = "Remove stack in the channel " + stacked + '.'
    
    return newvl, intro.capitalize()

def ADD_CHANNEL(vl, action, allFields):
    # hard(no_encodings) :- not encoding(_).
    # hard(point_tick_bar_without_x_or_y) :- mark(point;tick;bar), not channel(_,x), not channel(_,y).
    # hard(line_area_without_x_y) :- mark(line;area), not channel(_,(x;y)).
    newvl = copy.deepcopy(vl)
    param1 = action['param1'].lower()

    if not allFields:
        return newvl, ""
    if param1 in newvl['encoding']:
        # already have [param1] encoding
        return newvl, ""

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

    if useF['type'] == "quantitative":
        newvl['encoding'][param1]['aggregate'] = "mean"
    intro = "Add channel " + param1 + " with data field " + useF['field'] + "."
    return newvl, intro.capitalize()

def REMOVE_CHANNEL(vl, action, rid):
    newvl = copy.deepcopy(vl)
    param1 = action['param1'].lower()
    intro = ""
    if param1 and param1 in newvl['encoding']:
        if rid == 'repeat_channel':   
            # repeat了channel 删除带有dupl标签的
            for channel in newvl['encoding'].keys():
                if param1 + '_dupl_' in channel:
                    # that's it
                    newvl['encoding'].pop(channel)
                    
        elif param1 in newvl['encoding']:
            newvl['encoding'].pop(param1)
        
        intro = "Remove channel " + param1 + "."
    
    return newvl, intro.capitalize()

def CHANGE_CHANNEL(vl, action, rid):
    newvl = copy.deepcopy(vl)
    prevChannel = action['action'].split('_')[1].lower()
    newChannel = action['action'].split('_')[2].lower()
    intro = ""
    if rid == 'repeat_channel':
        # repeat了channel 替换带有dupl标签的
        for channel in newvl['encoding'].keys():
            if prevChannel + '_dupl_' in channel:
                # that's it
                newvl['encoding'][newChannel] = newvl['encoding'].pop(channel)
                intro = "Change channel " + prevChannel + " to " + newChannel + '.'

    else:
        newvl['encoding'][newChannel] = newvl['encoding'].pop(prevChannel)
        intro = "Change channel " + prevChannel + " to " + newChannel + '.'

    return newvl, intro.capitalize()

def ADD_FIELD(vl, action, allFields):
    newvl = copy.deepcopy(vl)
    param1 = action['param1'].lower()
    if param1 not in newvl['encoding']:
        return newvl, ""

    # hard(encoding_no_field_and_not_count,C) :- not field(E,_), not aggregate(E,count), encoding(E), channel(E, C).
    if not allFields:
        return newvl, ""

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
    intro = "Add field " + useF['field'] + " in the channel " + param1 + "."
    return newvl, intro.capitalize()

def REMOVE_FIELD(vl, action):
    newvl = copy.deepcopy(vl)
    param1 = action['param1'].lower()
    intro = ""
    
    if param1 and param1 in newvl['encoding'] and 'field' in newvl['encoding'][param1]:
        newvl['encoding'][param1].pop('field')
        intro = "Remove field in the channel " + param1 + "."
    
    return newvl, intro.capitalize()

def CHANGE_FIELD(vl, action, rid, allFields):
    newvl = copy.deepcopy(vl)
    param1 = action['param1'].lower()

    if not allFields:
        return newvl, ""
    if param1 not in newvl['encoding']:
        return newvl, ""
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

    intro = "Change data field of the channel " + param1 + "."
    return newvl, intro.capitalize()

def CHANGE_TYPE(vl, action, allFields):
    newvl = copy.deepcopy(vl)
    param1 = action['param1'].lower()

    if not allFields or (param1 not in newvl['encoding']):
        return newvl, ""

    if 'aggregate' in newvl['encoding'][param1] and newvl['encoding'][param1]['aggregate'] == 'count':
        newvl['encoding'][param1]['type'] = 'quantitative'
        intro = "Change the type of the channel " + param1 + " to quantitative."
    else:
        currField = vl['encoding'][param1]['field']
        correctType = ""
        for field in allFields:
            if field['field'] == currField:
                correctType = field['type']
                newvl['encoding'][param1]['type'] = correctType
                intro = "Change the type of the channel " + param1 + " to " + correctType + "."

    return newvl, intro.capitalize()

def CORRECT_MARK(vl, action):
    newvl = copy.deepcopy(vl)
    param1 = action['param1'].lower()

    possibleMark = ['area', 'bar', 'line', 'point', 'tick']
    score = []
    for mark in possibleMark:
        score.append(similar(param1, mark))
    maxPMark = possibleMark[score.index(max(score))]
    newvl['mark'] = maxPMark
    intro = "Correct the mark type from " + param1 + " to " + maxPMark + "."
    return newvl, intro.capitalize()

def CORRECT_CHANNEL(vl, action):
    newvl = copy.deepcopy(vl)
    param1 = action['param1'].lower()
    param2 = action['param2'].lower()

    if param1 not in newvl['encoding']:
        return newvl, ""

    possibleChannel = ['x', 'y', 'size', 'color']
    for channel in vl['encoding']:
        if channel in possibleChannel:
            possibleChannel.remove(channel)
    score = []
    for channel in possibleChannel:
        score.append(similar(param1, channel))
    
    maxPChannel = possibleChannel[score.index(max(score))]
    newvl['encoding'][maxPChannel] = newvl['encoding'].pop(param1)
    intro = "Correct the channel name from " + param1 + " to " + maxPChannel + "."
    return newvl, intro.capitalize()

def CORRECT_TYPE(vl, action):
    newvl = copy.deepcopy(vl)
    param1 = action['param1'].lower()
    param2 = action['param2'].lower()

    if param1 not in newvl['encoding']:
        return newvl, ""

    possibleType = ["quantitative", "ordinal", "nominal", "temporal"]
    score = []
    for ptype in possibleType:
        score.append(similar(param2, ptype))
    
    maxPType = possibleType[score.index(max(score))]
    newvl['encoding'][param1]['type'] = maxPType
    intro = "Correct the type of the channel " + param1 + " from " + param2 + " to " + maxPType + "." 
    return newvl, intro.capitalize()

def CORRECT_AGGREGATE(vl, action):
    newvl = copy.deepcopy(vl)
    param1 = action['param1'].lower()
    param2 = action['param2'].lower()

    if param1 not in newvl['encoding']:
        return newvl, ""

    possibleAgg = ["count", "mean", "median", "min", "max", "stdev", "sum"]
    score = []
    for agg in possibleAgg:
        score.append(similar(param2, agg))
    
    maxPAgg = possibleAgg[score.index(max(score))]
    newvl['encoding'][param1]['aggregate'] = maxPAgg
    intro = "Correct the aggregation of the channel " + param1 + " from " + param2 + " to " + maxPAgg + "." 
    
    return newvl, intro.capitalize()

def CORRECT_BIN(vl, action):
    newvl = copy.deepcopy(vl)
    param1 = action['param1'].lower()
    param2 = int(action['param2'])

    if param1 not in newvl['encoding']:
        return newvl, ""

    if param2 < 0:
        newvl['encoding'][param1]['bin']['maxbins'] = -param2
    else:
        newvl['encoding'][param1]['bin']['maxbins'] = 10

    
    intro = "Correct the bin amount of the channel " + param1 + " from " + param2 + " to " + str(newvl['encoding'][param1]['bin']['maxbins']) + "." 
    
    return newvl, intro.capitalize()

def similar(a, b):
    return SequenceMatcher(None, a, b).ratio()