LOG.storage = false;
LOG.filePolice = false;

function LOG(message, optionalObject){
    if( LOG[message.type] && optionalObject){
        console.log("\nLOG: " + message.content, optionalObject);
    }else if( LOG[message.type] ){
        console.log("\nLOG: " + message.content);
    }
}

export default LOG;
