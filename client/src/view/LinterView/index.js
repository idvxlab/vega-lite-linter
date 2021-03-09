import React, { Component } from 'react'
import './index.css'
import { Button, Tooltip } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css'

import getLinter from "../../network/getLinter"
import getFixer from "../../network/getFixer"
import Rule from "./rule"
import Action from "./action"

export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      violatedRules: [],
      optimizeActions: [],
      fixable: false,
      optimizeSpec: {}
    }
  }

  getLint = async (spec) => {
    let response = await getLinter(spec);
    this.setState({
      violatedRules: response.data
    })
  }

  getFix = async (spec) => {
    let response = await getFixer(spec);
    if (response.data.fixable) {
      this.setState({
        fixable: true,
        optimizeActions: response.data.optimize_actions,
        optimizeSpec: response.data.optimize_spec
      })
    }
  }

  showOptimizeSpec = () => {
    try {
      this.props.onEndEdit(this.state.optimizeSpec);
    } catch (error) {
      console.log("json parse error:" + error);
    }
  }

  render() {
    let spec = this.props.spec;
    return (
      <div>
        <Button danger onClick={() => this.getLint(spec)}>
          Inspect Specs
        </Button>
        <Tooltip placement="rightTop" title={'Toggle Linter'}>
          <InfoCircleOutlined fill='#08c' height='1em' width='1em' style={{ marginLeft: 10 }} />
        </Tooltip>
        <div className="violated-rules">
          <p style={{ fontWeight: 800 }}>Violated Rules:</p>
          {this.state.violatedRules.map((d, i) => {
            return <Rule ruleContent={d} index={i + 1} key={i} />
          })}
        </div>

        <br></br>
        <Button onClick={() => this.getFix(spec)}>
          Suggest Revision
        </Button>
        <Tooltip placement="rightTop" title={'Toggle Fixer'}>
          <InfoCircleOutlined color='#08c' height='1em' width='1em' style={{ marginLeft: 10 }} />
        </Tooltip>
        <div className="violated-rules">
          <p style={{ fontWeight: 800 }}>Fix suggestions:</p>
          {this.state.optimizeActions.map((d, i) => {
            return <Action actionContent={d} index={i + 1} key={i} />
          })}

          <br></br>
          <Button onClick={this.showOptimizeSpec}>
            Accept Suggestion
          </Button>
        </div>
      </div>
    )
  }
}
