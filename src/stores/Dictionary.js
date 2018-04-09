class Dictionary{
    
    static from(db){
        var dictionary ={
			names: new Set(["Untitled"]),
			studios: new Set(["Untagged"]),
			series: new Set(["Untagged"]),
			actors: new Set(["Untagged"]),
			tags: new Set(["Untagged"])
		};
		
		for(var vdo of db) {
			if( !dictionary.names.has(vdo.name) ){
				dictionary.names.add(vdo.name);
			}
			if( !dictionary.names.has(vdo.movieId) ){
				dictionary.names.add(vdo.movieId);
			}
			for(var studio of vdo.studios) {
				if( !dictionary.studios.has(studio) ){
					dictionary.studios.add(studio);
				}
			}
			for(var serie of vdo.series) {
				if( !dictionary.series.has(serie) ){
					dictionary.series.add(serie);
				}
			}
			for(var actor of vdo.actors) {
				if( !dictionary.actors.has(actor) ){
					dictionary.actors.add(actor);
				}
			}
			for(var tag of vdo.tags) {
				if( !dictionary.tags.has(tag) ){
					dictionary.tags.add(tag);
				}
			}
		}
		
		return dictionary;
    }
    
}

export default Dictionary;