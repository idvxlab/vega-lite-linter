const scatterplot1 = {
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
}

export default scatterplot1;
