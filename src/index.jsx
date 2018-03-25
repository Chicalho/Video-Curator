import FilePolice from "./data/FilePolice";
import Curator from "./data/Curator";
import FakeFiles from "./data/FakeFiles";
import FakeVdos from "./data/FakeVdos";
import FormatBytes from "./tools/FormatBytes";

document.getElementById("filepicker").addEventListener("change", function(event) {
    FilePolice(event.target.files, filePoliceDone);
}, false);

function filePoliceDone(veredict){
    if(veredict.isLegit){
        console.log("Continue, its legit");
    }else{
        console.log("NOT legit");
        if(veredict.hasEmpty){
            console.log("Has empty files");
        }
        if(veredict.hasDuplicates){
            console.log("Has duplicate files");
        }
    }
    console.log("LEGIT:", veredict.legit);
    console.log("EMPTY:", veredict.empty);
    console.log("DUPLICATES:", veredict.duplicates);
    console.log("OTHER:", veredict.other);

    // Curator(FakeFiles, FakeVdos);
    Curator(veredict.legit, []);
    // printLegitFiles(veredict.legit);
}

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
  

// import Directory from "./data/Directory";
// import StorageManager from "./data/StorageManager";
// import VideoUpdater from "./data/VideoUpdater";

// Directory.load("/_staticDataEntryPoints/dir_mp4_output.txt", "Z:\\System\\", onDirectoryLoad);

// function onDirectoryLoad(){
// 	console.log("\n");
// 	StorageManager.load("/_staticDataEntryPoints/videoObjectsBackupFile.json", "VideoLocalStorage", onStorageManagerLoad);
// }

// function onStorageManagerLoad(){
// 	console.log("\n");
// 	VideoUpdater.run(Directory.list, onDatabaseReady);
// }

// function onDatabaseReady(){
// 	console.log("database ready.");
// 	StorageManager.save();
// }