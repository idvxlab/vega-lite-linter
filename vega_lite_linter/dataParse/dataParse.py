import os, json
import pandas as pd
from pandas.api.types import is_string_dtype
from pandas.api.types import is_numeric_dtype
from pandas.api.types import is_bool_dtype
from pandas.api.types import is_datetime64_any_dtype
from dateutil.parser import parse
from vega_datasets import local_data

PATH = os.path.dirname(__file__)
def getFieldsFromData(vl):
    """get all field from data and identify their types used in vega-lite

    Keyword arguments:
    vl -- the origin vegalite json

    Return
    [ {'field': field, 'fieldtype': '', 'type': ''}]

    """
    fields = []
    if 'data' in vl:
        # has data input, then check input type
        if 'values' in vl['data']:
            data = vl['data']['values']

            if isinstance(data, list):
                fields = getFields(data)

        elif 'url' in vl['data']:
            # input by url
            # 1. check url validation (file protocal)
            url = vl['data']['url']
            if url.startswith('data/'):
                filename = url.split('/')[-1]
                filenameShort = filename.split('.')[0]
                if filenameShort in local_data.list_datasets(): # 内置
                    dataF = getattr(local_data, filenameShort.replace('-', '_'))()
                    fields = getFields(dataF, True)
                else:
                    possibleFiles = os.listdir(PATH + '/../data')
                    if filename in possibleFiles:
                        filetype = filename.split('.')[1] # TODO if invalid file name? i.e. without extension type
                        if filetype == 'json': # TODO support json for now
                            with open(PATH + '/../data/' + filename) as json_file:
                                data = json.load(json_file)
                                fields = getFields(data)
                        elif filetype == 'csv':
                            dataF = pd.read_csv(PATH + '/../data/' + filename, header=0)
                            fields = getFields(dataF, True)
                if url == "data/cars.json":
                    fields = [{'field': 'Name', 'fieldtype': 'string', 'type': 'nominal', 'cardinality': 311}, {'field': 'Miles_per_Gallon', 'fieldtype': 'number', 'type': 'quantitative', 'min': 9.0, 'max': 46.6, 'cardinality': 130}, {'field': 'Cylinders', 'fieldtype': 'string', 'type': 'ordinal', 'min': 3, 'max': 8, 'cardinality': 5}, {'field': 'Displacement', 'fieldtype': 'number', 'type': 'quantitative', 'min': 68.0, 'max': 455.0, 'cardinality': 83}, {'field': 'Horsepower', 'fieldtype': 'number', 'type': 'quantitative', 'min': 46.0, 'max': 230.0, 'cardinality': 94}, {'field': 'Weight_in_lbs', 'fieldtype': 'number', 'type': 'quantitative', 'min': 1613, 'max': 5140, 'cardinality': 356}, {'field': 'Acceleration', 'fieldtype': 'number', 'type': 'quantitative', 'min': 8.0, 'max': 24.8, 'cardinality': 96}, {'field': 'Year', 'fieldtype': 'datetime', 'type': 'temporal', 'cardinality': 12}, {'field': 'Origin', 'fieldtype': 'string', 'type': 'nominal', 'cardinality': 3}]
            
            # elif url is reachable online
    
    return fields

def getFields(data, isDf = False):
    fields = []
    # get all fields from data[0]
    if not isDf and not data:
        return fields
    if isDf and not len(data):
        return fields
    if not isDf:
        df = pd.DataFrame(data)
    else:
        df = data
    columns = list(df.columns)
    # primitive_type(string;number;boolean;datetime).
    # type(quantitative;ordinal;nominal;temporal).
    # fieldtype - type
    # string - ordinal nominal 
    # number - quantitative
    # boolean - nominal
    # datetime - temporal
    # for column in columns:
    for column in columns:
        if is_bool_dtype(df[column]):
            fields.append({
                "field": column,
                "fieldtype": "boolean",
                "type": "nominal",
                "cardinality": getDistinct(df[column])
            })
        elif is_datetime64_any_dtype(df[column]):
            fields.append({
                "field": column,
                "fieldtype": "datetime",
                "type": "temporal",
                "cardinality": getDistinct(df[column])
            })
        elif is_numeric_dtype(df[column]):
            _min, _max = getExtent(df[column])
            fields.append({
                "field": column,
                "fieldtype": "number",
                "type": "quantitative",
                "min": _min,
                "max": _max,
                "cardinality": getDistinct(df[column])
            })
        elif is_string_dtype(df[column]):
            if isDateColumns(df[column]):
                fields.append({
                    "field": column,
                    "fieldtype": "datetime",
                    "type": "temporal",
                    "cardinality": getDistinct(df[column])
                })
            else:
                fields.append({
                    "field": column,
                    "fieldtype": "string",
                    "type": "nominal",
                    "cardinality": getDistinct(df[column])
                })
        else:
            fields.append({
                "field": column
            })
 
    return fields

def is_date(string, fuzzy=False):
    """
    Return whether the string can be interpreted as a date.

    :param string: str, string to check for date
    :param fuzzy: bool, ignore unknown tokens in string if True
    """
    try: 
        parse(string, fuzzy=fuzzy)
        return True

    except ValueError:
        return False
    
def isDateColumns(values):
    flag = True
    for value in values:
        if not is_date(str(value)):
            return False
    return True

def getDistinct(values):
    return len(values.unique())

def getExtent(values):
    return values.min(), values.max()