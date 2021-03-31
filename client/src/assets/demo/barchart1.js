const barchart1 = {
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
}

export default barchart1;
