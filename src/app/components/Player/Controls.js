import React, { Component } from 'react';

class Controls extends Component{
	render() {
		
		let classNames;
		if (this.props.isPlaying == 'pause') {
			classNames = 'fa fa-fw fa-pause';
		} else {
			classNames = 'fa fa-fw fa-play';
		}
		
		return (
			<div className="Controls">
				<div onClick={this.props.onClick} className="Button">
					<i className={classNames}></i>
				</div>
			</div>
		)
	}
};

export default Controls;