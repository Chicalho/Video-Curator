import "./VideoThumb.scss";

import React from 'react';
import VideoActions from '../../actions/VideoActions';

class VideoThumb extends React.Component{
	render(){
		
		var outputStudios = "";
		for(var studio of this.props.videoDefinitionObject.studios){
			outputStudios+=studio;
		}

		var outputSeries = "";
		for(var serie of this.props.videoDefinitionObject.series){
			outputSeries+=serie;
		}

		var outputActors = "";
		for(var actor of this.props.videoDefinitionObject.actors){
			outputActors+=actor;
		}

		var outputTags = "";
		for(var tag of this.props.videoDefinitionObject.tags){
			outputTags+=tag;
		}

		return ( 
		  <article 
			  className={"VideoThumb " + (this.props.selected ? "selected" : "")} 
			  onClick={() => this._handleClick(this.props.videoDefinitionObject, this.props.selected)}>
		  	<h1><b>id:</b>{this.props.videoDefinitionObject.id}</h1>
			<p><b>filePath:</b>{this.props.videoDefinitionObject.filePath}</p>
			<p><b>fileUrl:</b>{this.props.videoDefinitionObject.fileUrl}</p>
			<p><b>fileName:</b>{this.props.videoDefinitionObject.fileName}</p>
			<p><b>fileSize:</b>{this.props.videoDefinitionObject.fileSize}</p>
			<p><b>name:</b>{this.props.videoDefinitionObject.name}</p>
			<p><b>type:</b>{this.props.videoDefinitionObject.type}</p>
			<p><b>movieId:</b>{this.props.videoDefinitionObject.movieId}</p>
			<p><b>studio:</b>{outputStudios}</p>
			<p><b>series:</b>{outputSeries}</p>
			<p><b>actors:</b>{outputActors}</p>
			<p><b>tags:</b>{outputTags}</p>
			<p><b>watched:</b>{this.props.videoDefinitionObject.watched}</p>
			<p><b>lastWatched:</b>{this.props.videoDefinitionObject.lastWatched}</p>
			<p><b>dateCreated:</b>{this.props.videoDefinitionObject.dateCreated}</p>
			<p><b>rating:</b>{this.props.videoDefinitionObject.rating}</p>
			<p><b>stills:</b>{this.props.videoDefinitionObject.stills}</p>
			<p><b>noFile:</b>{this.props.videoDefinitionObject.noFile}</p>
			<p><b>conflict.exists:</b>{this.props.videoDefinitionObject.conflict.exists}</p>
			<p><b>conflict.similarVdos:</b>{this.props.videoDefinitionObject.conflict.similarVdos}</p>
			<p><b>conflict.matchingFiles:</b>{this.props.videoDefinitionObject.conflict.matchingFiles}</p>
			<p><b>thumb size:</b>{this.props.size}</p>
		  </article>
		);
	}
	
	_handleClick(videoDefinitionObject, selected){
//		VideoActions.updateWatchedCount(videoDefinitionObject.id);
//		VideoActions.changeThumbSize(400);
		if(selected){
			VideoActions.deselectThumb(videoDefinitionObject);
		}else{
			VideoActions.selectThumb(videoDefinitionObject);
		}
	}
}

export default VideoThumb;