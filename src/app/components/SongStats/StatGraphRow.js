import React, { Component } from 'react';
import glamorous from 'glamorous';
import { StatRow, StatTitle, StatValue, StatGraphHolder, StatGraph } from './StatElements';

class StatGraphRow extends Component{
	constructor(props) {
    super(props);
    this.state = {

    }
  };

  render() {
    const { track, trackDetails, label, detailName } = this.props;
    return (
      <StatRow> 
        <StatTitle>{label}</StatTitle>
        <StatValue>{(trackDetails[detailName] * 100).toFixed(0)}</StatValue> 
        <StatGraphHolder>
          <StatGraph style={{ width: `${trackDetails[detailName] * 100}%` }}> </StatGraph>
        </StatGraphHolder>
      </StatRow>
    )
  }
};

export default StatGraphRow;