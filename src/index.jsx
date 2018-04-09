import React from "react";
import ReactDOM from "react-dom";
import StorageManager from "./data/StorageManager";
import FilePolice from "./data/FilePolice";
import Curator from "./data/Curator";
import Database from "./data/Database";
// import VideoAnalizer from "./tools/VideoAnalizer";
import LOG from "./logger/LOG";
import ControllerView from "./components/ControllerView/ControllerView";

/**********************************************************
TOGGLE LOG FUNCTIONS
**********************************************************/

// LOG.storage = true;
// LOG.filePolice = true;
// LOG.curatorSummary = true;
// LOG.curatorDetail = true;
// LOG.database = true;

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

    // Uncomment below to profile videos metadata
    // VideoAnalizer(Curator.DATA);

    startApp();
}

// Step 6: Start Application
function startApp(){
    // Code here
    // StorageManager.save();
 	// ReactDOM.render(<ControllerView/>, document.getElementById('ControllerView'));
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

// const captureFrame = require('capture-frame')

// const video = document.createElement('video')
// video.addEventListener('canplay', onCanPlay)
// video.volume = 0

// video.setAttribute('crossOrigin', 'anonymous') // optional, when cross-domain
// video.src = `http://example.com/test.webm`
// video.play()

// function onCanPlay () {
//   video.removeEventListener('canplay', onCanPlay)
//   video.addEventListener('seeked', onSeeked)

//   video.currentTime = 2 // seek 2 seconds into the video
// }

// function onSeeked () {
//   video.removeEventListener('seeked', onSeeked)

//   const buf = captureFrame(video)

//   // unload video element, to prevent memory leaks
//   video.pause()
//   video.src = ''
//   video.load()

//   // show the captured image in the DOM
//   const image = document.createElement('img')
//   image.src = window.URL.createObjectURL(new window.Blob([buf]))
//   document.body.appendChild(image)
// }