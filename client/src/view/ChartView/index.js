import React, { Component } from 'react'
import './index.css'
import { VegaLite } from 'react-vega'

export default class index extends Component {

    render() {
        let spec = this.props.spec;

        return (
            <div>
                <VegaLite spec={spec} />
            </div>
        )
    }
}
