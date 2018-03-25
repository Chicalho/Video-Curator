var Factory = {};

Factory.createVideoDefinitionObject = function(path){
	var videoDefinitionObject = {
		id:btoa(path),			//url of video, used as unique id after base64 encode ( use atob() to decode)
		path:path,				//url of video
		name:"Untitled",		//name of the video
		type:"None",			//Movie, Scene, Clip
		movieId:"Untitled",		//movie id (to group scenes of the same movie)
		studios:["Untagged"],	//studio name
		series:["Untagged"],	//series name
		actors:["Untagged"],	//actor tags
		tags:["Untagged"],		//other tags
		watched:0,				//number of times watched
		lastWatched:0,			//date in milisec last time hit play
		dateCreated:0,			//date in milisec when added to database
		rating:0,				//rating, 1 thumbs down, 3 thumbs up, 2 neutral
		stills:[]				//array with urls of still photo screenshots
	};
	console.log("New VideoDefinitionObject created for id", videoDefinitionObject.id);
	console.log("(", videoDefinitionObject, ")");
	return videoDefinitionObject;
}

module.exports = Factory;