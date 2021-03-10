fixSpecs = {
    "test1": {
        "fixable": true,
        "optimize_spec": {
            "data": {
                "url": "data/cars.json"
            },
            "mark": "bar",
            "encoding": {
                "x": {
                    "field": "Horsepower",
                    "type": "quantitative",
                    "bin": {
                        "maxbins": 8
                    },
                    "scale": {
                        "zero": true
                    }
                },
                "y": {
                    "field": "Miles_per_Gallon",
                    "type": "quantitative"
                }
            }
        },
        "optimize_actions": [
            [
                "REMOVE_LOG",
                "x",
                ""
            ],
            [
                "CHANGE_FIELD",
                "y",
                ""
            ]
        ],
        "possible_actions": [
            [
                {
                    "action": "CHANGE_FIELD",
                    "param1": "x",
                    "param2": "",
                    "rid": "same_field_x_and_y",
                    "transition": 1,
                    "reward": 0.3333333333333333,
                    "score": 0.06666666666666665,
                    "newvl": {
                        "data": {
                            "url": "data/cars.json"
                        },
                        "mark": "bar",
                        "encoding": {
                            "x": {
                                "field": "Miles_per_Gallon",
                                "type": "quantitative",
                                "bin": {
                                    "maxbins": 8
                                },
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
                    "apply": 0
                },
                {
                    "action": "CHANGE_FIELD",
                    "param1": "y",
                    "param2": "",
                    "rid": "same_field_x_and_y",
                    "transition": 1,
                    "reward": 0.3333333333333333,
                    "score": 0.06666666666666665,
                    "newvl": {
                        "data": {
                            "url": "data/cars.json"
                        },
                        "mark": "bar",
                        "encoding": {
                            "x": {
                                "field": "Horsepower",
                                "type": "quantitative",
                                "bin": {
                                    "maxbins": 8
                                },
                                "scale": {
                                    "type": "log",
                                    "zero": true
                                }
                            },
                            "y": {
                                "field": "Miles_per_Gallon",
                                "type": "quantitative"
                            }
                        }
                    },
                    "apply": 1
                }
            ],
            [
                {
                    "action": "REMOVE_LOG",
                    "param1": "x",
                    "param2": "",
                    "rid": "log_zero",
                    "transition": 0.12738853503184713,
                    "reward": 0.6666666666666666,
                    "score": 0.5078556263269639,
                    "newvl": {
                        "data": {
                            "url": "data/cars.json"
                        },
                        "mark": "bar",
                        "encoding": {
                            "x": {
                                "field": "Horsepower",
                                "type": "quantitative",
                                "bin": {
                                    "maxbins": 8
                                },
                                "scale": {
                                    "zero": true
                                }
                            },
                            "y": {
                                "field": "Horsepower",
                                "type": "quantitative"
                            }
                        }
                    },
                    "apply": 1
                },
                {
                    "action": "REMOVE_ZERO",
                    "param1": "x",
                    "param2": "",
                    "rid": "log_zero",
                    "transition": 0.12738853503184713,
                    "reward": 0.3333333333333333,
                    "score": 0.24118895966029724,
                    "newvl": {
                        "data": {
                            "url": "data/cars.json"
                        },
                        "mark": "bar",
                        "encoding": {
                            "x": {
                                "field": "Horsepower",
                                "type": "quantitative",
                                "bin": {
                                    "maxbins": 8
                                },
                                "scale": {
                                    "type": "log"
                                }
                            },
                            "y": {
                                "field": "Horsepower",
                                "type": "quantitative"
                            }
                        }
                    },
                    "apply": 0
                }
            ],
            [
                {
                    "action": "REMOVE_LOG",
                    "param1": "x",
                    "param2": "",
                    "rid": "log_discrete",
                    "transition": 0.12738853503184713,
                    "reward": 0.6666666666666666,
                    "score": 0.5078556263269639,
                    "newvl": {
                        "data": {
                            "url": "data/cars.json"
                        },
                        "mark": "bar",
                        "encoding": {
                            "x": {
                                "field": "Horsepower",
                                "type": "quantitative",
                                "bin": {
                                    "maxbins": 8
                                },
                                "scale": {
                                    "zero": true
                                }
                            },
                            "y": {
                                "field": "Horsepower",
                                "type": "quantitative"
                            }
                        }
                    },
                    "apply": 1
                },
                {
                    "action": "REMOVE_BIN",
                    "param1": "x",
                    "param2": "",
                    "rid": "log_discrete",
                    "transition": 0.1316348195329087,
                    "reward": 0.31666666666666665,
                    "score": 0.22700636942675162,
                    "newvl": {
                        "data": {
                            "url": "data/cars.json"
                        },
                        "mark": "bar",
                        "encoding": {
                            "x": {
                                "field": "Horsepower",
                                "type": "quantitative",
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
                    "apply": 0
                },
                {
                    "action": "CHANGE_FIELD",
                    "param1": "x",
                    "param2": "",
                    "rid": "log_discrete",
                    "transition": 1,
                    "reward": 0.3333333333333333,
                    "score": 0.06666666666666665,
                    "newvl": {
                        "data": {
                            "url": "data/cars.json"
                        },
                        "mark": "bar",
                        "encoding": {
                            "x": {
                                "field": "Miles_per_Gallon",
                                "type": "quantitative",
                                "bin": {
                                    "maxbins": 8
                                },
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
                    "apply": 0
                }
            ]
        ],
        "violate_rules": [
            {
                "id": "same_field_x_and_y",
                "param1": "",
                "param2": "",
                "explain": "Don't use the same field on x and y."
            },
            {
                "id": "log_zero",
                "param1": "x",
                "param2": "",
                "explain": "Cannot use log and zero together."
            },
            {
                "id": "log_discrete",
                "param1": "x",
                "param2": "",
                "explain": "Cannot use log scale with discrete (which includes binned)."
            }
        ],
        "origin_spec": {
            "data": {
                "url": "data/cars.json"
            },
            "mark": "bar",
            "encoding": {
                "x": {
                    "field": "Horsepower",
                    "type": "quantitative",
                    "bin": {
                        "maxbins": 8
                    },
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
        }
    },
    "test2": {
        "fixable": true,
        "optimize_spec": {
            "data": {
                "url": "data/cars.json"
            },
            "mark": "bar",
            "encoding": {
                "x": {
                    "field": "Displacement",
                    "type": "quantitative",
                    "scale": {
                        "zero": false
                    },
                    "bin": {
                        "maxbins": 10
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
        "optimize_actions": [
            [
                "BIN",
                "x",
                ""
            ],
            [
                "REMOVE_COUNT",
                "x",
                ""
            ]
        ],
        "possible_actions": [
            [
                {
                    "action": "REMOVE_COUNT",
                    "param1": "x",
                    "param2": "",
                    "rid": "count_on_x_and_y",
                    "transition": 0.9978768577494692,
                    "reward": 0.75,
                    "score": 0.40042462845010623,
                    "newvl": {
                        "data": {
                            "url": "data/cars.json"
                        },
                        "mark": "bar",
                        "encoding": {
                            "x": {
                                "field": "Displacement",
                                "type": "quantitative",
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
                    "apply": 1
                },
                {
                    "action": "REMOVE_COUNT",
                    "param1": "y",
                    "param2": "",
                    "rid": "count_on_x_and_y",
                    "transition": 0.9978768577494692,
                    "reward": 0.48333333333333334,
                    "score": 0.18709129511677286,
                    "newvl": {
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
                                "scale": {
                                    "zero": false
                                }
                            }
                        }
                    },
                    "apply": 0
                }
            ],
            [
                {
                    "action": "BAR_AREA",
                    "param1": "",
                    "param2": "",
                    "rid": "bar_tick_continuous_x_y",
                    "originAction": "CHANGE_MARK",
                    "transition": 1,
                    "reward": 0.2375,
                    "score": -0.010000000000000009,
                    "newvl": {
                        "data": {
                            "url": "data/cars.json"
                        },
                        "mark": "area",
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
                    "apply": 0
                },
                {
                    "action": "BAR_LINE",
                    "param1": "",
                    "param2": "",
                    "rid": "bar_tick_continuous_x_y",
                    "originAction": "CHANGE_MARK",
                    "transition": 1,
                    "reward": 0.25,
                    "score": 0,
                    "newvl": {
                        "data": {
                            "url": "data/cars.json"
                        },
                        "mark": "line",
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
                    "apply": 0
                },
                {
                    "action": "BAR_POINT",
                    "param1": "",
                    "param2": "",
                    "rid": "bar_tick_continuous_x_y",
                    "originAction": "CHANGE_MARK",
                    "transition": 1,
                    "reward": 0.25,
                    "score": 0,
                    "newvl": {
                        "data": {
                            "url": "data/cars.json"
                        },
                        "mark": "point",
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
                    "apply": 0
                },
                {
                    "action": "BAR_TICK",
                    "param1": "",
                    "param2": "",
                    "rid": "bar_tick_continuous_x_y",
                    "originAction": "CHANGE_MARK",
                    "transition": 1,
                    "reward": 0,
                    "score": -0.2,
                    "newvl": {
                        "data": {
                            "url": "data/cars.json"
                        },
                        "mark": "tick",
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
                    "apply": 0
                },
                {
                    "action": "CHANGE_FIELD",
                    "param1": "x",
                    "param2": "",
                    "rid": "bar_tick_continuous_x_y",
                    "transition": 1,
                    "reward": 0.225,
                    "score": -0.01999999999999999,
                    "newvl": {
                        "data": {
                            "url": "data/cars.json"
                        },
                        "mark": "bar",
                        "encoding": {
                            "x": {
                                "field": "Name",
                                "type": "nominal",
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
                    "apply": 0
                },
                {
                    "action": "BIN",
                    "param1": "x",
                    "param2": "",
                    "rid": "bar_tick_continuous_x_y",
                    "transition": 0.1316348195329087,
                    "reward": 0.23,
                    "score": 0.1576730360934183,
                    "newvl": {
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
                                },
                                "bin": {
                                    "maxbins": 10
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
                    "apply": 1
                },
                {
                    "action": "CHANGE_FIELD",
                    "param1": "y",
                    "param2": "",
                    "rid": "bar_tick_continuous_x_y",
                    "transition": 1,
                    "reward": 0.22142857142857142,
                    "score": -0.022857142857142854,
                    "newvl": {
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
                                "type": "nominal",
                                "aggregate": "count",
                                "scale": {
                                    "zero": false
                                },
                                "field": "Name"
                            }
                        }
                    },
                    "apply": 0
                },
                {
                    "action": "BIN",
                    "param1": "y",
                    "param2": "",
                    "rid": "bar_tick_continuous_x_y",
                    "transition": 0.1316348195329087,
                    "reward": 0.23,
                    "score": 0.1576730360934183,
                    "newvl": {
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
                                },
                                "bin": {
                                    "maxbins": 10
                                }
                            }
                        }
                    },
                    "apply": 0
                }
            ],
            [
                {
                    "action": "REMOVE_COUNT",
                    "param1": "x",
                    "param2": "",
                    "rid": "count_twice",
                    "transition": 0.9978768577494692,
                    "reward": 0.75,
                    "score": 0.40042462845010623,
                    "newvl": {
                        "data": {
                            "url": "data/cars.json"
                        },
                        "mark": "bar",
                        "encoding": {
                            "x": {
                                "field": "Displacement",
                                "type": "quantitative",
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
                    "apply": 1
                }
            ],
            [
                {
                    "action": "REMOVE_FIELD",
                    "param1": "x",
                    "param2": "",
                    "rid": "count_q_without_field_1",
                    "transition": 0.9745222929936306,
                    "reward": 0.25,
                    "score": 0.005095541401273884,
                    "newvl": {
                        "data": {
                            "url": "data/cars.json"
                        },
                        "mark": "bar",
                        "encoding": {
                            "x": {
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
                    "apply": 0
                },
                {
                    "action": "REMOVE_COUNT",
                    "param1": "x",
                    "param2": "",
                    "rid": "count_q_without_field_1",
                    "transition": 0.9978768577494692,
                    "reward": 0.75,
                    "score": 0.40042462845010623,
                    "newvl": {
                        "data": {
                            "url": "data/cars.json"
                        },
                        "mark": "bar",
                        "encoding": {
                            "x": {
                                "field": "Displacement",
                                "type": "quantitative",
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
                    "apply": 1
                }
            ]
        ],
        "violate_rules": [
            {
                "id": "count_on_x_and_y",
                "param1": "",
                "param2": "",
                "explain": "Don't use count on x and y."
            },
            {
                "id": "bar_tick_continuous_x_y",
                "param1": "",
                "param2": "",
                "explain": "Bar and tick cannot have both x and y continuous."
            },
            {
                "id": "count_twice",
                "param1": "x",
                "param2": "",
                "explain": "Don't use count twice."
            },
            {
                "id": "count_q_without_field_1",
                "param1": "x",
                "param2": "",
                "explain": "Count has to be quantitative and not use a field."
            }
        ],
        "origin_spec": {
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
        }
    },
    "test3": {
        "fixable": true,
        "optimize_spec": {
            "data": {
                "url": "data/cars.json"
            },
            "mark": "bar",
            "encoding": {
                "x": {
                    "field": "Origin",
                    "type": "nominal"
                },
                "y": {
                    "type": "quantitative",
                    "aggregate": "sum",
                    "scale": {},
                    "field": "Miles_per_Gallon"
                }
            }
        },
        "optimize_actions": [
            [
                "ADD_FIELD",
                "y",
                ""
            ],
            [
                "REMOVE_AGGREGATE",
                "x",
                ""
            ],
            [
                "ZERO",
                "y",
                ""
            ]
        ],
        "possible_actions": [
            [
                {
                    "action": "ZERO",
                    "param1": "y",
                    "param2": "",
                    "rid": "bar_area_without_zero_2",
                    "transition": 0.12738853503184713,
                    "reward": 0.3333333333333333,
                    "score": 0.24118895966029724,
                    "newvl": {
                        "data": {
                            "url": "data/cars.json"
                        },
                        "mark": "bar",
                        "encoding": {
                            "x": {
                                "field": "Origin",
                                "aggregate": "sum",
                                "type": "nominal"
                            },
                            "y": {
                                "type": "quantitative",
                                "aggregate": "sum",
                                "scale": {}
                            }
                        }
                    },
                    "apply": 1
                }
            ],
            [
                {
                    "action": "ADD_FIELD",
                    "param1": "y",
                    "param2": "",
                    "rid": "encoding_no_field_and_not_count",
                    "transition": 0.9745222929936306,
                    "reward": 0.3333333333333333,
                    "score": 0.07176220806794054,
                    "newvl": {
                        "data": {
                            "url": "data/cars.json"
                        },
                        "mark": "bar",
                        "encoding": {
                            "x": {
                                "field": "Origin",
                                "aggregate": "sum",
                                "type": "nominal"
                            },
                            "y": {
                                "type": "quantitative",
                                "aggregate": "sum",
                                "scale": {
                                    "zero": false
                                },
                                "field": "Miles_per_Gallon"
                            }
                        }
                    },
                    "apply": 1
                },
                {
                    "action": "ADD_COUNT",
                    "param1": "y",
                    "param2": "",
                    "rid": "encoding_no_field_and_not_count",
                    "transition": 0.9978768577494692,
                    "reward": 0.3333333333333333,
                    "score": 0.06709129511677281,
                    "newvl": {
                        "data": {
                            "url": "data/cars.json"
                        },
                        "mark": "bar",
                        "encoding": {
                            "x": {
                                "field": "Origin",
                                "aggregate": "sum",
                                "type": "nominal"
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
                    "apply": 0
                }
            ],
            [
                {
                    "action": "REMOVE_AGGREGATE",
                    "param1": "x",
                    "param2": "",
                    "rid": "aggregate_nominal",
                    "transition": 0.1337579617834395,
                    "reward": 0.3333333333333333,
                    "score": 0.23991507430997877,
                    "newvl": {
                        "data": {
                            "url": "data/cars.json"
                        },
                        "mark": "bar",
                        "encoding": {
                            "x": {
                                "field": "Origin",
                                "type": "nominal"
                            },
                            "y": {
                                "type": "quantitative",
                                "aggregate": "sum",
                                "scale": {
                                    "zero": false
                                }
                            }
                        }
                    },
                    "apply": 1
                }
            ]
        ],
        "violate_rules": [
            {
                "id": "bar_area_without_zero_2",
                "param1": "y",
                "param2": "",
                "explain": "Bar and area mark requires scale of continuous to start at zero."
            },
            {
                "id": "encoding_no_field_and_not_count",
                "param1": "y",
                "param2": "",
                "explain": "All encodings (if they have a channel) require field except if we have a count aggregate."
            },
            {
                "id": "aggregate_nominal",
                "param1": "x",
                "param2": "",
                "explain": "Cannot aggregate nominal."
            }
        ],
        "origin_spec": {
            "data": {
                "url": "data/cars.json"
            },
            "mark": "bar",
            "encoding": {
                "x": {
                    "field": "Origin",
                    "aggregate": "sum",
                    "type": "nominal"
                },
                "y": {
                    "type": "quantitative",
                    "aggregate": "sum",
                    "scale": {
                        "zero": false
                    }
                }
            }
        }
    },
    "test4": {
        "fixable": true,
        "optimize_spec": {
            "data": {
                "url": "data/cars.json"
            },
            "mark": "bar",
            "encoding": {
                "x": {
                    "field": "Origin",
                    "type": "nominal"
                },
                "y": {
                    "field": "Horsepower",
                    "type": "quantitative",
                    "aggregate": "sum"
                }
            }
        },
        "optimize_actions": [
            [
                "REMOVE_AGGREGATE",
                "x",
                ""
            ],
            [
                "REMOVE_BIN",
                "x",
                "nominal"
            ]
        ],
        "possible_actions": [
            [
                {
                    "action": "REMOVE_AGGREGATE",
                    "param1": "x",
                    "param2": "",
                    "rid": "aggregate_nominal",
                    "transition": 0.1337579617834395,
                    "reward": 0.6666666666666666,
                    "score": 0.5065817409766454,
                    "newvl": {
                        "data": {
                            "url": "data/cars.json"
                        },
                        "mark": "bar",
                        "encoding": {
                            "x": {
                                "field": "Origin",
                                "bin": true,
                                "type": "nominal"
                            },
                            "y": {
                                "field": "Horsepower",
                                "type": "quantitative",
                                "aggregate": "sum"
                            }
                        }
                    },
                    "apply": 1
                }
            ],
            [
                {
                    "action": "REMOVE_BIN",
                    "param1": "x",
                    "param2": "",
                    "rid": "bin_and_aggregate",
                    "transition": 0.1316348195329087,
                    "reward": 0.6666666666666666,
                    "score": 0.5070063694267516,
                    "newvl": {
                        "data": {
                            "url": "data/cars.json"
                        },
                        "mark": "bar",
                        "encoding": {
                            "x": {
                                "field": "Origin",
                                "aggregate": "sum",
                                "type": "nominal"
                            },
                            "y": {
                                "field": "Horsepower",
                                "type": "quantitative",
                                "aggregate": "sum"
                            }
                        }
                    },
                    "apply": 0
                },
                {
                    "action": "REMOVE_AGGREGATE",
                    "param1": "x",
                    "param2": "",
                    "rid": "bin_and_aggregate",
                    "transition": 0.1337579617834395,
                    "reward": 0.6666666666666666,
                    "score": 0.5065817409766454,
                    "newvl": {
                        "data": {
                            "url": "data/cars.json"
                        },
                        "mark": "bar",
                        "encoding": {
                            "x": {
                                "field": "Origin",
                                "bin": true,
                                "type": "nominal"
                            },
                            "y": {
                                "field": "Horsepower",
                                "type": "quantitative",
                                "aggregate": "sum"
                            }
                        }
                    },
                    "apply": 1
                }
            ],
            [
                {
                    "action": "REMOVE_BIN",
                    "param1": "x",
                    "param2": "nominal",
                    "rid": "bin_q_o",
                    "transition": 0.1316348195329087,
                    "reward": 0.6666666666666666,
                    "score": 0.5070063694267516,
                    "newvl": {
                        "data": {
                            "url": "data/cars.json"
                        },
                        "mark": "bar",
                        "encoding": {
                            "x": {
                                "field": "Origin",
                                "aggregate": "sum",
                                "type": "nominal"
                            },
                            "y": {
                                "field": "Horsepower",
                                "type": "quantitative",
                                "aggregate": "sum"
                            }
                        }
                    },
                    "apply": 1
                },
                {
                    "action": "CHANGE_FIELD",
                    "param1": "x",
                    "param2": "nominal",
                    "rid": "bin_q_o",
                    "transition": 1,
                    "reward": 0.6666666666666666,
                    "score": 0.3333333333333333,
                    "newvl": {
                        "data": {
                            "url": "data/cars.json"
                        },
                        "mark": "bar",
                        "encoding": {
                            "x": {
                                "field": "Miles_per_Gallon",
                                "aggregate": "sum",
                                "bin": true,
                                "type": "quantitative"
                            },
                            "y": {
                                "field": "Horsepower",
                                "type": "quantitative",
                                "aggregate": "sum"
                            }
                        }
                    },
                    "apply": 0
                }
            ]
        ],
        "violate_rules": [
            {
                "id": "aggregate_nominal",
                "param1": "x",
                "param2": "",
                "explain": "Cannot aggregate nominal."
            },
            {
                "id": "bin_and_aggregate",
                "param1": "x",
                "param2": "",
                "explain": "Cannot bin and aggregate."
            },
            {
                "id": "bin_q_o",
                "param1": "x",
                "param2": "nominal",
                "explain": "Can only bin quantitative or ordinal."
            }
        ],
        "origin_spec": {
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
                },
                "y": {
                    "field": "Horsepower",
                    "type": "quantitative",
                    "aggregate": "sum"
                }
            }
        }
    }
}