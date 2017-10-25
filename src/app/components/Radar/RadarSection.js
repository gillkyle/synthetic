import React, { Component } from 'react';
import { Radar } from 'react-chartjs-2';
import glamorous from 'glamorous';

const Title = glamorous.div({
  color: '#eee',
  fontSize: 26,
  marginBottom: 25,
  textAlign: 'left'
})

class RadarSection extends Component{
  render() {
    const { track, trackDetails, energyValue, valenceValue, acousticValue, danceValue, popularityValue } = this.props;
    let data = {
      labels: ['Energy', 'Valence', 'Acoustic', 'Dance', 'Popularity'],
      datasets: [
        {
          label: 'Input',
          lineTension: 0.075,
          backgroundColor: 'rgba(39, 183, 255, 0.25)',
          borderColor: 'rgba(39, 183, 255, 1)',
          borderWidth: 2,
          pointRadius: 0,
          pointHitRadius: 5,
          pointBackgroundColor: 'rgba(39, 183, 255, 1)',
          pointBorderColor: '#191414',
          pointHoverBorderColor: 'rrgba(255,255,255, 0.5)',
          data: [energyValue, valenceValue, acousticValue, danceValue, popularityValue]
        },
        {
          label: 'Actual',
          lineTension: 0.075,
          backgroundColor: 'rgba(112,213,255, 0.25)',
          borderColor: 'rgba(255,255,255, 1)',
          borderWidth: 2,
          pointRadius: 0,
          pointHitRadius: 5,
          pointBackgroundColor: 'rgba(255,255,255, 1)',
          pointBorderColor: '#191414',
          pointHoverBorderColor: 'rgba(255,255,255, 0.5)',
          data: [ trackDetails.energy*100, trackDetails.valence*100, trackDetails.acousticness*100, trackDetails.danceability*100, track.popularity]
        }
      ]
    };
    return (
      <div className="radar-section">
        <Title style={{textAlign: 'center'}}>Comparison</Title>
        <Radar 
          data={data}
          width={300}
          height={300}
          options={{
            response: false,
            maintainAspectRatio: true,
            legend: {
              labels: {
                fontFamily: "'Montserrat', 'Helvetica', 'Arial', sans-serif",
                boxWidth: 15
              },
              position: 'bottom'
            },
            scale: {
              gridLines: {
                display: true,
                color: 'rgba(34,34,34,.25)'
              },
              angleLines: {
                display: true,
                color: 'rgba(34,34,34,.25)'
              },
              ticks: {
                fontFamily: "'Montserrat', 'Helvetica', 'Arial', sans-serif",
                display: false,
                min: 0,
                max: 100
              }
            }
          }}
        />
      </div>
    )
  }
}

export default RadarSection