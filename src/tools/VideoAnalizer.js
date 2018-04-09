const video = document.createElement('video');
video.addEventListener('loadedmetadata', onMetadataAvailable);

let index = 0;
let vdos;
let sizes = {};
let timeoutId;

function VideoAnalizer(v){
    vdos = v;
    // console.log("READY:", v);
    loadVideo();
}

function loadVideo() {
    if(index < vdos.length){
        if(vdos[index].noFile){
            //just advance
            moveToNext();
        }else{
            console.log(index,vdos[index].filePath);
            video.src = vdos[index].fileUrl;
            timeoutId = setTimeout(
                function(){ 
                    console.log("The above video has timed out...");
                    if(index < vdos.length){
                        moveToNext();
                    }
                }, 
            1000);
        }
    }else{
        //on done
        console.log(sizes);
    }
}

function onMetadataAvailable(e) {

    clearTimeout(timeoutId);

    let key = video.videoWidth + "x" + video.videoHeight;

    if(sizes[key]){
        sizes[key].count++;
        sizes[key].vdos.push(vdos[index]);
    }else{
        sizes[key] = {
            width:video.videoWidth,
            height:video.videoHeight,
            ratio:precisionRound(video.videoWidth / video.videoHeight, 2),
            count:1,
            vdos:[vdos[index]]
        }
        console.log(sizes[key]);
    }
 
    moveToNext();
}

function moveToNext(){
    video.src = "";
    index++;
    loadVideo();
}

function precisionRound(number, precision) {
    var factor = Math.pow(10, precision);
    return Math.round(number * factor) / factor;
}

export default VideoAnalizer;