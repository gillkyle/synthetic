import React, { Component } from 'react';
import glamorous from 'glamorous';
import Slider from './Slider';


const SliderRow = glamorous.div({
  maxWidth: 820,
  margin: '0 auto',
  paddingBottom: 20,
  lineHeight: 1.25,
  '@media only screen and (max-width: 768px)': {
    paddingBottom: 5,
  }
});

class SliderSelector extends Component{
	constructor(props) {
    super(props);
    this.state = {

    }
  };

  render() {
    const { label, value, onChange } = this.props;
    return (
      <SliderRow>
        <div className='slider-grid'>
          <div className='slider-label'>{label}</div>
          <Slider
            min={0}
            max={100}
            value={value}
            onChange={this.props.onChange}
          />
          <div className='value'>{value}</div>
        </div>
      </SliderRow>
    )
  }
};

export default SliderSelector;