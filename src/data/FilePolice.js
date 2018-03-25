var legitVideosFiles = [];
var emptyVideosFiles = [];
var duplicateVideosFiles = [];
var otherFiles = {
    typeless    :[],
    txt         :[],
    pdf         :[],
    html        :[],
    wmv         :[],
    avi         :[],
    mpeg        :[],
    mov         :[],
    flv         :[],
    mkv         :[],
    jpeg        :[],
    png         :[],
    rest        :[]
};

function FilePolice(files, callback){

    var duplicateCheck = {};

    for (let i=0; i<files.length; i++) {

        if(files[i].type === "video/mp4"){

            if(files[i].size === 0){

                emptyVideosFiles.push(files[i]);

            }else{
                
                if( duplicateCheck[String(files[i].size)] ){ 

                    duplicateVideosFiles.push({
                        copy1:duplicateCheck[String(files[i].size)],
                        copy2:files[i]
                    });

                }else{

                    duplicateCheck[String(files[i].size)] = files[i];
                    legitVideosFiles.push(files[i]);

                }
            }

        }else if(files[i].type === ""){
            otherFiles.typeless.push(files[i]);
        }else if(files[i].type === "text/plain"){
            otherFiles.txt.push(files[i]);
        }else if(files[i].type === "application/pdf"){
            otherFiles.pdf.push(files[i]);
        }else if(files[i].type === "text/html"){
            otherFiles.html.push(files[i]);
        }else if(files[i].type === "video/x-ms-wmv"){
            otherFiles.wmv.push(files[i]);
        }else if(files[i].type === "video/avi"){
            otherFiles.avi.push(files[i]);
        }else if(files[i].type === "video/mpeg"){
            otherFiles.mpeg.push(files[i]);
        }else if(files[i].type === "video/quicktime"){
            otherFiles.mov.push(files[i]);
        }else if(files[i].type === "video/x-flv"){
            otherFiles.flv.push(files[i]);
        }else if(files[i].type === "video/x-matroska"){
            otherFiles.mkv.push(files[i]);
        }else if(files[i].type === "image/jpeg"){
            otherFiles.jpeg.push(files[i]);
        }else if(files[i].type === "image/png"){
            otherFiles.png.push(files[i]);
        }else{
            otherFiles.rest.push(files[i]);
        }
    };

    callback({
        legit:          legitVideosFiles,
        isLegit:        (emptyVideosFiles.length === 0 && duplicateVideosFiles.length === 0),
        empty:          emptyVideosFiles,
        hasEmpty:       (emptyVideosFiles.length > 0),
        duplicates:     duplicateVideosFiles,
        hasDuplicates:  (duplicateVideosFiles.length > 0),
        other:          otherFiles
    });
}

export default FilePolice;