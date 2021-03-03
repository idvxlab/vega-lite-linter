from vega_lite_linter import Lint 
import json


with open('./vega_lite_linter/test/single/zero_q.json') as json_file:
    demo = json.load(json_file)

print(demo)

lint = Lint(demo)
result = lint.lint()

fix = lint.fix()

print(fix)