Setup
************************

Prerequisite
===================

``vega-lite-linter`` requires `Clingo <https://potassco.org/clingo/>`_ as the solver of **Answer Set Programming**, users must install it first.

For Linux users::

    apt-get install -y gringo 


For MacOS users::

    brew install clingo 

Or using Conda::

    conda install -c potassco clingo 

More information for Clingo can be found in https://potassco.org/clingo/

Installation
===================

``vega-lite-linter`` is built on Python 3 environment and can be installed by::

    pip install vega-lite-linter 

Sample code
===================
After successfully installing ``Clingo`` and ``vega-lite-linter``, you can use the below sample code to get started.

More detailed examples can be found in :doc:`example`.

.. code-block:: python

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


Using Altair
----------------

`Altair <https://altair-viz.github.io/>`_ is a declarative statistical visualization library for Python, based on Vega and Vega-Lite.

.. code-block:: python

    from vega_lite_linter import Lint 
    import altair as alt
    from vega_datasets import data

    source = data.cars.url

    # original chart
    chart = alt.Chart(source).mark_bar().encode(
        alt.X("Horsepower:Q"),
        alt.Y("Miles_per_Gallon:Q"),
        size="Cylinders:O"
    )

    # vega-lite specification of chart
    spec = chart.to_dict()

    # use lint & fix tools within vega_lite_linter
    lint = Lint(spec)
    violated_rules = lint.lint()

    print("-------Show violated rules of the original chart-------")
    print(violated_rules)

    fix = lint.fix()
    # chart after fixing 
    chartFixed = alt.Chart.from_dict(fix['optimize_spec'])


