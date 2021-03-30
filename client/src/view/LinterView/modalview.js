import React, { Component } from 'react'
import { Row, Col } from 'antd'
import { MonacoDiffEditor } from 'react-monaco-editor';
import { VegaLite } from 'react-vega'

export default class index extends Component {

    onChange = (e) => {
        this.props.changeRadioValue(e.target.value)
    }

    render() {
        const options = {
            renderSideBySide: false,
            readOnly: true
        };
        const ratings = [
            { label: "A significantly worse than B", value: "5" },
            { label: "A slightly worse than B", value: "4" },
            { label: "A equal to B", value: "3" },
            { label: "A slightly  better than B", value: "2" },
            { label: "A significantly better than B", value: "1" },
        ];

        let { linterSpec, originalSpec } = this.props;
    
        return (
            <div>
                <Row style={{ textAlign: 'center', fontWeight: 800, fontSize: '1.2em' }}>
                    <Col span={12}>Revised Code</Col>
                    <Col span={6}>Optimized chart</Col>
                    <Col span={6}>Original chart</Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <MonacoDiffEditor
                            height="41vh"
                            language="json"
                            original={JSON.stringify(originalSpec, null, 2)}
                            value={JSON.stringify(linterSpec, null, 2)}
                            options={options}
                        />
                    </Col>
                    <Col span={6} style={{ border: '1px solid #eee', backgroundColor: '#f1f2f5', padding: 20 }}>
                        <VegaLite spec={linterSpec} />
                    </Col>
                    <Col span={6} style={{ border: '1px solid #eee', backgroundColor: '#f1f2f5', padding: 20 }}>
                        <VegaLite spec={originalSpec} />
                    </Col>
                </Row>
                <Row style={{marginTop: 20}}>
                <Col span = {12}></Col>
                <Col span = {12}>
                    Violated Rules:
                    <br></br>
                    1. ...
                    <br></br>
                    2. ...
                    <br></br>
                    3. ...
                    </Col>
                </Row>

            </div>
        )
    }
}