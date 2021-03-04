from .run_clingo import run
from .rules.intro import RuleIntro
def linter(spec):
    violates = run(spec)
    # format the violate rules from strings to objects
    # print(violates)
    formatViolates = formatRules(violates)
    return formatViolates

def formatRules(rules):
    if not rules:
        return []
    violates = []
    HAS_COUNT_TWICE = False
    for rule in rules:
        params = rule[5:-1].split(",")
        ruleOjb = {
            "id": "",
            "param1": "",
            "param2": ""
        }
        for i in range(len(params)):
            if i == 0:
                ruleOjb["id"] = params[i]
            elif i == 1:
                ruleOjb["param1"] = params[i]
            elif i == 2:
                ruleOjb["param2"] = params[i]
        
        ruleOjb['explain'] = RuleIntro[ruleOjb["id"]]
        
        if ruleOjb['id'] == 'count_twice':
            if not HAS_COUNT_TWICE:
                violates.append(ruleOjb)
                HAS_COUNT_TWICE = True
        else:
            violates.append(ruleOjb)

    return violates


