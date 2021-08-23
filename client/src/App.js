// import logo from './logo.svg';
import React from 'react';
import './App.css';
import { Layout, Select, Button } from 'antd';
import { LinkOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css'

import ChartView from './view/ChartView/index'
import CodeView from './view/CodeView/index'
import LinterView from './view/LinterView/index'
import demo from "./demo"
import barchart1 from "./assets/demo/barchart1"
import barchart2 from "./assets/demo/barchart2"
import scatterplot1 from "./assets/demo/scatterplot1"
import scatterplot2 from "./assets/demo/scatterplot2"
import linechart1 from "./assets/demo/linechart1"

let demoCase = {
  barchart1: barchart1,
  barchart2: barchart2,
  scatterplot1: scatterplot1,
  scatterplot2: scatterplot2,
  linechart1: linechart1
}

const { Header, Sider, Content } = Layout;
const { Option } = Select;
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      spec: demo,
      isPreview: false,
      linterSpec: {},
      currentCase: 'barchart1'
    };
  }

  onEndEdit = (spec) => {
    this.setState({
      spec
    })
  }

  setLinterSpec = (linterSpec) => {
    this.setState({
      linterSpec
    })
  }

  togglePreview = () => {
    this.setState({
      isPreview: !this.state.isPreview
    })
  }

  handleChange = (value) => {
    this.setState({
      spec: demoCase[value],
      currentCase: value
    })
  }


  render() {
    let { spec, isPreview, linterSpec, currentCase } = this.state;
    return (
      <div className="App">
        <Layout>
          <Header className="header" style={{ backgroundColor: "#fff" }}>
            <div style={{display: 'inline-block'}}>
              <p className="title">VizLinter</p>
            </div>
            <div style={{display: 'inline-block', float: 'right', marginRight: 10}}>
            {/* <Button></Button> */}
            <a className="pjBtn" href="https://vegalite-linter.idvxlab.com" target="_blank" style = {{ color: '#000', verticalAlign: 'center'}}>
              <LinkOutlined style = {{ color: '#7b25ba', fontSize: 20, marginRight: 5}}/>
              Project Page
            </a>
            </div>
            
          </Header>
          <Layout>
            <Sider className="CodeView-container" theme="light" width={500}>
              <div style={{marginBottom: 15, marginLeft: 29, fontWeight: 800, fontFamily: 'Avenir'}}>
                Examples:
                <Select defaultValue="barchart1" style={{ width: 130, marginLeft: 5 }} onChange={this.handleChange}>
                <Option value="barchart1">barchart1</Option>
                <Option value="barchart2">barchart2</Option>
                <Option value="scatterplot1">scatterplot1</Option>
                <Option value="scatterplot2">scatterplot2</Option>
                <Option value="linechart1">linechart1</Option>
              </Select></div>
              
              <CodeView spec={spec} originalSpec={demo} onEndEdit={this.onEndEdit} isPreview={isPreview} linterSpec={linterSpec} />
            </Sider>
            <Layout style={{ height: 'calc(100vh - 64px)' }}>
              <Content className="ChartView-container">
                <ChartView spec={spec} isPreview={isPreview} linterSpec={linterSpec} />
              </Content>
              <Content className="LinterView-container" style={{ backgroundColor: "#fff" }}>
                <LinterView spec={spec} currentCase={currentCase} onEndEdit={this.onEndEdit} isPreview={isPreview} togglePreview={this.togglePreview} setLinterSpec={this.setLinterSpec} />
              </Content>
            </Layout>
          </Layout>
        </Layout>
      </div>
    );
  }
}

