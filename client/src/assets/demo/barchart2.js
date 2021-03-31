const barchart2 = {
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
}

export default barchart2;