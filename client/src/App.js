// import logo from './logo.svg';
import React from 'react';
import './App.css';
import { Layout } from 'antd';
import 'antd/dist/antd.css'

import ChartView from './view/ChartView/index'
import CodeView from './view/CodeView/index'
import LinterView from './view/LinterView/index'
import demo from "./demo"

const { Header, Sider, Content } = Layout;

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      spec: demo,
    };
  }

  onEndEdit = (spec) => {
    this.setState({
      spec
    })
  }

  render() {
    let spec = this.state.spec;
    return (
      <div className="App">
        <Layout>
          <Header className="header" style={{ backgroundColor: "#fff" }}>
            <div>
              <p className="title">Vega Linter</p>
            </div>
          </Header>
          <Layout>
            <Sider className="CodeView-container" theme="light" width={800}>
              <CodeView spec={spec} originalSpec={demo} onEndEdit={this.onEndEdit} />
            </Sider>
            <Layout style={{ height: 'calc(100vh - 64px)' }}>
              <Content className="ChartView-container">
                <ChartView spec={spec} />
              </Content>
              <Content className="LinterView-container" style={{ backgroundColor: "#fff" }}>
                <LinterView spec={spec} onEndEdit={this.onEndEdit} />
              </Content>
            </Layout>
          </Layout>
        </Layout>
      </div>
    );
  }
}

