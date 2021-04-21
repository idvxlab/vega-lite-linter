def translator(spec, allFields):
    facts = []

    if 'mark' in spec:
        facts.append('mark(' + spec['mark'] + ').')

    if 'data' in spec and 'url' in spec['data']:
        facts.append('data("' + spec['data']['url'] + '").')

    if 'encoding' in spec:
        encoding = spec['encoding']
    else: 
        encoding = {}

    i = 0

    for channel in encoding.keys():      
        eid = 'e'+ str(i)
        i = i + 1

        if channel.find("_dupl_") == 1: 
            dupl_channel = channel.split("_")
            channel = dupl_channel[0]

        facts.append('encoding('+ eid +').')
        facts.append('channel('+ eid + ', ' + channel + ').')

        encFieldType = None
        encZero = None
        encBinned = None

        # translate encodings
        for field in encoding[channel].keys():
            fieldContent = encoding[channel][field]
            if field == 'type':
                encFieldType = fieldContent
            
            if field == 'bin':
                encBinned = fieldContent
            if field == 'scale':
                # translate two boolean fields
                if 'zero' in fieldContent:
                    encZero = fieldContent['zero']
                    if fieldContent['zero']:
                        facts.append('zero('+ eid + ').')
                    else:
                        facts.append(':- zero('+ eid +').')

                if 'log' in fieldContent:                    
                    if fieldContent['log']:
                        facts.append('log('+ eid + ').')
                    else:
                        facts.append(':- log('+ eid +').')

                if 'type' in fieldContent:
                    if fieldContent['type'] == 'log':
                        encZero = False
                        encType = fieldContent['type']
                        facts.append('log('+ eid + ').')

            elif field == 'bin':
                if fieldContent is True:
                    facts.append(field + '(' + eid + ',10).')
                elif 'maxbins' in fieldContent:
                    facts.append(field + '(' + eid + ',' + str(fieldContent['maxbins']) +').')
                else:
                    facts.append(field + '(' + eid + ',10).')
            elif field == 'field':
                # fields can have spaces and start with capital letters
                facts.append(field + '(' + eid + ',' + fieldContent.lower() +').')
                # facts.append('field(' + fieldContent.lower() + ').')
                if len(allFields):
                    for field in allFields:
                        if field['field'] == fieldContent:
                            facts.append('fieldtype(' + fieldContent.lower() + ', ' + field['fieldtype'] + ').')
                            if 'fieldtype' in field and field['fieldtype'] == 'number':
                                facts.append('extent(' + fieldContent.lower() + ', ' + str(int(field['min'])) + ', ' + str(int(field['max'])) + ').')
                            if channel == 'color':
                                facts.append('enc_cardinality(' + eid + ', ' + str(field['cardinality']) + ').')
                            break

            else:
                # translate normal fields               
                if field == 'type':
                    # pass
                    facts.append('type' +'(' + eid + ',' + encFieldType + ').')
                if field == 'stack':
                    if fieldContent is True:
                        facts.append(field + '(' + eid + ',zero).')
                    else:
                        facts.append(field +'(' + eid + ',' + fieldContent.lower() + ').')
                elif field != 'bin':
                    facts.append(field +'(' + eid + ',' + fieldContent.lower() + ').')
                    # facts.append('field(' + fieldContent.lower() + ').')

        if encFieldType == 'quantitative' and encZero is None and encBinned is None:
            facts.append('zero(' + eid + ').')

   
    return facts