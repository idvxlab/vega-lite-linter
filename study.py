from vega_lite_linter import Lint
import json

cases = {
    "two_errors_3": {
        "data": {"url": "data/cars.json"},
        "mark": "bar",
        "encoding": {
            "x": {"field": "Origin", "type": "nominal"},
            "yy": {"type": "quantitative", "aggregate": "count"},
        },
    },
    "one_error_2": {
        "data": {"url": "data/cars.json"},
        "mark": "bar",
        "encoding": {
            "x": {"field": "Acceleration", "type": "quantitative"},
            "y": {"field": "Horsepower", "type": "quantitative"},
        },
    },
    "one_error_3": {
        "data": {"url": "data/cars.json"},
        "mark": "line",
        "encoding": {"x": {"field": "Year", "type": "temporal"}},
    },
    "two_errors_2": {
        "data": {"url": "data/seattle-weather.csv"},
        "mark": "point",
        "encoding": {
            "x": {"field": "weather", "type": "nominal", "scale": {"zero": True}},
            "y": {"field": "wind", "type": "quantitative"},
            "size": {"field": "temp_min", "type": "quantitative"},
        },
    },
    "one_error_4": {
        "data": {"url": "data/cars.json"},
        "mark": "point",
        "encoding": {
            "x": {"field": "Origin", "type": "nominal"},
            "y": {"field": "Horsepower", "type": "quantitative", "stack": "zero"},
            "color": {"field": "Cylinders", "type": "ordinal"},
        },
    },
    "three_errors_1": {
        "data": {"url": "data/cars.json"},
        "mark": "bar",
        "encoding": {
            "x": {
                "field": "Origin",
                "aggregate": "sum",
                "bin": True,
                "type": "nominal",
            },
            "y": {"field": "Horsepower", "type": "quantitative", "aggregate": "sum"},
        },
    },
    "three_errors_0": {
        "data": {"url": "data/cars.json"},
        "mark": "bar",
        "encoding": {
            "x": {
                "field": "Horsepower",
                "type": "quantitative",
                "bin": {"maxbins": 8},
                "scale": {"type": "log", "zero": True},
            },
            "y": {"field": "Horsepower", "type": "quantitative"},
        },
    },
    "two_errors_4": {
        "data": {"url": "data/cars.json"},
        "mark": "bar",
        "encoding": {
            "x": {"field": "Origin", "type": "nominal"},
            "y": {"type": "quantitative", "aggregate": "sum", "scale": {"zero": False}},
        },
    },
    "three_errors_3": {
        "data": {"url": "data/seattle-weather.csv"},
        "mark": "point",
        "encoding": {
            "x": {"field": "date", "type": "temporal", "aggregate": "mean"},
            "y": {
                "field": "temp_max",
                "type": "quantitative",
                "scale": {"type": "log"},
            },
            "size": {"field": "temp_min", "type": "quantitative"},
        },
    },
    "three_errors_2": {
        "data": {"url": "data/cars.json"},
        "mark": "bar",
        "encoding": {
            "x": {"field": "Origin", "stack": "normalize", "type": "quantitative"},
            "y": {"field": "Horsepower", "type": "quantitative", "aggregate": "sum"},
        },
    },
    "one_error_0": {
        "data": {"url": "data/cars.json"},
        "mark": "point",
        "encoding": {
            "x": {"field": "Horsepower", "type": "quantitative"},
            "y": {"field": "Miles_per_Gallon", "type": "quantitative"},
            "size": {"field": "Origin", "type": "nominal"},
        },
    },
    "two_errors_1": {
        "data": {"url": "data/cars.json"},
        "mark": "bar",
        "encoding": {
            "x": {"field": "Origin", "type": "ordinal", "scale": {"type": "log"}},
            "y": {"field": "Acceleration", "type": "quantitative", "aggregate": "mn"},
        },
    },
    "two_errors_0": {
        "data": {"url": "data/seattle-weather.csv"},
        "mark": "bar",
        "encoding": {
            "x": {"field": "temp_min", "type": "quantitative", "bin": {"maxbins": 10}},
            "y": {
                "field": "temp_max",
                "type": "quantitative",
                "aggregate": "min",
                "bin": {"maxbins": 10},
            },
        },
    },
    "one_error_1": {
        "data": {"url": "data/airports.csv"},
        "mark": "point",
        "encoding": {
            "y": {"field": "latitude", "type": "quantitative"},
            "x": {"field": "longitude", "type": "quantitative"},
            "color": {"field": "state", "type": "nominal"},
        },
    },
    "three_errors_4": {
        "data": {"url": "data/seattle-weather.csv"},
        "mark": "bar",
        "encoding": {
            "y": {"field": "weather", "type": "nominal"},
            "x": {
                "field": "wind",
                "type": "quantitative",
                "aggregate": "mean",
                "scale": {"zero": False},
                "stack": "normalize",
            },
        },
    },
}

caseForStudy = {}


for caseid in cases:
    origin = cases[caseid]

    lint = Lint(origin)

    rules = lint.lint()

    fix_result = lint.fix()
    fix = fix_result["optimize_spec"]
    actions = fix_result["optimize_actions"]
    caseForStudy[caseid] = {}
    caseForStudy[caseid]["origin"] = origin
    caseForStudy[caseid]["fix"] = fix
    caseForStudy[caseid]["rules"] = rules
    caseForStudy[caseid]["actions"] = actions

with open("./userstudy.json", "w+") as file:
    json.dump(caseForStudy, file, indent=4)