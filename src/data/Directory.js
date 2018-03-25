//Fetches .txt with all video paths, removes drive prefix (Z:/etc), replace \ with / and creates array with all paths

var Directory = {};

Directory.load = function(file, prefix, callback){
	console.log("loading file", file, "and removing prefix", prefix, "from each line.");
	Directory.file = file;
	Directory.prefix = prefix;
	Directory.callback = callback;
	Directory.xhr = new XMLHttpRequest();
	Directory.getFile();
}

Directory.getFile = function(){
	Directory.xhr.onreadystatechange = Directory.onResponse;
	Directory.xhr.open("GET", Directory.file);
	Directory.xhr.send(null);
}

Directory.onResponse = function(){
	var DONE = 4;
	var OK = 200;
	if(this.readyState === DONE) {
		if (this.status === OK) {
			Directory.buildList(this.responseText);
		} else {
			console.log('Error: ' + this.status);
		}
	}
}

Directory.buildList = function(response){
	console.log("building list with all directory paths...");
	var list = response.split("\n");
	for(var i=0; i < list.length; i++){
		list[i] = list[i].replace(Directory.prefix,"");
		list[i] = list[i].replace(new RegExp(/\\/g), "/");
		list[i] = list[i].replace(/[\x00-\x1F\x7F-\x9F]/g, "");
		console.log("Directory:", list[i]);
	}
	Directory.list = list;
	Directory.callback();
}

module.exports = Directory;