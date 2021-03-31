import React, { Component } from 'react'
import './index.css'
import { Button, Tooltip } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css'

import getLinter from "../../network/getLinter"
import getFixer from "../../network/getFixer"
import Rule from "./rule"
import Action from "./action"
// import ModalView from "./modalview"

export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      violatedRules: [],
      optimizeActions: [],
      fixable: false,
      optimizeSpec: {},
      enablePreview: false,
      showAccept: false,
      showRulesAndActions: false
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if(nextProps.currentCase !== this.props.currentCase) {
      this.setState({
        violatedRules: [],
        optimizeActions: [],
        showRulesAndActions: false
      })
    }
    return true
  }

  getLint = async (spec) => {
    let response = await getLinter(spec);
    this.setState({
      violatedRules: response.data,
      showRulesAndActions: true
    })
  }

  getFix = async (spec) => {
    let response = await getFixer(spec);
    if (response.data.fixable) {
      this.setState({
        fixable: true,
        optimizeActions: response.data.optimize_actions,
        optimizeSpec: response.data.optimize_spec,
        enablePreview: true,
        showRulesAndActions: true
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

  showPreview = () => {
    this.props.togglePreview();
    this.props.setLinterSpec(this.state.optimizeSpec)
    this.setState({
      showAccept: !this.stateshowAccept
    })
  }

  acceptSuggestion = () => {
    try {
      this.props.onEndEdit(this.state.optimizeSpec);
      this.props.togglePreview();
    } catch (error) {
      console.log("json parse error:" + error);
    }
    this.setState({
      showAccept: false,
      showRulesAndActions: false,
      violatedRules: [],
      optimizeActions: []
    })
  }

  handleOk = () => {
    this.setState({
      isModalVisible: false
    })
    // this.props.setAnswer(this.props.index, this.state.radioValue)
    try {
      this.props.onEndEdit(this.state.optimizeSpec);
    } catch (error) {
      console.log("json parse error:" + error);
    }
    this.setState({
      showAccept: false
    })
  };

  handleCancel = () => {
    this.props.togglePreview();
    this.setState({
      showAccept: false
    })
  };

  render() {
    let spec = this.props.spec;
    let { enablePreview, showAccept, showRulesAndActions } = this.state;
    return (
      <div>
        <Button danger onClick={() => this.getLint(spec)}>
          Inspect Specs
        </Button>
        <Tooltip placement="rightTop" title={'Toggle Linter'}>
          <InfoCircleOutlined fill='#08c' height='1em' width='1em' style={{ marginLeft: 10 }} />
        </Tooltip>
        <div className="violated-rules">
          <div style={{ marginLeft: 16, display: showRulesAndActions ? 'block' : 'none' }}>
            <p style={{ fontWeight: 800, margin: 0 }}>Violated Rules:</p>
            {this.state.violatedRules.map((d, i) => {
              return <Rule ruleContent={d} index={i + 1} key={i} />
            })}
          </div>
        </div>

        <br></br>
        <Button danger onClick={() => this.getFix(spec)}>
          Suggest Revision
        </Button>
        <Tooltip placement="rightTop" title={'Toggle Fixer'}>
          <InfoCircleOutlined color='#08c' height='1em' width='1em' style={{ marginLeft: 10 }} />
        </Tooltip>
        <div className="violated-rules">
          <div style={{ marginLeft: 16, display: showRulesAndActions ? 'block' : 'none' }}>
            <p style={{ fontWeight: 800, margin: 0 }}>Fix Suggestions:</p>
            {this.state.optimizeActions.map((d, i) => {
              return <Action actionContent={d} index={i + 1} key={i} />
            })}
          </div>
          <br></br>
          <Button onClick={this.showPreview} disabled={!enablePreview || !this.state.optimizeActions.length}>
            Preview
          </Button>
          <Tooltip placement="rightTop" title={'Toggle Preview'}>
            <InfoCircleOutlined color='#08c' height='1em' width='1em' style={{ marginLeft: 10 }} />
          </Tooltip>

          <Button onClick={this.acceptSuggestion} type="primary" style={{ marginLeft: 20, visibility: showAccept ? 'visible' : 'hidden' }}>Accept</Button>
          <Button onClick={this.handleCancel} style={{ visibility: showAccept ? 'visible' : 'hidden' }}>Reject</Button>
        </div>
      </div>
    )
  }
}
