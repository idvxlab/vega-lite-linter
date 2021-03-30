// import logo from './logo.svg';
import React from 'react';
import './App.css';
import { Layout, Select } from 'antd';
import 'antd/dist/antd.css'

import ChartView from './view/ChartView/index'
import CodeView from './view/CodeView/index'
import LinterView from './view/LinterView/index'
import demo from "./demo"

const { Header, Sider, Content } = Layout;
const { Option } = Select;
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      spec: demo,
      isPreview: false,
      linterSpec: {}
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
    console.log(`selected ${value}`);
  }


  render() {
    let { spec, isPreview, linterSpec } = this.state;
    return (
      <div className="App">
        <Layout>
          <Header className="header" style={{ backgroundColor: "#fff" }}>
            <div>
              <p className="title">VizFixer</p>
            </div>
          </Header>
          <Layout>
            <Sider className="CodeView-container" theme="light" width={570}>
              <div style={{marginBottom: 15, marginLeft: 29, fontWeight: 800, fontFamily: 'Avenir'}}>
                Examples:
                <Select defaultValue="barchart" style={{ width: 120, marginLeft: 5 }} onChange={this.handleChange}>
                <Option value="demo1">barchart</Option>
                <Option value="demo2">scatterplot</Option>
              </Select></div>
              
              <CodeView spec={spec} originalSpec={demo} onEndEdit={this.onEndEdit} isPreview={isPreview} linterSpec={linterSpec} />
            </Sider>
            <Layout style={{ height: 'calc(100vh - 64px)' }}>
              <Content className="ChartView-container">
                <ChartView spec={spec} isPreview={isPreview} linterSpec={linterSpec} />
              </Content>
              <Content className="LinterView-container" style={{ backgroundColor: "#fff" }}>
                <LinterView spec={spec} onEndEdit={this.onEndEdit} isPreview={isPreview} togglePreview={this.togglePreview} setLinterSpec={this.setLinterSpec} />
              </Content>
            </Layout>
          </Layout>
        </Layout>
      </div>
    );
  }
}

