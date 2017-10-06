import React, { Component } from 'react';
import logo from './logo.svg';
import { Button } from 'semantic-ui-react';
import Slider from './app/components/Slider/Slider'
import './App.css';
import glamorous from 'glamorous'

const SliderRow = glamorous.div({
  maxWidth: 750,
  margin: "0 auto",
  paddingTop: 20,
  paddingBottom: 20
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
            <h2>BASIS</h2>
          </div>
          <SliderRow>
            <div>
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
