# Setup
## install Clingo
First, you need to install Clingo.

For MacOS
```
brew install clingo
```

Or using Conda
```
conda install -c potassco clingo
```

For other system, please look up to https://potassco.org/clingo/

## Python ENV setup
```
cd server
virtualenv ENV
source ./ENV/bin/activate
pip install -r requirements.txt --extra-index-url https://test.pypi.org/simple/ 
```


# Run
```shell
cd server
python app.py
```

# API
两个功能，可以单独lint，也可以lint+fix
## Lint
POST localhost:5000/lint
```json
"spec": {
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
            "aggregate": "sum"
        }
    }
}
```
如果post的json没有`spec`这一项，`\lint`和`\fix`分别返回`[]`和`{}`


### Response  
返回一个list，其中每个元素为违背的一条rule

**Example**
```
[
    {
        "id": "aggregate_not_all_continuous",
        "param1": "x",
        "param2": ""
    },
    {
        "id": "aggregate_nominal",
        "param1": "y",
        "param2": ""
    }
]
```

## Fix
POST localhost:5000/fix
```json
{
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
            "aggregate": "sum"
        }
    }
}
```

### Response  
**参数列表**
- fixable: 如果可以fix，为true，如果fix不了或者没有错误，为false
- optimize_actions: 算法选定的最优动作集合
- optimize_spec: 利用最优动作集合修改后的vega-lite spec
- possible_actions: 违背的rules对应的所有动作集合
- violate_rules: 原始vega-lite spec违背的rules，与/lint返回的结果相同。
- origin_spec: 原始vega-lite spec


**Example**
```json
{
    "fixable": true,
    "optimize_actions": [
        [
            "REMOVE_AGGREGATE",
            "y",
            ""
        ],
        [
            "AGGREGATE",
            "x",
            ""
        ]
    ],
    "optimize_spec": {
        "data": {
            "url": "data/cars.json"
        },
        "encoding": {
            "x": {
                "aggregate": "min",
                "field": "Acceleration",
                "type": "quantitative"
            },
            "y": {
                "field": "Origin",
                "type": "nominal"
            }
        },
        "mark": "point"
    },
    "origin_spec": {
        "data": {
            "url": "data/cars.json"
        },
        "encoding": {
            "x": {
                "field": "Acceleration",
                "type": "quantitative"
            },
            "y": {
                "aggregate": "sum",
                "field": "Origin",
                "type": "nominal"
            }
        },
        "mark": "point"
    },
    "possible_actions": [
        [
            {
                "action": "AGGREGATE",
                "apply": 1.0,
                "param1": "x",
                "param2": "",
                "reward": 0.5,
                "rid": "aggregate_not_all_continuous",
                "score": 0.30987261146496814,
                "transition": 0.1337579617834395
            }
        ],
        [
            {
                "action": "REMOVE_AGGREGATE",
                "apply": 1.0,
                "param1": "y",
                "param2": "",
                "reward": 1.0,
                "rid": "aggregate_nominal",
                "score": 0.6598726114649681,
                "transition": 0.1337579617834395
            }
        ]
    ],
    "violate_rules": [
        {
            "id": "aggregate_not_all_continuous",
            "param1": "x",
            "param2": ""
        },
        {
            "id": "aggregate_nominal",
            "param1": "y",
            "param2": ""
        }
    ]
}
```