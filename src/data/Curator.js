import VdoFactory from "./VdoFactory";
import Comparator from "./Comparator";
import FormatBytes from "../tools/FormatBytes";

const LOG_OPERATIONS = false;

var restFiles;
var restVdos;

var doneVdos = [];
var doneFiles = [];

function Curator(inputFiles, inputVdos){

    restFiles = inputFiles;
    restVdos = inputVdos;

    addNew();
    curate(onMarkToRemove, markOldVdo, "[ MARKED TO REMOVE ] (vdo.noFile === true)");
    curate(onUpdateUrl, updateVdoUrl, "[ NO CHANGE ]");
    curate(onUpdateSize, updateVdoSize, "[ UPDATE SIZE ]");
    curate(onUpdateName, updateVdoName, "[ UPDATE NAME ]");
    curate(onUpdatePath, updateVdoPath, "[ UPDATE PATH ]");
    identifyAmbiguities();
    curate(onUpdateNameAndPath, updateVdoNameAndPath, "[ UPDATE NAME & PATH ]");
    curate(onAddPossibleMatches, addPossibleMatches, "[ CONFLICT ] (vdo.conflict for more info)");

    console.log("\n**********", doneFiles.length ,"FILES PROCESSED **********");
    console.log("\n", doneVdos.length, "EXISTING VDOS (", (doneVdos.length-doneFiles.length), "MARKED TO REMOVE )\n", doneVdos);
    console.log("\nUNPROCESSED VDOS:", restVdos);
    console.log("UNPROCESSED FILES:", restFiles);
}

/*---------------------------------------------------------------------
    ADD NEW (NO VDO)
---------------------------------------------------------------------*/

function addNew(){
    var newFiles = [];
    for( var file of restFiles ){
        if(!restVdos.find( Comparator.vdoMatches(file) )){
            log(null, file, "[ ADDED NEW VDO ]")
            doneVdos.push(VdoFactory.createVideoDefinitionObject(file));
            newFiles.push(file);
        }
    }
    for( var file of newFiles ){
        doneFiles.push(restFiles.splice( restFiles.indexOf(file), 1 ));
    }
}

/*---------------------------------------------------------------------
    MARK OLD (NO FILE)
---------------------------------------------------------------------*/

function onMarkToRemove(vdo){
    return !restFiles.find( Comparator.fileAnyMatches(vdo));
}

function markOldVdo(vdo){
    vdo.noFile = true;
}

/*---------------------------------------------------------------------
    UPDATE URL (EXISTING)
---------------------------------------------------------------------*/

function onUpdateUrl(vdo){
    return restFiles.find( Comparator.fileExactMatches(vdo));
}

function updateVdoUrl(vdo, file){
    // vdo.fileUrl =  URL.createObjectURL(file);
    vdo.fileUrl = "Dummy URL Update!";
}

/*---------------------------------------------------------------------
    UPDATE SIZE (EXISTING)
---------------------------------------------------------------------*/

function onUpdateSize(vdo){
    return restFiles.find( Comparator.fileNamePathMatches(vdo));
}

function updateVdoSize(vdo, file){
    // vdo.fileUrl =  URL.createObjectURL(file);
    vdo.fileUrl = "Dummy URL Update!";
    vdo.restFilesize = file.size;
}

/*---------------------------------------------------------------------
    UPDATE NAME (EXISTING)
---------------------------------------------------------------------*/

function onUpdateName(vdo){
    return restFiles.find( Comparator.fileSizePathMatches(vdo));
}

function updateVdoName(vdo, file){
    // vdo.fileUrl =  URL.createObjectURL(file);
    vdo.fileUrl = "Dummy URL Update!";
    vdo.fileName = file.name;
    vdo.filePath = file.webkitRelativePath;
}

/*---------------------------------------------------------------------
    UPDATE PATH (EXISTING)
---------------------------------------------------------------------*/

function onUpdatePath(vdo){
    return restFiles.find( Comparator.fileNameSizeMatches(vdo));
}

function updateVdoPath(vdo, file){
    // vdo.fileUrl =  URL.createObjectURL(file);
    vdo.fileUrl = "Dummy URL Update!";
    vdo.filePath = file.webkitRelativePath;
}

/*---------------------------------------------------------------------
    IDENTIFY VDOS THAT MATCH MULTIPLE FILES (CONFLICT)
---------------------------------------------------------------------*/

function identifyAmbiguities(){
    var unresolvedCheck = {};
    var unresolvedSizes = new Set();
    var unresolvedVdos = [];
    var similarVdos = {};
    
    // iterate rest videos, find duplicate sizes
    for( var vdo of restVdos ){
        if( unresolvedCheck[ String(vdo.fileSize) ] ){
            // Size exists
            unresolvedSizes.add(vdo.fileSize);
        }else{
            // Size is new
            unresolvedCheck[ String(vdo.fileSize) ] = true;
        }
    }

    // iterate rest videos again, to mark duplicates
    for( var vdo of restVdos ){
        if( unresolvedSizes.has(vdo.fileSize) ){
            unresolvedVdos.push(vdo);
        }
    }

    // Create similarVdos array for each ambiguous file size, to store matching files
    for( var size of unresolvedSizes ){
        similarVdos[ String(size) ] = [];
    }

    // iterate unresolvedVdos, add files of same size to corresponding array
    for( var vdo of unresolvedVdos ){
        similarVdos[ String(vdo.fileSize) ].push(vdo);
    }

    // iterate unresolvedVdos again, add array of same size files to the conflict prop
    for( var vdo of unresolvedVdos ){
        vdo.conflict.exists = true;
        vdo.conflict.similarVdos = similarVdos[ String(vdo.fileSize) ];
    }

}

/*---------------------------------------------------------------------
    UPDATE NAME & PATH (EXISTING)
---------------------------------------------------------------------*/

function onUpdateNameAndPath(vdo){
    return restFiles.find( Comparator.fileSizeMatchesNoConflict(vdo) );
}

function updateVdoNameAndPath(vdo, file){
    // vdo.fileUrl =  URL.createObjectURL(file);
    vdo.fileUrl = "Dummy URL Update!";
    vdo.fileName = file.name;
    vdo.filePath = file.webkitRelativePath;
}

/*---------------------------------------------------------------------
    NO UPDATE (ADD MATCHING POSSIBILIIES)
---------------------------------------------------------------------*/

function onAddPossibleMatches(vdo){
    var possibleMatches = [];
    for( var file of restFiles ){
        if(file.size === vdo.fileSize){
            possibleMatches.push(file);
        }
    }
    return possibleMatches;
}

function addPossibleMatches(vdo, files){
    vdo.conflict.matchingFiles = files;
}

/*---------------------------------------------------------------------
    GENERIC
---------------------------------------------------------------------*/

function curate(matchFunction, successFunction, message){
    var unprocessedVdos = [];
    var usedFiles = [];
    for( var vdo of restVdos ){
        var payload = matchFunction(vdo);
        if(payload){
            log(vdo, payload, message);
            successFunction(vdo, payload);
            doneVdos.push(vdo);
            if(payload !== true){
                usedFiles.push(payload);
            }
        }else{
            unprocessedVdos.push(vdo);
        }
    }
    for( var file of usedFiles ){
        doneFiles.push(restFiles.splice( restFiles.indexOf(file), 1 ));
    }
    restVdos = unprocessedVdos;
}

function log(vdo, payload, message){

    if(!LOG_OPERATIONS){
        return;
    }

    console.log("\n");
    console.log(message);

    if(!vdo){ 
        // CASE: Add VDO
        console.log("ADD NAME ==>", payload.name);
        console.log("ADD SIZE ==>", FormatBytes(payload.size));
        console.log("ADD PATH ==>", payload.webkitRelativePath);
    }else if(payload === true){ 
        // CASE: Remove VDO
        console.log("REMOVE NAME ==>", vdo.fileName);
        console.log("REMOVE SIZE ==>", FormatBytes(vdo.fileSize));
        console.log("REMOVE PATH ==>", vdo.filePath);

    }else if(payload.length){ 
        // CASE: Conflict
        console.log([vdo], "=== COULD BE ONE OF ==>", payload);
    }else{
        // CASE: Info Updates
        if( vdo.fileName !== payload.name ){
            console.log("NEW NAME ==>", vdo.fileName);
            console.log("OLD NAME ==>", payload.name);
        }else{
            console.log("SAME NAME ==>", vdo.fileName);
        }
        if( vdo.fileSize !== payload.size ){
            console.log("NEW SIZE ==>", FormatBytes(vdo.fileSize));
            console.log("OLD SIZE ==>", FormatBytes(payload.size));
        }else{
            console.log("SAME SIZE ==>", FormatBytes(vdo.fileSize));
        }
        if( vdo.filePath !== payload.webkitRelativePath ){
            console.log("NEW PATH ==>", vdo.filePath);
            console.log("OLD PATH ==>", payload.webkitRelativePath);
        }else{
            console.log("SAME PATH ==>", vdo.filePath);
        }
    }
}

export default Curator;