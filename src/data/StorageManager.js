import LOG from "../logger/LOG";
import MSG from "../logger/MSG";

var StorageManager = {};

StorageManager.load = function(storageID, file, callback){
	StorageManager.file = file;
	StorageManager.storageID = storageID;
	StorageManager.callback = callback;
	StorageManager.storage = localStorage.getItem(StorageManager.storageID);
	StorageManager.testStorage();
}

StorageManager.testStorage = function(){
	LOG(MSG.STORAGE_TEST);
	if(StorageManager.storage == null){
		LOG(MSG.STORAGE_FAIL);
		//get json data
		StorageManager.xhr = new XMLHttpRequest();
		StorageManager.getFile();
	}else{
		LOG(MSG.STORAGE_SUCCESS);
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
			LOG(MSG.STORAGE_XHR_FAIL, this.status);
		}
	}
}

StorageManager.buildData = function(data){
	LOG(MSG.STORAGE_DONE);
	StorageManager.callback(JSON.parse(data));
}

StorageManager.save = function(database){
	var dbToString = JSON.stringify(database);
	localStorage.setItem(StorageManager.storageID, dbToString);
	LOG(MSG.STORAGE_SAVE);
}

StorageManager.export = function(){
	var storageData = localStorage.getItem(StorageManager.storageID);
	var url = "data:text/json;charset=utf8," + encodeURIComponent(storageData);

	//OPEN DEV TOOLS
	//CLICK LINK MANUALLY
	//THEN SAVE AS JSON
	LOG(MSG.STORAGE_EXPORT, url);
}

export default StorageManager;