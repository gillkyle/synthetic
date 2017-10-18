import React, { Component } from 'react';
import glamorous from 'glamorous';

const Title = glamorous.div({
  color: '#eee',
  fontSize: 26,
  marginBottom: 10,
  textAlign: 'left'
})
const StatRow = glamorous.div({
  '@supports (display: grid)': {
    display: 'grid',
    gridTemplateColumns: '2fr 0.5fr 2.5fr',
    gridTemplateAreas: `
      "title value graph"
    `,
    gridGap: '10px',
  },
})
const StatTitle = glamorous.div({
  color: '#bbb',
  gridArea: 'title',
  textAlign: 'right'
})
const StatValue = glamorous.div({
  color: '#777',
  gridArea: 'value',
  textAlign: 'right'
})
const StatGraph = glamorous.div({
  color: '#777',
  gridArea: 'graph',
  backgroundColor: 'green',
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
        <StatRow> 
          <StatTitle>Energy</StatTitle>
          <StatValue>{(trackDetails.energy * 100).toFixed(0)}</StatValue> 
          <StatGraph style={{ width: trackDetails.energy * 100 }}> </StatGraph>
        </StatRow>
        <StatRow> 
          <StatTitle>Valence</StatTitle>
          <StatValue>{(trackDetails.valence * 100).toFixed(0)}</StatValue> 
          <StatGraph style={{ width: trackDetails.valence * 100 }}> </StatGraph>
        </StatRow>
        <StatRow> 
          <StatTitle>Acoustic</StatTitle>
          <StatValue>{(trackDetails.acousticness * 100).toFixed(0)}</StatValue> 
          <StatGraph style={{ width: trackDetails.acousticness * 100 }}> </StatGraph>
        </StatRow>
        <StatRow> 
          <StatTitle>Dance</StatTitle>
          <StatValue>{(trackDetails.danceability * 100).toFixed(0)}</StatValue> 
          <StatGraph style={{ width: trackDetails.danceability * 100 }}> </StatGraph>
        </StatRow>
        <StatRow> 
          <StatTitle>Popularity</StatTitle>
          <StatValue>{(track.popularity).toFixed(0)}</StatValue> 
          <StatGraph style={{ width: track.popularity }}> </StatGraph>
        </StatRow>
      </div>
    )
  }

}

export default SongStatistics