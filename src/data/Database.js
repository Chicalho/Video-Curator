//this stores and manipulates video objects

var Database = {
	_db:null,
	_hash:{},
	_updateHash:function(videoDefinitionObjectList){
		var len = videoDefinitionObjectList.length;
		var vid;
		for(var i = 0; i < len; i++){
			vid = videoDefinitionObjectList[i];
			Database._hash[vid.id] = vid;
		}
	}
};

Database.build = function(videoDefinitionObjectList){
	console.log("built database.");
	Database._db = videoDefinitionObjectList;
	Database._updateHash(videoDefinitionObjectList);
};

Database.add = function(videoDefinitionObjectList){
	console.log("added", videoDefinitionObjectList.length, "new videoDefinitionObjectList to database.");
	//add videoDefinitionObjectList array to Database._db
	Database._db = Database._db.concat(videoDefinitionObjectList);
	Database._updateHash(videoDefinitionObjectList);
};

Database.getAll = function(){
	console.log("getting entire database.");
	return Database._db;
};

Database.get = function(id){
	console.log("getting video with id", id);
	return Database._hash[id];
};

module.exports = Database;