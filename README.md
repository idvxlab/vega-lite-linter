# vega-lite-linter
Fixing your visualization design written in Vega-Lite based on the answer set programming.

## Usage
```python
from vega_lite_linter import Lint 

vega_json = {
    "data": {
        "url": "data/cars.json"
    },
    "mark": "point",
    "encoding": {
        "x": {
            "field": "Acceleration",
            "type": "quantitative"
        },
        "y": {
            "field": "Origin",
            "type": "nominal",
            "scale": {
                "zero": true
            }
        }
    }
}

lint = Lint(vega_json)
# show rules that the input vega-lite json violates
violate_rules = lint.lint()

# show quick-fix result
fix = lint.fix()

```


# build
```
python3 setup.py sdist bdist_wheel
python3 -m twine upload --repository-url https://test.pypi.org/legacy/ dist/*   
```