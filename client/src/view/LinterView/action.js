import React, { Component } from 'react'

export default class action extends Component {
    
    render() {
        let actionArr = this.props.actionContent.filter(function(d) { return d !== ""; })
        let action = actionArr.join('_');
        return (
            <div>
                {action}
            </div>
        )
    }
}
