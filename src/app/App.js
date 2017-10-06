import React, { Component } from 'react';
import logo from './../logo.svg';
import { Button } from 'semantic-ui-react';
import Slider from './components/Slider/Slider'
import './styles/App.css';
import glamorous from 'glamorous'

const SliderRow = glamorous.div({
  maxWidth: 820,
  margin: "0 auto",
  paddingBottom: 35
});

class App extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      log: [],
      value: 10
    }
  }

  handleChangeStart = () => {
    console.log('Change event started')
  };

  handleChange = value => {
    this.setState({
      value: value
    })
  };

  handleChangeComplete = () => {
    console.log('Change event completed')
  };

  handleClick = () => this.updateLog('Button received click with mouse')

  handleKeyPress = (e) => {
    if (e.charCode === 32 || e.charCode === 13) {
      // Prevent the default action to stop scrolling when space is pressed
      e.preventDefault()
      this.updateLog('Button received click with keyboard')
    }
  }

  updateLog = message => this.setState({ log: [message, ...this.state.log] })

  render() {
    const { value } = this.state
    return (
      <div className="App">
        <div className="background-gradient">
          <div className="App-header">
            <h2>MUSIC VAULT</h2>
            <h4>Adjust the sliders and press calculate to receive an algorithmically generated recommendation.</h4>
          </div>
          <SliderRow>
            <div className='slider-grid'>
              <div className='slider-label'>ENERGY</div>
              <Slider
                min={0}
                max={100}
                value={value}
                onChangeStart={this.handleChangeStart}
                onChange={this.handleChange}
                onChangeComplete={this.handleChangeComplete}
              />
              <div className='value'>{value}</div>
            </div>
          </SliderRow>
          <SliderRow>
            <div className='slider-grid'>
              <div className='slider-label'>VALENCE</div>
              <Slider
                min={0}
                max={100}
                value={value}
                onChangeStart={this.handleChangeStart}
                onChange={this.handleChange}
                onChangeComplete={this.handleChangeComplete}
              />
              <div className='value'>{value}</div>
            </div>
          </SliderRow>
          <SliderRow>
            <div className='slider-grid'>
              <div className='slider-label'>DEPTH</div>
              <Slider
                min={0}
                max={100}
                value={value}
                onChangeStart={this.handleChangeStart}
                onChange={this.handleChange}
                onChangeComplete={this.handleChangeComplete}
              />
              <div className='value'>{value}</div>
            </div>
          </SliderRow>
          <div>
            <Button
              className='calculateButton'
              content='Calculate'
              onClick={this.handleClick}
              onKeyPress={this.handleKeyPress}
            />
          </div>
          <div className="App-footer">
            <img src={logo} className="App-logo" alt="logo" />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
