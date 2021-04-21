import sys
sys.path.append("../")
import unittest
from vega_lite_linter import Lint


class InputTest(unittest.TestCase):
    def test_empty_input_lint(self):
        spec = {}
        vizFixer = Lint(spec)
        lint = vizFixer.lint()
        self.assertEqual(lint, [{
            'id':
            'no_encodings',
            'param1':
            '',
            'param2':
            '',
            'explain':
            "Use at least one encoding. Otherwise, the visualization doesn't show anything."
        }])

    def test_empty_input_fix(self):
        spec = {}
        vizFixer = Lint(spec)
        fix = vizFixer.fix()
        self.assertEqual(
            fix, {
                'fixable':
                False,
                'optimize_spec': {},
                'optimize_actions': [],
                'possible_actions': [[]],
                'violate_rules': [{
                    'id':
                    'no_encodings',
                    'param1':
                    '',
                    'param2':
                    '',
                    'explain':
                    "Use at least one encoding. Otherwise, the visualization doesn't show anything."
                }],
                'origin_spec': {
                    'encoding': {}
                }
            })

    def test_one_error(self):
        spec = {
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

        vizFixer = Lint(spec)
        lint = vizFixer.lint()
        self.assertEqual(lint, [{
            'id': 'aggregate_nominal',
            'param1': 'y',
            'param2': '',
            'explain': 'Nominal data cannot be aggregated.'
        }])
        fix = vizFixer.fix()
        self.assertEqual(
            fix, {
                'fixable':
                True,
                'optimize_spec': {
                    'data': {
                        'url': 'data/cars.json'
                    },
                    'mark': 'point',
                    'encoding': {
                        'x': {
                            'field': 'Acceleration',
                            'type': 'quantitative'
                        },
                        'y': {
                            'field': 'Origin',
                            'type': 'nominal'
                        }
                    }
                },
                'optimize_actions': [('REMOVE_AGGREGATE', 'y', '',
                                      'Remove aggregation in the channel y.')],
                'possible_actions': [[{
                    'action': 'REMOVE_AGGREGATE',
                    'param1': 'y',
                    'param2': '',
                    'rid': 'aggregate_nominal',
                    'transition': 0.1337579617834395,
                    'reward': 1.0,
                    'delete': False,
                    'score': 0.7732484076433122,
                    'newvl': {
                        'data': {
                            'url': 'data/cars.json'
                        },
                        'mark': 'point',
                        'encoding': {
                            'x': {
                                'field': 'Acceleration',
                                'type': 'quantitative'
                            },
                            'y': {
                                'field': 'Origin',
                                'type': 'nominal'
                            }
                        }
                    },
                    'fixRules': [0],
                    'rid_idx': 0,
                    'action_intro': 'Remove aggregation in the channel y.',
                    'apply': 1.0
                }]],
                'violate_rules': [
                    {
                        'id': 'aggregate_nominal',
                        'param1': 'y',
                        'param2': '',
                        'explain': 'Nominal data cannot be aggregated.'
                    }
                ],
                'origin_spec': {
                    'data': {
                        'url': 'data/cars.json'
                    },
                    'mark': 'point',
                    'encoding': {
                        'x': {
                            'field': 'Acceleration',
                            'type': 'quantitative'
                        },
                        'y': {
                            'field': 'Origin',
                            'type': 'nominal',
                            'aggregate': 'sum'
                        }
                    }
                }
            })

    def test_values(self):
        spec = {
            "data": {
                # "url": "data/seattle-weather.csv"
                "values": [{
                    "a": "A",
                    "b": 28
                }, {
                    "a": "B",
                    "b": 55
                }, {
                    "a": "C",
                    "b": 43
                }, {
                    "a": "D",
                    "b": 91
                }, {
                    "a": "E",
                    "b": 81
                }, {
                    "a": "F",
                    "b": 53
                }, {
                    "a": "G",
                    "b": 19
                }, {
                    "a": "H",
                    "b": 87
                }, {
                    "a": "I",
                    "b": 52
                }]
            },
            "mark": "bar",
            "encoding": {
                "x": {
                    "field": "a",
                    "type": "nominal"
                },
                "y": {
                    "field": "b",
                    "type": "quantitative"
                }
            }
        }

        vizFixer = Lint(spec)
        lint = vizFixer.lint()
        self.assertEqual(lint, [])

        fix = vizFixer.fix()
        self.assertEqual(fix, {'fixable': False, 'optimize_spec': {}, 'optimize_actions': [], 'possible_actions': [], 'violate_rules': [], 'origin_spec': {'data': {'values': [{'a': 'A', 'b': 28}, {'a': 'B', 'b': 55}, {'a': 'C', 'b': 43}, {'a': 'D', 'b': 91}, {'a': 'E', 'b': 81}, {'a': 'F', 'b': 53}, {'a': 'G', 'b': 19}, {'a': 'H', 'b': 87}, {'a': 'I', 'b': 52}]}, 'mark': 'bar', 'encoding': {'x': {'field': 'a', 'type': 'nominal'}, 'y': {'field': 'b', 'type': 'quantitative'}}}})


if __name__ == '__main__':
    unittest.main()