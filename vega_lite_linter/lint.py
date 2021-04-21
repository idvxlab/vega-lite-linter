from vega_lite_linter.dataParse import getFieldsFromData
from vega_lite_linter.translator import translator
from vega_lite_linter.linter import linter
from vega_lite_linter.fixer import fixer


class Lint():
    def __init__(self, vl: dict):
        self.origin_spec = vl
        if "encoding" not in self.origin_spec:
            self.origin_spec['encoding'] = {}
        self.all_fields = getFieldsFromData(self.origin_spec)
        self.origin_asp = translator(self.origin_spec, self.all_fields)

    def lint(self):
        violates = linter(self.origin_asp)

        return violates
    
    def fix(self):
        violates = linter(self.origin_asp)
        fix_result = fixer(self.origin_spec, self.origin_asp, violates, self.all_fields)

        return fix_result

