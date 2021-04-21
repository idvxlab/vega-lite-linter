from vega_lite_linter import Lint 
import json


# with open('./vega_lite_linter/test/multiple/test9.json') as json_file:
#     demo = json.load(json_file)

# print(demo)
demo = {
    "data": {
        "url": "data/cars.json"
    },
    "mark": "bar",
    "encoding": {
        "x": {
            "field": "Horsepower",
            "type": "quantitative"
        },
        "y": {
            "field": "Miles_per_Gallon",
            "type": "quantitative"
        },
        "size": {
            "field": "Cylinders",
            "type": "ordinal"
        }
    }
}

lint = Lint(demo)
result = lint.lint()
print('lint rules: ', '-'*20, len(result))
print(result)

fix = lint.fix()
print('fix rules: ', '-'*20)
for key in fix:
    print('---- ', key, fix[key])

# if fix['fixable']:
#     newvl = fix['optimize_spec']
#     new_lint = Lint(newvl)
#     new_result = new_lint.lint()
#     print('new lint rules: ', '-'*20)
#     print(new_result)
    # new_fix = new_lint.fix()
    # for key in new_fix:
    #     print('---- ', key, new_fix[key])
    
    # if new_fix['fixable']:
    #     newvl1 = new_fix['optimize_spec']
    #     new_lint1 = Lint(newvl1)
    #     new_result1 = new_lint1.lint()
    #     print('new lint rules: ', '-'*20)
    #     print(new_result1)


    

    
