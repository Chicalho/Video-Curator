//Fetches video objects from local storage. If no local storage, fetches .json and sets it as storage.
var Database = require("./Database");

var StorageManager = {};

StorageManager.load = function(file, storageID, callback){
	StorageManager.file = file;
	StorageManager.storageID = storageID;
	StorageManager.callback = callback;
	StorageManager.storage = localStorage.getItem(StorageManager.storageID);
	StorageManager.testStorage();
}

StorageManager.testStorage = function(){
	console.log("testing if data is already saved in local storage...");
	if(StorageManager.storage == null){
		console.log("data is NOT saved in local storage, fetching json backup.");
		//get json data
		StorageManager.xhr = new XMLHttpRequest();
		StorageManager.getFile();
	}else{
		console.log("data is saved in local storage, using it.");
		//use storage data
		StorageManager.buildData(localStorage.getItem(StorageManager.storageID));
	}
}

StorageManager.getFile = function(){
	StorageManager.xhr.onreadystatechange = StorageManager.onResponse;
	StorageManager.xhr.open("GET", StorageManager.file);
	StorageManager.xhr.send(null);
}

StorageManager.onResponse = function(){
	var DONE = 4;
	var OK = 200;
	if(this.readyState === DONE) {
		if (this.status === OK) {
			localStorage.setItem(StorageManager.storageID, this.responseText);
			StorageManager.buildData(localStorage.getItem(StorageManager.storageID));
		} else {
			console.log('Error: ' + this.status);
		}
	}
}

StorageManager.buildData = function(data){
	console.log("preparing database build.");
	Database.build(JSON.parse(data));
	StorageManager.callback();
}

StorageManager.save = function(){
	var database = Database.getAll();
	var dbToString = JSON.stringify(database);
	localStorage.setItem(StorageManager.storageID, dbToString);
	console.log("saving database (js object) to local storage.");
}

StorageManager.export = function(){
	console.log("exporting database to file (in browser tab)");
	var storageData = localStorage.getItem(StorageManager.storageID);
	var url = "data:text/json;charset=utf8," + encodeURIComponent(storageData);
	
	//NOT LONGER WORKS FROM CHROME 56
	//window.open(url, "_blank");
	//window.focus();
	
	//OPEN DEV TOOLS
	//CLICK LINK MANUALLY
	//THEN SAVE AS JSON
	console.log(url);
}

module.exports = StorageManager;