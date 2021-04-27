
API Reference
************************

``vega-lite-linter`` provides simple APIs for visualization developers to detect and fix issues in the built visualizations.

Initialization
===================

At first, an ``Lint`` instance should be initialized given the target visualization specification::

    lint = Lint(vegalite_json)

After initializing, the two functions listed below can be called on the instance object.

``lint()``: Detecting issues
===================

``lint()`` detects any issues in the given visualization specification.

Each detected issue will be presented as an **Rule** object containing:

* ``id`` : string. the linted rule id.
* ``param1`` : string(optional). related parameters, usually the encoding channel where the rule is in.
* ``param2`` : string(optional). related parameters, usually the incorrect input where the rule happens.
* ``explain`` : string. the description of the rule.

``fix()``: Fixing issues
===================

``fix()`` runs the algorithm to help revise the visualization specification into a correct one.

The result of ``fix()`` contains:

* ``fixable`` : boolean. the indicator of whether the given visualization specification can be fixed by ``vega-lite-linter``.
* ``optimize_spec`` : object. the specification after revision.
* ``optimize_actions`` : **Action** []. the recommended action set to fix the visualization.
* ``possible_actions`` : **Action** [][]. all possible actions to fix the visualization, grouped by each issue.
* ``violate_rules`` : **Rule** array. the detected rules in the original specification.
* ``origin_spec`` : object. the original specification.

**Action** object contains:

* ``action`` : string. the name of the action.
* ``param1`` : string. the encoding channel to perform the action.
* ``param2`` : string. the parameter to perform the action.
* ``rid`` : string. the rule id that the action solved.
* ``transition`` : number. the transition cost of the action.
* ``reward`` : number. the reward of the action.
* ``score`` : number. the score of the action, calculating by transition and reward.
* ``action_intro`` : the description of the action.
* ``apply`` : 0 | 1. the indicator of whether the action is adopted in the ``optimize_actions``.

``data`` in specification
===================
``vega-lite-linter`` helps detect some errors related to data by deriving data properties from raw data, such as data field type and min/max value of numerical data field.  

Currently, ``vega-lite-linter`` supports such calculation with inline data specified using ``values`` property, or `build-in datasets <https://vega.github.io/vega-datasets/>`_ of Vega and Vega-Lite including:

- airports
- anscombe
- barley
- burtin
- cars
- crimea
- driving
- iowa-electricity
- iris
- la-riots
- seattle-temps
- seattle-weather
- sf-temps
- stocks
- us-employment
- wheat

Involved Vega-Lite Properties
===================

The related Vega-Lite properties are listed as follows.

Mark
----------------
``mark`` is the mark type of the visualization. Currently ``area``, ``bar``, ``line``, ``point``, ``tick`` are supported.

+----------+-------------------------------------------------------------+
| Property |  Value                                                      |
+==========+=============================================================+
| mark     | **Required**. The mark type of the visualization. Can be one|
|          | of the following values: ``area``, ``bar``, ``line``,       |
|          | ``point`` and ``tick``.                                     |
+----------+-------------------------------------------------------------+

Encoding
----------------

+-----------+----------------------------------------------------------------------------------------------------------------------------------------------------------------+
| Property  | Value                                                                                                                                                          |
+===========+================================================================================================================================================================+
| channel   | **Required**. The encoding channel type, which is specified as the key of each encoding. Can be one of the following values: ``x``, ``y``, ``color``, ``size``.|
+-----------+----------------------------------------------------------------------------------------------------------------------------------------------------------------+
| field     | The data field encoded by the channel.                                                                                                                         |
+-----------+----------------------------------------------------------------------------------------------------------------------------------------------------------------+
| type      | The type of measurement.                                                                                                                                       |
|           | Can be one of the following values: ``quantitative``, ``temporal``, ``ordinal``, or ``nominal``.                                                               |
+-----------+----------------------------------------------------------------------------------------------------------------------------------------------------------------+
| bin       | Binning discretizes numeric values into a set of bins.                                                                                                         |
|           | Can be one of the following values: ``true``, ``false``, or ``{ maxBins: Maximum_number_of_bins(e.g., 10) }``.                                                 |
+-----------+----------------------------------------------------------------------------------------------------------------------------------------------------------------+
| aggregate | Aggregating summary statistics on the data field.                                                                                                              |
|           | Can be one of the following values: ``count``, ``mean``, ``median``, ``min``, ``max``, ``stdev``, ``sum`` and etc.                                             |
+-----------+----------------------------------------------------------------------------------------------------------------------------------------------------------------+
| stack     | The type of stacking offset if the field should be stacked.                                                                                                    |
|           | Can be one of the following values: ``true``, ``zero``, ``normalize``, ``center`` or ``false``.                                                                |
+-----------+----------------------------------------------------------------------------------------------------------------------------------------------------------------+
| scale     | Functions that transform a domain of data values.                                                                                                              |
+-----------+----------------------------------------------------------------------------------------------------------------------------------------------------------------+


``scale`` property including:

+-----------+---------------------------------------------------------------------------------------------------------+
| Property  | Value                                                                                                   |
+===========+=========================================================================================================+
| type      | The type of scale transformation. Currently the algorithm detects errors related to ``log`` type.       |
+-----------+---------------------------------------------------------------------------------------------------------+
| zero      | If ``true``, ensure that a zero baseline value is included in the scale domain.                         |
+-----------+---------------------------------------------------------------------------------------------------------+

More details about Vega-Lite properties can be found `here <https://vega.github.io/vega-lite/docs/>`_.

