import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './Progress.css'

class Progress extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    return (
      <div className="ProgressBar">
        <div className="Progress" style={{ width: this.props.progress + '%' }} />
      </div>
    )
  }
}

Progress.propTypes = {
  progress: PropTypes.number,
}

export default Progress
