originSpecs = {
    "test1": {
        "data": {
            "url": "data/cars.json"
        },
        "mark": "bar",
        "encoding": {
            "x": {
                "field": "Horsepower",
                "type": "quantitative",
                "bin": {"maxbins": 8},
                "scale": {
                    "type": "log",
                    "zero": true
                }
            },
            "y": {
                "field": "Horsepower",
                "type": "quantitative"
            }
        }
    },
    "test2": {
        "data": {
            "url": "data/cars.json"
        },
        "mark": "bar",
        "encoding": {
            "x": {
                "field": "Displacement",
                "type": "quantitative",
                "aggregate": "count",
                "scale": {
                    "zero": false
                }
            },
            "y": {
                "type": "quantitative",
                "aggregate": "count",
                "scale": {
                    "zero": false
                }
            }
        }
    },
    "test3": {
        "data": {
            "url": "data/cars.json"
        },
        "mark": "bar",
        "encoding": {
            "x": {
                "field": "Origin",
                "aggregate": "sum",
                "type": "nominal"
            }
            ,
            "y": {
                "type": "quantitative",
                "aggregate": "sum",
                "scale": {
                    "zero": false
                }
            }
        }
    },
    "test4": {
        "data": {
            "url": "data/cars.json"
        },
        "mark": "bar",
        "encoding": {
            "x": {
                "field": "Origin",
                "aggregate": "sum",
                "bin": true,
                "type": "nominal"
            }
            ,
            "y": {
                "field": "Horsepower",
                "type": "quantitative",
                "aggregate": "sum"
            }
        }
    }
}