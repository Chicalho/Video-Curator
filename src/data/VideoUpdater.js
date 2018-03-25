// Takes Directory with all video paths and compares to StorageManager database. Adds the ones that are missing (new ones)
var Database = require("./Database");
var Factory = require("./Factory");

var VideoUpdater = {};

VideoUpdater.run = function(paths, callback){
	console.log("updating database with new videos... (paths from Directory that were not already in Database)");
	var newVideos = [];
	var len = paths.length;
	var video;
	var path;
	var id;
	console.log("\n");
	for(var i = 0; i < len; i++){
		path = paths[i];
		id = btoa(path); // path encoded to base 64 as ID
		video = Database.get(id);
		console.log("testing if video id", id, "is already in database...");
		console.log("(with path", path, ")");
		if(video == undefined){
			console.log("it is NOT. Creating new video object.");
			newVideos.push(Factory.createVideoDefinitionObject(path));
		}else{
			console.log("it is. Ignoring this video.");
		}
		console.log("\n");
	}
	
	if(newVideos.length > 0){
		Database.add(newVideos);
	}else{
		console.log("no new videos. Database will not be updated.");
	}
	
	callback();
}

module.exports = VideoUpdater;