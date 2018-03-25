import VdoFactory from "./VdoFactory";

var files = [];
var vdos = [];
var newVdos = [];

var stagedVdos;

function Curator(f, v){

    files = f;
    stagedVdos = v;

    console.log("starting files:" , files);
    console.log("starting stagedVdos:" , stagedVdos);

    // noChangePlugin();
    markNoFilePlugin();
}

function noChangePlugin(){

    // iterate mp4 files
    for(let i=0; i<files.length; i++) {
        for(let j=0; j<stagedVdos.length; j++) {
            // find vdos with same props:
            if( matchNameSizePath(stagedVdos[j], files[i]) ){
                // stagedVdos[j] = stagedVdos[j].set("fileUrl", URL.createObjectURL(files[i]));
                vdos.push( stagedVdos.splice(j,1)[0] );
            }
        }
    }
    
    if( stagedVdos.length === 0 && files.length === vdos.length ){
        curatorDone();
    }else{
        pathChangePlugin();
    }
 
}

function pathChangePlugin(){

    // iterate mp4 files
    for(let i=0; i<files.length; i++) {
        for(let j=0; j<stagedVdos.length; j++) {
            // find vdos with same props:
            if( matchNameSize(stagedVdos[j], files[i]) ){
                // stagedVdos[j] = stagedVdos[j].set("fileUrl", URL.createObjectURL(files[i]));
                stagedVdos[j] = stagedVdos[j].set("filePath", files[i].webkitRelativePath);
                vdos.push( stagedVdos.splice(j,1)[0] );
            }
        }
    }
    
    if( stagedVdos.length === 0 && files.length === vdos.length ){
        curatorDone();
    }else{
        nameChangePlugin();
    }

}

function nameChangePlugin(){

    // iterate mp4 files
    for(let i=0; i<files.length; i++) {
        for(let j=0; j<stagedVdos.length; j++) {
            // find vdos with same props:
            if( matchSizePath(stagedVdos[j], files[i]) ){
                // stagedVdos[j] = stagedVdos[j].set("fileUrl", URL.createObjectURL(files[i]));
                stagedVdos[j] = stagedVdos[j].set("filePath", files[i].webkitRelativePath);
                stagedVdos[j] = stagedVdos[j].set("fileName", files[i].name);
                vdos.push( stagedVdos.splice(j,1)[0] );
            }
        }
    }
    
    if( stagedVdos.length === 0 && files.length === vdos.length ){
        curatorDone();
    }else{
        nameAndPathChangePlugin();
    }

}

function nameAndPathChangePlugin(){

    var unresolvedCheck = {};
    var unresolvedSizes = new Set();
    // var unresolvedVideos = [];

    // iterate mp4 files
    for(let i=0; i<files.length; i++) {
        for(let j=0; j<stagedVdos.length; j++) {
            // find vdos with same props:
            if( matchSize(stagedVdos[j], files[i]) ){
                if( unresolvedCheck[String(stagedVdos[j].fileSize)] ){
                    // Size exists
                    unresolvedSizes.add(stagedVdos[j].fileSize);
                }else{
                    // Size is new
                    unresolvedCheck[String(files[i].size)] = true;
                }
            }
        }
    }

    // iterate mp4 files
    for(let i=0; i<files.length; i++) {
        for(let j=0; j<stagedVdos.length; j++) {
            // find vdos with same props:
            if( matchSize(stagedVdos[j], files[i]) ){
                if( unresolvedSizes.has(stagedVdos[j].fileSize) ){
                    //fail: multiple videos with same size, cant resolve
                    // unresolvedVideos.push(stagedVdos[j]);
                    stagedVdos[j] = stagedVdos[j].set("conflict", true); // maybe pass file instead of true
                }
                // else{
                    // if size is a match and no other video has same size:
                    // stagedVdos[j] = stagedVdos[j].set("fileUrl", URL.createObjectURL(files[i]));
                    stagedVdos[j] = stagedVdos[j].set("filePath", files[i].webkitRelativePath);
                    stagedVdos[j] = stagedVdos[j].set("fileName", files[i].name);
                    vdos.push( stagedVdos.splice(j,1)[0] );
                // }
            }
        }
    }

    // debugger

    // if( stagedVdos.length === 0 && files.length === vdos.length ){
    //     // All videos resolved, no need to add / remove vdos
    //     curatorDone();
    // }

    // if( stagedVdos.length === 0 && files.length === vdos.length ){
    //     // All videos resolved, no need to add / remove vdos
    //     curatorDone();
    // }else if( stagedVdos.length === 0 && files.length !== vdos.length ){
    //     // All videos resolved, BUT need to add / remove vdos
    //     updatePlugin();
    // }else if( stagedVdos.length > 0){
    //     // Need to resolve videos
    //     if(files.length !== (vdos.length + stagedVdos.length) ){
    //         // And need to add / remove vdos
    //         updatePlugin();
    //     }else{
    //         // And NO need to add / remove vdos
    //         curatorDone();
    //         console.log("Unresolved Videos:", unresolvedVideos);
    //     }
    // }

}

function markNoFilePlugin(){

    // iterate vdos and mark ones that dont match any file params 
    for(let i=0; i<stagedVdos.length; i++) {
        for(let j=0; j<files.length; j++) {
            if( dontMatch(stagedVdos[i], files[j]) ){
                stagedVdos[i] = stagedVdos[i].set("noFile", true);
            }
        }
    }
    
    newVdoPlugin();
}

function newVdoPlugin(){
    // iterate files and create new vdos if the file doesnt match any vdo params
    for(let i=0; i<files.length; i++) {
        for(let j=0; j<stagedVdos.length; j++) {
            if( dontMatch(stagedVdos[j], files[i]) ){
                var vdo = VdoFactory.createVideoDefinitionObject(files[i]);
                var exists = false;
                for(var v of newVdos){
                    if(!vdo.equals(v)){
                        exists = true;
                    }
                }
                if(!exists || newVdos.length === 00){
                    newVdos.push( vdo );
                }
            }
        }
    }

    debugger
    stagedVdos;
    newVdos;
    // test
}

function updatePlugin(){
    console.log("updating(adding/removing vdos)...");
    curatorDone();
}

function curatorDone(){
    console.log("done files:" , files);
    console.log("done staged:" , stagedVdos);
    console.log("done vdos:" , vdos);
}

function matchNameSizePath(vdo, file){
    if( vdo.fileName === file.name &&
        vdo.fileSize === file.size &&
        vdo.filePath === file.webkitRelativePath){
        return true;
    }
    return false;
}

function matchNameSize(vdo, file){
    if( vdo.fileName === file.name &&
        vdo.fileSize === file.size){
        return true;
    }
    return false;
}

function matchSizePath(vdo, file){
    var vdoJustPath = vdo.filePath.substr(0, vdo.filePath.length - vdo.fileName.length);
    var fileJustPath = file.webkitRelativePath.substr(0, file.webkitRelativePath.length - file.name.length);
    if( vdo.fileSize === file.size &&
        vdoJustPath === fileJustPath){
        return true;
    }
    return false;
}

function matchSize(vdo, file){
    if( vdo.fileSize === file.size){
        return true;
    }
    return false;
}

function dontMatch(vdo, file){
    if( vdo.fileName !== file.name ||
        vdo.fileSize !== file.size ||
        vdo.filePath !== file.webkitRelativePath){
        return true;
    }
    return false;
}

export default Curator;