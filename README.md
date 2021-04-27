# vega-lite-linter
Fixing your visualization design written in Vega-Lite based on the Answer Set Programming.

## Setup
### Step 1: install **Clingo**
   First, you need to install Clingo.

For MacOS
```
brew install clingo
```

Using Conda
```
conda install -c potassco clingo
```

For other system, please look up to https://potassco.org/clingo/

### Step 2: install vega-lite-linter
```
pip install vega-lite-linter
```

## Usage

```python
from vega_lite_linter import Lint 

vega_json = {
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

# initialize 
lint = Lint(vega_json)

# show rules that the input vega-lite json violated
violate_rules = lint.lint()

# show fixing recommendation by vega-lite-linter
fix = lint.fix()

```

<!-- More details can be found in [vega-lite-linter's project website](xxx). -->


## License
The software is available under the [MIT License](https://github.com/idvxlab/vega-lite-linter/blob/main/LICENSE).



## Contact
If you have any question, feel free to [open an issue](https://github.com/idvxlab/vega-lite-linter/issues/new/).