const errorSpecs = {
    "one_error_0": {
        "title": "汽车数据 - 汽车产地(Origin)、马力(Horsepower)、耗油量(Miles_per_Gallon)的情况",
        "origin": {
            "data": {
                "url": "data/cars.json"
            },
            "mark": "point",
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
                    "field": "Origin",
                    "type": "nominal"
                }
            }
        },
        "fix": {
            "data": {
                "url": "data/cars.json"
            },
            "mark": "point",
            "encoding": {
                "x": {
                    "field": "Horsepower",
                    "type": "quantitative"
                },
                "y": {
                    "field": "Miles_per_Gallon",
                    "type": "quantitative"
                },
                "color": {
                    "field": "Origin",
                    "type": "nominal"
                }
            }
        },
        "rules": [
            {
                "id": "size_nominal",
                "param1": "size",
                "param2": "",
                "explain": "size通道暗示着数据的顺序，不适合用于分类数据。"
            }
        ],
        "actions": [
            [
                "MOVE_SIZE_COLOR",
                "",
                "",
                "将size通道修改为color通道。"
            ]
        ]
    },
    "one_error_1": {
        "title": "机场数据 - 机场的位置分布情况",
        "origin": {
            "data": {
                "url": "data/airports.csv"
            },
            "mark": "point",
            "encoding": {
                "y": {
                    "field": "latitude",
                    "type": "quantitative"
                },
                "x": {
                    "field": "longitude",
                    "type": "quantitative"
                },
                "color": {
                    "field": "state",
                    "type": "nominal"
                }
            }
        },
        "fix": {
            "data": {
                "url": "data/airports.csv"
            },
            "mark": "point",
            "encoding": {
                "y": {
                    "field": "latitude",
                    "type": "quantitative"
                },
                "x": {
                    "field": "longitude",
                    "type": "quantitative"
                }
            }
        },
        "rules": [
            {
                "id": "color_with_cardinality_gt_twenty",
                "param1": "color",
                "param2": "",
                "explain": "在可视化中最多使用20种分类颜色。"
            }
        ],
        "actions": [
            [
                "REMOVE_CHANNEL",
                "color",
                "",
                "去掉color通道，它不适合用于映射该项数据。"
            ]
        ]
    },
    "one_error_2": {
        "title": "汽车数据 - 汽车加速度(Acceleration)和马力(Horsepower)的情况",
        "origin": {
            "data": {
                "url": "data/cars.json"
            },
            "mark": "bar",
            "encoding": {
                "x": {
                    "field": "Acceleration",
                    "type": "quantitative"
                },
                "y": {
                    "field": "Horsepower",
                    "type": "quantitative"
                }
            }
        },
        "fix": {
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
                "field": "Horsepower",
                "type": "quantitative"
              }
            }
        },
        "rules": [
            {
                "id": "bar_tick_continuous_x_y",
                "param1": "",
                "param2": "",
                "explain": "对于标记类型bar和tick，不要使用多于一个连续性数据在x和y轴上。"
            }
        ],
        "actions": [
            ["BAR_POINT", "", "", "将标记类型从bar修改为point。"]
        ]
    },
    "one_error_3": {
        "title": "汽车数据 - 汽车某项数据随年份(Year)的变化",
        "origin": {
            "data": {
                "url": "data/cars.json"
            },
            "mark": "line",
            "encoding": {
                "x": {
                    "field": "Year",
                    "type": "temporal"
                }
            }
        },
        "fix": {
            "data": {
                "url": "data/cars.json"
            },
            "mark": "line",
            "encoding": {
                "x": {
                    "field": "Year",
                    "type": "temporal"
                },
                "y": {
                    "field": "Miles_per_Gallon",
                    "type": "quantitative",
                    "aggregate": "mean"
                }
            }
        },
        "rules": [
            {
                "id": "line_area_without_x_y",
                "param1": "",
                "param2": "",
                "explain": "标记类型为line和area的图表必须包含x轴和y轴。"
            }
        ],
        "actions": [
            [
                "ADD_CHANNEL",
                "y",
                "",
                "增加y轴，可映射miles_per_gallon等数据列。"
            ]
        ]
    },
    "one_error_4": {
        "title": "汽车数据 - 汽车产地(Origin)、马力(Horsepower)和气缸数(Cylinders)的情况",
        "origin": {
            "data": {
              "url": "data/cars.json"
            },
            "mark": "point",
            "encoding": {
              "x": {
                "field": "Cylinders",
                "type": "ordinal"
              },
              "y": {
                "field": "Horsepower",
                "type": "quantitative",
                "aggregate": "sum",
                "stack": true
              },
              "color": {
                "field": "Origin",
                "type": "nominal"
              }
            }
          },
        "fix": {
            "data": {
              "url": "data/cars.json"
            },
            "mark": "bar",
            "encoding": {
              "x": {
                "field": "Cylinders",
                "type": "ordinal"
              },
              "y": {
                "field": "Horsepower",
                "type": "quantitative",
                "aggregate": "sum",
                "stack": true
              },
              "color": {
                "field": "Origin",
                "type": "nominal"
              }
            }
          },
        "rules": [
            {
                "id": "stack_without_bar_area",
                "param1": "y",
                "param2": "",
                "explain": "只在标记类型为bar和area的图表中使用stack。"
            }
        ],
        "actions": [
            ["POINT_BAR", "", "", "将标记类型从point修改为bar。"]
        ]
    },
    "two_errors_0": {
        "title": "气温数据 - 气温低值(temp_min)和气温高值(temp_max)的情况",
        "origin": {
            "data": {
                "url": "data/seattle-weather.csv"
            },
            "mark": "bar",
            "encoding": {
                "x": {
                    "field": "temp_max",
                    "type": "quantitative",
                    "bin": true
                },
                "y": {
                    "field": "temp_min",
                    "type": "quantitative",
                    "aggregate": "mean",
                    "bin": true
                }
            }
        },
        "fix": {
            "data": {
                "url": "data/seattle-weather.csv"
            },
            "mark": "bar",
            "encoding": {
                "x": {
                    "field": "temp_max",
                    "type": "quantitative",
                    "bin": true
                },
                "y": {
                    "field": "temp_min",
                    "type": "quantitative",
                    "aggregate": "mean"
                }
            }
        },
        "rules": [
            {
                "id": "bar_tick_area_line_without_continuous_x_y",
                "param1": "",
                "param2": "",
                "explain": "标记类型为bar、tick、line、area的图表要求在x轴或y轴上有连续的变量。"
            },
            {
                "id": "bin_and_aggregate",
                "param1": "y",
                "param2": "",
                "explain": "同时在某个encoding上使用bin和aggregate是不合法的。"
            }
        ],
        "actions": [
            [
                "REMOVE_BIN",
                "y",
                "",
                "去掉y轴中的bin操作。"
            ]
        ]
    },
    "two_errors_1": {
        "title": "汽车数据 - 汽车产地(Origin)和加速度(Acceleration)的情况",
        "origin": {
            "data": {
                "url": "data/cars.json"
            },
            "mark": "bar",
            "encoding": {
                "x": {
                    "field": "Origin",
                    "type": "nominal",
                    "scale": {
                        "type": "log"
                    }
                },
                "y": {
                    "field": "Acceleration",
                    "type": "quantitative",
                    "aggregate": "mn"
                }
            }
        },
        "fix": {
            "data": {
                "url": "data/cars.json"
            },
            "mark": "bar",
            "encoding": {
                "x": {
                    "field": "Origin",
                    "type": "nominal",
                    "scale": {}
                },
                "y": {
                    "field": "Acceleration",
                    "type": "quantitative",
                    "aggregate": "min"
                }
            }
        },
        "rules": [
            {
                "id": "log_discrete",
                "param1": "x",
                "param2": "",
                "explain": "log只能作用在数值数据上。"
            },
            {
                "id": "invalid_agg",
                "param1": "y",
                "param2": "mn",
                "explain": "使用有效的聚合方式，包括count, mean, median, min, max, stdev, sum。"
            }
        ],
        "actions": [
            [
                "CORRECT_AGGREGATE",
                "y",
                "mn",
                "将y轴的聚合方式从mn修改为min。"
            ],
            [
                "REMOVE_LOG",
                "x",
                "",
                "取消x轴中的log操作。"
            ]
        ]
    },
    "two_errors_2": {
        "title": "气温数据 - 不同天气类型(weather)下风速(wind)和气温低值(temp_min)的情况",
        "origin": {
            "data": {
                "url": "data/seattle-weather.csv"
            },
            "mark": "point",
            "encoding": {
                "x": {
                    "field": "weather",
                    "type": "nominal",
                    "scale": {
                        "zero": true
                    }
                },
                "y": {
                    "field": "wind",
                    "type": "quantitative"
                },
                "size": {
                    "field": "temp_min",
                    "type": "quantitative"
                }
            }
        },
        "fix": {
            "data": {
                "url": "data/seattle-weather.csv"
            },
            "mark": "point",
            "encoding": {
                "x": {
                    "field": "weather",
                    "type": "nominal",
                    "scale": {}
                },
                "y": {
                    "field": "wind",
                    "type": "quantitative"
                },
                "color": {
                    "field": "temp_min",
                    "type": "quantitative"
                }
            }
        },
        "rules": [
            {
                "id": "size_negative",
                "param1": "size",
                "param2": "",
                "explain": "通道size不适合用于带负值的数据。"
            },
            {
                "id": "zero_q",
                "param1": "x",
                "param2": "",
                "explain": "只能要求数值数据对应的的尺度包含零基线值。"
            }
        ],
        "actions": [
            [
                "REMOVE_ZERO",
                "x",
                "",
                "去掉x轴中对零基线值的要求。"
            ],
            [
                "MOVE_SIZE_COLOR",
                "",
                "",
                "将通道size修改为color。"
            ]
        ]
    },
    "two_errors_3": {
        "title": "汽车数据 - 不同产地(Origin)汽车的数量情况",
        "origin": {
            "data": {
                "url": "data/cars.json"
            },
            "mark": "bar",
            "encoding": {
                "x": {
                    "field": "Origin",
                    "type": "nominal"
                },
                "yy": {
                    "type": "quantitative",
                    "aggregate": "count"
                }
            }
        },
        "fix": {
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
                    "aggregate": "count"
                }
            }
        },
        "rules": [
            {
                "id": "bar_tick_area_line_without_continuous_x_y",
                "param1": "",
                "param2": "",
                "explain": "标记类型为bar、tick、line、area的图表要求在x轴或y轴上有连续的变量。"
            },
            {
                "id": "invalid_channel",
                "param1": "yy",
                "param2": "",
                "explain": "使用有效的通道名称，包括x, y, color, size."
            }
        ],
        "actions": [
            [
                "CORRECT_CHANNEL",
                "yy",
                "",
                "将通道名yy改正为y。"
            ]
        ]
    },
    "two_errors_4": {
        "title": "汽车数据 - 不同产地(Origin)汽车某项数值的情况",
        "origin": {
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
                    "aggregate": "mean",
                    "scale": {
                        "zero": false
                    }
                }
            }
        },
        "fix": {
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
                    "aggregate": "mean",
                    "scale": {
                        "zero": true
                    },
                    "field": "Miles_per_Gallon"
                }
            }
        },
        "rules": [
            {
                "id": "bar_area_without_zero_2",
                "param1": "y",
                "param2": "",
                "explain": "标记类型为bar和area的图表，要求y轴从0开始绘制。"
            },
            {
                "id": "encoding_no_field_and_not_count",
                "param1": "y",
                "param2": "",
                "explain": "在每个编码中声明使用的数据字段，或使用count聚合。"
            }
        ],
        "actions": [
            [
                "ADD_FIELD",
                "y",
                "",
                "给y轴声明数据字段，比如miles_per_gallon。"
            ],
            [
                "ZERO",
                "y",
                "",
                "为y轴设置零基准线。"
            ]
        ]
    },
    "three_errors_0": {
        "title": "汽车数据 - 汽车某两个变量的情况",
        "origin": {
            "data": {
                "url": "data/cars.json"
            },
            "mark": "bar",
            "encoding": {
                "x": {
                    "field": "Horsepower",
                    "type": "quantitative",
                    "bin": true,
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
        "fix": {
            "data": {
                "url": "data/cars.json"
            },
            "mark": "bar",
            "encoding": {
                "x": {
                    "field": "Miles_per_Gallon",
                    "type": "quantitative",
                    "bin": true,
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
        "rules": [
            {
                "id": "same_field_x_and_y",
                "param1": "",
                "param2": "",
                "explain": "对x轴和y轴使用不同的字段。"
            },
            {
                "id": "log_zero",
                "param1": "x",
                "param2": "",
                "explain": "对数标度不能使用零基准线。"
            },
            {
                "id": "log_discrete",
                "param1": "x",
                "param2": "",
                "explain": "log只能作用在数值数据上。"
            }
        ],
        "actions": [
            [
                "CHANGE_FIELD",
                "x",
                "",
                "改变x轴对应的数据字段，比如Miles_per_Gallon。"
            ],
            [
                "REMOVE_LOG",
                "x",
                "",
                "去掉y轴中的log操作。"
            ]
        ]
    },
    "three_errors_1": {
        "title": "汽车数据 - 汽车某两个变量的情况",
        "origin": {
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
                    "aggregate": "mean"
                }
            }
        },
        "fix": {
            "data": {
                "url": "data/cars.json"
            },
            "mark": "bar",
            "encoding": {
                "x": {
                    "field": "Miles_per_Gallon",
                    "bin": true,
                    "type": "quantitative"
                },
                "y": {
                    "field": "Horsepower",
                    "type": "quantitative",
                    "aggregate": "mean"
                }
            }
        },
        "rules": [
            {
                "id": "aggregate_nominal",
                "param1": "x",
                "param2": "",
                "explain": "分类数据不能做聚合操作。"
            },
            {
                "id": "bin_and_aggregate",
                "param1": "x",
                "param2": "",
                "explain": "同时在某个encoding上使用bin和aggregate是不合法的。"
            },
            {
                "id": "bin_q_o",
                "param1": "x",
                "param2": "nominal",
                "explain": "Bin操作只能作用在数值数据或有序数据上。"
            }
        ],
        "actions": [
            [
                "REMOVE_AGGREGATE",
                "x",
                "",
                "去掉x轴中的聚合操作。"
            ],
            [
                "CHANGE_FIELD",
                "x",
                "nominal",
                "修改x轴映射的数据字段，比如Miles_per_Gallon。"
            ]
        ]
    },
    "three_errors_2": {
        "title": "汽车数据 - 汽车产地(Origin)和马力(Horsepower)的情况",
        "origin": {
            "data": {
                "url": "data/cars.json"
            },
            "mark": "bar",
            "encoding": {
                "x": {
                    "field": "Origin",
                    "stack": "normalize",
                    "type": "quantitative"
                },
                "y": {
                    "field": "Horsepower",
                    "type": "quantitative",
                    "aggregate": "mean"
                }
            }
        },
        "fix": {
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
                    "aggregate": "mean"
                }
            }
        },
        "rules": [
            {
                "id": "stack_discrete",
                "param1": "x",
                "param2": "",
                "explain": "只在连续性数据上使用stack。"
            },
            {
                "id": "stack_without_discrete_color_3",
                "param1": "color",
                "param2": "",
                "explain": "只在可视化中存在着离散型颜色通道的时候使用stack。"
            },
            {
                "id": "enc_type_valid_1",
                "param1": "x",
                "param2": "origin",
                "explain": "验证数据字段本身数据类型和声明的quantitative是否一致。"
            }
        ],
        "actions": [
            [
                "REMOVE_STACK",
                "x",
                "",
                "去掉x轴中的stack操作。"
            ],
            [
                "CHANGE_TYPE",
                "x",
                "origin",
                "将x轴的类型修改为nominal。"
            ]
        ]
    },
    "three_errors_3": {
        "title": "气温数据 - 气温高值(temp_max)和气温低值(temp_min)随时间(date)的变化情况",
        "origin": {
            "data": {
                "url": "data/seattle-weather.csv"
            },
            "mark": "point",
            "encoding": {
                "x": {
                    "field": "date",
                    "type": "temporal",
                    "aggregate": "mean"
                },
                "y": {
                    "field": "temp_max",
                    "type": "quantitative",
                    "scale": {
                        "type": "log"
                    }
                },
                "size": {
                    "field": "temp_min",
                    "type": "quantitative"
                }
            }
        },
        "fix": {
            "data": {
                "url": "data/seattle-weather.csv"
            },
            "mark": "point",
            "encoding": {
                "x": {
                    "field": "date",
                    "type": "temporal",
                    "aggregate": "min"
                },
                "y": {
                    "field": "temp_max",
                    "type": "quantitative",
                    "scale": {}
                },
                "color": {
                    "field": "temp_min",
                    "type": "quantitative"
                }
            }
        },
        "rules": [
            {
                "id": "size_negative",
                "param1": "size",
                "param2": "",
                "explain": "通道size不适合用于带负值的数据。"
            },
            {
                "id": "log_non_positive",
                "param1": "y",
                "param2": "",
                "explain": "在全为正数的数据上使用log操作。"
            },
            {
                "id": "aggregate_t_valid",
                "param1": "x",
                "param2": "mean",
                "explain": "时间类型数据只支持min和max聚合方式。"
            }
        ],
        "actions": [
            [
                "REMOVE_LOG",
                "y",
                "",
                "去掉y轴中的log操作。"
            ],
            [
                "CHANGE_AGGREGATE",
                "x",
                "mean",
                "将x轴的聚合方式修改为min。"
            ],
            [
                "MOVE_SIZE_COLOR",
                "",
                "",
                "将通道size修改为通道color。"
            ]
        ]
    },
    "three_errors_4": {
        "title": "气温数据 - 天气类型(weather)和风力(wind)的情况",
        "origin": {
            "data": {
                "url": "data/seattle-weather.csv"
            },
            "mark": "bar",
            "encoding": {
                "y": {
                    "field": "weather",
                    "type": "nominal"
                },
                "x": {
                    "field": "wind",
                    "type": "quantitative",
                    "aggregate": "mean",
                    "scale": {
                        "zero": false
                    },
                    "stack": "normalize"
                }
            }
        },
        "fix": {
            "data": {
                "url": "data/seattle-weather.csv"
            },
            "mark": "bar",
            "encoding": {
                "y": {
                    "field": "weather",
                    "type": "nominal"
                },
                "x": {
                    "field": "wind",
                    "type": "quantitative",
                    "aggregate": "mean",
                    "scale": {
                        "zero": true
                    }
                }
            }
        },
        "rules": [
            {
                "id": "stack_without_discrete_color_3",
                "param1": "color",
                "param2": "",
                "explain": "只在可视化中存在着离散型颜色通道的时候使用stack。"
            },
            {
                "id": "bar_area_without_zero_1",
                "param1": "x",
                "param2": "",
                "explain": "水平柱状图要求x轴从零开始绘制。"
            },
            {
                "id": "stack_without_summative_agg",
                "param1": "x",
                "param2": "mean",
                "explain": "使用了stack的通道只能使用统计类型的聚合方式，包括count, sum等。"
            }
        ],
        "actions": [
            [
                "REMOVE_STACK",
                "x",
                "",
                "去掉x轴中的stack操作。"
            ],
            [
                "ZERO",
                "x",
                "",
                "在x轴中设定零基准线。"
            ]
        ]
    }
}

export default errorSpecs;