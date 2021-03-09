import React, { Component } from 'react'

export default class rule extends Component {
  render() {
    let rule = this.props.ruleContent
    let index = this.props.index
    return (
      <div>
        {index+ '. ' + rule.explain}
      </div>
    )
  }
}
