# vega-lite-linter
Fixing your visualization design written in Vega-Lite based on the Answer Set Programming.

## Setup
### Step 1: install **Clingo**
  Since vega-lite-linter requires **Clingo** as the solver of Answer Set Programming, you are required to install it first.

For MacOS
```
brew install clingo
```

For Linux
```
apt-get install -y gringo
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

More instruction about can be found on [vega-lite-linter's project website](http://vegalite-linter.idvxlab.com/index.html).

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

## Credits
Vega-lite-linter was invented by the [iDV<sup>x</sup> Lab](https://idvxlab.com/) together with [AntV](https://antv.vision/en). If you are looking for a visualization linter that uses other chart libraries, have a look at [ChartLinter](https://ava.antv.vision/en/docs/guide/chart-linter/intro).

## License
The software is available under the [MIT License](https://github.com/idvxlab/vega-lite-linter/blob/main/LICENSE).



## Contact
If you have any question, feel free to [open an issue](https://github.com/idvxlab/vega-lite-linter/issues/new/) or contact [idvxlab](https://idvxlab.com/).