import LOG from "../logger/LOG";
import MSG from "../logger/MSG";

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
	LOG(MSG.DATABASE_BUILT);
	Database._db = videoDefinitionObjectList;
	Database._updateHash(videoDefinitionObjectList);
};

Database.getAll = function(){
	LOG(MSG.DATABASE_GET_ALL);
	return Database._db;
};

Database.get = function(id){
	LOG(MSG.DATABASE_GET_BY_ID, id);
	return Database._hash[id];
};

export default Database;