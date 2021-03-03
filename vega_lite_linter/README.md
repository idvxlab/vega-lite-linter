## develop pipeline
### Step 1: vl2asp Translator
input: vega-lite json  
output: facts in asp format

### Step 2: Linter
**Rules**  
Define rules with detailed description (such as ESLint).

**Linter**  
A function to dectect which rules are violated by the input vis specifaction.

### Step 3: Fixer
**Optimization**  
Find best actions with max score using linear programming

**Action Adaptor**  
Given the recommended action, what specific parameters should be used, such as field name, aggregation function.

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
virtualenv ENV
source ./ENV/bin/activate
pip install -r requirements.txt 
```
