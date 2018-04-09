const video = document.createElement('video');
video.addEventListener('loadedmetadata', onMetadataAvailable);

let index = 0;
// let vdos

function VideoAnalizer(vdos){
    console.log("READY:", vdos);

    // loadVideo();
}

function loadVideo() {
    if(vdos.length < index){
        // if(vdos[index].noFile){

        // }else{
        //     video.src = vdos[index].fileUrl;
        // }
    }
}

function onMetadataAvailable(e) {
        console.log(video.videoWidth, video.videoHeight, e);
}

export default VideoAnalizer;


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

// fileName
// :
// "diffsize.mp4"
// filePath
// :
// "original/videos/diffsize.mp4"
// fileSize
// :
// 818675
// fileUrl
// :
// "blob:http://localhost:8080/37f66ecd-3757-4928-8875-f26a72b9ed8f"
// id
// :
// "fd3cca40-39ba-11e8-9131-a1f88218988a"

// noFile
// :
// true