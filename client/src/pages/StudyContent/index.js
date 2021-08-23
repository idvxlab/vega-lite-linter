import React, { Component } from 'react';

import ChartView from '../../view/ChartView/index'
import OriginChartView from '../../view/OriginChartView/index'
import CodeView from '../../view/CodeView/index'
import LinterView from '../../view/LinterView/index'
// import ModalView from '../../view/ModalView/index'
import TipView from '../../view/TipView/index'
import { Layout } from 'antd';
import './index.css'
import moment from "moment";


const { Header, Sider, Content } = Layout;
const nTest = 10;
export default class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            originalSpec: this.props.spec,
            spec: this.props.spec,
            userSpec: this.props.spec,
            linterSpec: this.props.linterSpec,
            linterAction: this.props.linterAction,

            isModalVisible: false,
            radioValue: '',

            startTime: '',
            editTime: '',
            totalTime: ''

        };
    }

    onEndEdit = (spec) => {
        this.setState({
            spec
        })
        // this.props.setAnswer(this.props.index, this.state.spec)
    }

    componentDidMount = () => {
        this.setState({
            startTime: moment()
        })
    }
    componentWillUnmount = () => {
        // console.log('componentWillUnmount')
        // this.props.setAnswer(this.props.index, this.state.spec)
        let endTime = moment();
        let totalTime = (endTime - this.state.startTime) / 1000;
        this.props.setTime(this.props.index, this.state.editTime, totalTime)
    }

    saveUserSpec = () => {
        let endEditTime = moment();
        let editTime = (endEditTime - this.state.startTime) / 1000;
        if(this.state.editTime === '') {
            this.setState({
                editTime: editTime
            })
        }
        let answer = {}
        answer[this.props.caseID] = this.state.spec;
        this.props.setAnswer(this.props.index, answer)
    }

    onClick = () => {
        this.props.setAnswer(this.props.index, 'hh')
    }

    submit = () => {
        this.setState({
            userSpec: this.state.spec,
            isModalVisible: true
        })
        this.props.setAnswer(this.props.index + nTest, this.state.spec)

    }

    handleOk = () => {
        this.setState({
            isModalVisible: false
        })
        this.props.setAnswer(this.props.index, this.state.radioValue)

    };

    handleCancel = () => {
        this.setState({
            isModalVisible: false
        })
    };

    changeRadioValue = (value) => {
        this.setState({
            radioValue: value
        })
    }

    render() {
        const spec = this.state.spec;
        let dataset = this.props.spec.data.url.split("/")[1].split('.')[0];
        return (
            <div>
                <Layout>
                    <Header className="header" style={{ backgroundColor: "#fff" }}>
                        <div>
                            <p className="title">VizLinter</p>
                        </div>
                    </Header>
                    <Layout style={{ height: 'calc(100vh - 144px)', borderBottom: '2px solid rgba(0,0,0,0.2)' }}>
                        <Sider className="CodeView-container" theme="light" width={330} style={{ overflow: 'auto' }}>
                            <OriginChartView originalSpec={this.state.originalSpec} />
                        </Sider>
                        <Sider className="CodeView-container" theme="light" width={750} style={{ overflow: 'hidden' }}>
                            <TipView dataset={dataset} />
                            <CodeView spec={spec} index={this.props.index} originalSpec={this.state.originalSpec} title={this.props.title} onEndEdit={this.onEndEdit}/>
                        </Sider>
                        <Layout>
                            <Content className="ChartView-container" style={{ overflow: 'auto' }}>
                                <ChartView spec={spec} />
                            </Content>
                            <Content className="LinterView-container" style={{ backgroundColor: "#fff", overflow: 'auto' }}>
                                <LinterView spec={spec} linterSpec={this.props.linterSpec} linterActions={this.props.linterActions} linterRules={this.props.linterRules} onEndEdit={this.onEndEdit} saveUserSpec={this.saveUserSpec}/>
                            </Content>
                        </Layout>
                    </Layout>
                    {/* <Footer style={{ textAlign: 'center' }}>
                        <Button danger onClick={() => this.submit()}>
                            Submit
                        </Button>
                    </Footer> */}
                </Layout>

                {/* <Modal width={1000} centered title="Your result VS Algorithm's result" visible={this.state.isModalVisible} onOk={this.handleOk} onCancel={this.handleCancel} closable={false} okText={'submit'}>
                    <ModalView originalSpec={this.props.spec} userSpec={this.state.userSpec} linterSpec={this.props.linterSpec} changeRadioValue={this.changeRadioValue} index={this.props.index} />
                </Modal> */}
            </div>
        )
    }
}
