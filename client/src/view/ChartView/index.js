import React, { Component } from 'react'
import './index.css'
import { Row, Col } from 'antd'
import { VegaLite } from 'react-vega'

export default class index extends Component {

    render() {
        let { spec, isPreview, linterSpec } = this.props;
        let diffChart = <Row>
            <Col span={8}><VegaLite spec={linterSpec} height={180} width={180} /></Col>
            <Col span={2}></Col>
            <Col span={8}><VegaLite spec={spec} height={180} width={180} /></Col>
        </Row>
        let header = <Row style={{ fontWeight: 600 }}>
            <Col span={8}>Optimized Chart</Col>
            <Col span={2}></Col>
            <Col span={8}>Original chart</Col>
        </Row>
        let chartView = isPreview ? diffChart : <VegaLite spec={spec} height={180} width={180} />
        header = isPreview ? header : <div></div>
        return (
            <div>
                {header}
                {chartView}
            </div>
        )
    }
}
