from vega_lite_linter import Lint 
import json


with open('./vega_lite_linter/test/multiple/test2.json') as json_file:
    demo = json.load(json_file)

print(demo)

lint = Lint(demo)
result = lint.lint()
print('lint rules: ', '-'*20)
print(result)

fix = lint.fix()
print('fix rules: ', '-'*20)
for key in fix:
    print('---- ', key, fix[key])

if fix['fixable']:
    newvl = fix['optimize_spec']
    new_lint = Lint(newvl)
    new_result = new_lint.lint()
    print('new lint rules: ', '-'*20)
    print(new_result)
