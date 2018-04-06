import StorageManager from "./data/StorageManager";
import FilePolice from "./data/FilePolice";
import Curator from "./data/Curator";
import Database from "./data/Database";
import LOG from "./logger/LOG";

/**********************************************************
TOGGLE LOG FUNCTIONS
**********************************************************/

LOG.storage = true;
LOG.filePolice = true;
LOG.curatorSummary = true;
LOG.curatorDetail = true;
LOG.database = true;

/**********************************************************
APPLICATION INIT
**********************************************************/

// Step 1: Load VDO data from local storage. If it fails, load it from saved file.
StorageManager.load("VideoLocalStorage", "/backup/vdos.json", onStorageManagerLoad);

// Step 2: When StorageManager.DATA (JSON) is loaded, user interaction is allowed
function onStorageManagerLoad(){
    //unlock/render UI here
}

// Step 3: Enable file picker. After pick, files are sent to FilePolice that flags all files in directory
document.getElementById("filepicker").addEventListener("change", function(event) {
    FilePolice(event.target.files, filePoliceDone);
}, false);

// Step 4: Non .mp4 are sent to filePoliceLog to handle later. Mp4 files are matched to Vdos from storage by Curator
function filePoliceDone(veredict){
    Curator(veredict.mp4, StorageManager.DATA, curatorDone);
}

// Step 5: Application database is built using output from Curator
function curatorDone(){
    Database.build(Curator.DATA);
    startApp();
}

// Step 6: Start Application
function startApp(){
    // Code here
}

/**********************************************************
SAVE & EXPORT FUNCTIONS
**********************************************************/

// FEATURE: This method saves the application database (Vdos) to local storage
document.getElementById("saveButton").addEventListener("click", function(event) {
    StorageManager.save( Database.getAll() );
}, false);

// FEATURE: This method outputs the local storage data as a url to the console. Clicking it opens a JSON page that can be saved as the JSON file used for StorageManager.load
document.getElementById("exportButton").addEventListener("click", function(event) {
    StorageManager.export();
}, false);




/*
function printLegitFiles(files){

    let output = document.getElementById("listing");
    for(var file of files){
        let item = document.createElement("li");
        // item.innerHTML = file.webkitRelativePath;
        // item.innerHTML = FormatBytes(file.size);
        // item.innerHTML = URL.createObjectURL(file);
        output.appendChild(item);
    }

    // const video = document.createElement('video');
    // video.addEventListener('loadedmetadata', event => {
    // console.log(video);
    // });
    // video.src = URL.createObjectURL(files[i]);
    // video.controls = true;
    // document.body.appendChild(video);
}
*/