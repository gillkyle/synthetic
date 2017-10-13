import React, { Component } from 'react';

class Controls extends Component{
	render() {
		
		let classNames;
		if (this.props.isPlaying === 'pause') {
			classNames = 'fa fa-fw fa-pause';
		} else {
			classNames = 'fa fa-fw fa-play';
		}
		
		return (
			<div className="Controls">
				<div onClick={this.props.onAdd} className="Button">
					<i className={this.props.songInLibrary ? 'fa fa-fw fa-check' : 'fa fa-fw fa-plus'}></i>
				</div>
				<div onClick={this.props.onPlay} className="Button PlayButton">
					<i className={classNames}></i>
				</div>
				<div onClick={this.props.onNext} className="Button">
					<i className='fa fa-fw fa-chevron-right'></i>
				</div>
			</div>
		)
	}
};

export default Controls;