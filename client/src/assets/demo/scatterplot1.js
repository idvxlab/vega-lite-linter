const scatterplot1 = {
    "data": {
        "url": "data/cars.json"
    },
    "mark": "point",
    "encoding": {
        "x": {
            "field": "Horsepower",
            "type": "quantitative",
        },
        "y": {
            "field": "Acceleration",
            "type": "quantitative"
        },
        "size": {
            "field": "Origin",
            "type": "nominal"
        }
    }
}

export default scatterplot1;
