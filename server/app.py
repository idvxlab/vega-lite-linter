from flask import Flask, jsonify, request
from vega_lite_linter import Lint 
import json, collections
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
app.config['JSON_SORT_KEYS'] = False
def dict_raise_on_duplicates(ordered_pairs):
    count=0
    d=collections.OrderedDict()
    for k,v in ordered_pairs:
        if k in d:
            d[k+'_dupl_'+str(count)]=v
            count+=1
        else:
            d[k]=v
    return d


@app.route('/lint', methods = ['POST'])
def lint():
    data = request.data
    input_data = json.loads(data, object_pairs_hook=dict_raise_on_duplicates)
    if 'spec' in input_data:
        input_spec = input_data['spec']
        lint = Lint(input_spec)
        result = lint.lint()
    else:
        result = []
    return jsonify(result)

@app.route('/fix', methods = ['POST'])
def fix():
    data = request.data
    input_data = json.loads(data, object_pairs_hook=dict_raise_on_duplicates)
    if 'spec' in input_data:
        input_spec = input_data['spec']
        lint = Lint(input_spec)
        fix = lint.fix()
    else:
        fix = {}
    return jsonify(fix)

if __name__ == '__main__':
    app.run(debug=True, port=6040)