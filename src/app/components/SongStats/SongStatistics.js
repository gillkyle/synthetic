import React, { Component } from 'react';
import glamorous from 'glamorous';
import StatGraphRow from './StatGraphRow';
import { StatRow, StatTitle, StatValue, StatGraphHolder, StatGraph, StatDoubleNumber } from './StatElements';

const Title = glamorous.div({
  color: '#eee',
  fontSize: 26,
  marginBottom: 25,
  textAlign: 'left'
})
const Subtitle = glamorous.div({
  color: '#eee',
  fontSize: 18,
  marginTop: 10,
  marginBottom: 20,
  textAlign: 'left'
})


class SongStatistics extends Component{
	constructor(props) {
    super(props);
    this.state = {

    }
  };

  render() {
    const { track, trackDetails } = this.props;
    return (
      <div className='SongStats'>
        <Title>Audio Analysis</Title>
        <StatGraphRow
          label="Energy"
          detailName="energy"
          track={track}
          trackDetails={trackDetails}
        />
        <StatGraphRow
          label="Valence"
          detailName="valence"
          track={track}
          trackDetails={trackDetails}
        />
        <StatGraphRow
          label="Acoustic"
          detailName="acousticness"
          track={track}
          trackDetails={trackDetails}
        />
        <StatGraphRow
          label="Dance"
          detailName="danceability"
          track={track}
          trackDetails={trackDetails}
        />
        <StatRow> 
          <StatTitle>Popularity</StatTitle>
          <StatValue>{(track.popularity).toFixed(0)}</StatValue> 
          <StatGraphHolder>
            <StatGraph style={{ width: `${track.popularity}%` }}> </StatGraph>
          </StatGraphHolder>
        </StatRow>
        <Subtitle>Composite Score <span style={{color: '#70D5FF'}}>{500 - track.ResultDifference}</span>
          </Subtitle>
        <StatDoubleNumber>
          <StatTitle>BPM</StatTitle>
          <StatValue>{(trackDetails.tempo).toFixed(0)}</StatValue> 
          {/* <StatTitle style={{gridArea: 'title2'}}>BPM</StatTitle>
          <StatValue style={{gridArea: 'value2'}}>{(trackDetails.tempo).toFixed(0)}</StatValue>  */}
        </StatDoubleNumber>
      </div>
    )
  }

}

export default SongStatistics