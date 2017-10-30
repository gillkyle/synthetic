import React, { Component } from 'react';
import glamorous from 'glamorous';
import '../../styles/how-it-works.css';


const BulletPoint = glamorous.span({
  letterSpacing: 2,
  color: '#ccc',
  lineHeight: 1.5
})
const BulletLine = glamorous.div({
  marginTop: 10,
  marginRight: '10%',
  marginLeft: '10%',
  textAlign: 'left'
})

class HowItWorks extends Component{
  render() {
    return (

      <div className='instructions-section'>
        <div className='title'>How it Works</div>
          <div className='title-subtext'>
            <div style={{marginBottom: 30}}>Adjust the levels of filters on different musical attributes from a specified musical seleciton. Calculated results are sorted and queued in the player based off of the difference between the actual input totals and the actual aggregate amount. Preview 30 second snippets from the result set and add them to your Spotify library if you login.</div>
            <BulletLine><BulletPoint>Energy</BulletPoint> a measure of intensity/activity based off of dynamic range, loudness, timbre, etc.</BulletLine>
            <BulletLine><BulletPoint>Valence</BulletPoint> the musical positiveness conveyed by a track, higher valence tracks sound happier</BulletLine>
            <BulletLine><BulletPoint>Acousticness</BulletPoint> a confidence measure of acousticness of a track, a higher number represents a higher confidence</BulletLine>
            <BulletLine><BulletPoint>Danceability</BulletPoint> how suitable a track is for dancing, based off of tempo, rhythm stability, and beat strength</BulletLine>
            <BulletLine><BulletPoint>Popularity</BulletPoint> popularity of a track, based off the total number of plays and how recent those plays are</BulletLine>
          </div>
      </div>
    )
  }
};

export default HowItWorks;