var Comparator = {};

Comparator.vdoMatches = function(file) {
    return function(vdo) {
        return  vdo.fileName === file.name ||
                vdo.fileSize === file.size ||
                vdo.filePath === file.webkitRelativePath;
    }
}

Comparator.fileAnyMatches = function(vdo) {
    return function(file) {
        return  vdo.fileName === file.name ||
                vdo.fileSize === file.size ||
                vdo.filePath === file.webkitRelativePath;
    }
}

Comparator.fileExactMatches = function(vdo) {
    return function(file) {
        return  vdo.fileName === file.name &&
                vdo.fileSize === file.size &&
                vdo.filePath === file.webkitRelativePath;
    }
}

Comparator.fileNamePathMatches = function(vdo) {
    return function(file) {
        return  vdo.fileName === file.name &&
                vdo.filePath === file.webkitRelativePath;
    }
}

Comparator.fileNameSizeMatches = function(vdo) {
    return function(file) {
        return  vdo.fileName === file.name &&
                vdo.fileSize === file.size;
    }
}

Comparator.fileSizePathMatches = function(vdo) {
    return function(file) {
        var vdoJustPath = vdo.filePath.substr(0, vdo.filePath.length - vdo.fileName.length);
        var fileJustPath = file.webkitRelativePath.substr(0, file.webkitRelativePath.length - file.name.length);
        return  vdo.fileSize === file.size &&
                vdoJustPath === fileJustPath;
    }
}

Comparator.fileSizeMatchesNoConflict = function(vdo) {
    return function(file) {
        return  vdo.fileSize === file.size &&
                vdo.conflict.exists === false;
    }
}

export default Comparator;