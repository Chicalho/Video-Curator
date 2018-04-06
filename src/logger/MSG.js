var MSG = {};

/**********************************************************
STORAGE MANAGER
**********************************************************/

// Called just before testing if local storage contains Vdos
MSG.STORAGE_TEST = {
    type:"storage",
    content:"[STORAGE_MANAGER] Testing if data is already saved in local storage..."
};

// Called after test IF local storage does not contain Vdos
MSG.STORAGE_FAIL = {
    type:"storage",
    content:"[STORAGE_MANAGER] Data is NOT saved in local storage, fetching json backup."
};

// Called after test IF local storage contains Vdos
MSG.STORAGE_SUCCESS = {
    type:"storage",
    content:"[STORAGE_MANAGER] Data is saved in local storage, using it."
};

// Called when saved file fails to load
MSG.STORAGE_XHR_FAIL = {
    type:"storage",
    content:"[STORAGE_MANAGER] Saved file could not be loaded:"
};

// Called when the JSON output is sent via callback (allows building of Database)
MSG.STORAGE_DONE = {
    type:"storage",
    content:"[STORAGE_MANAGER] Storage done, JSON is ready to build Database"
};

// Called when the save method is called
MSG.STORAGE_SAVE = {
    type:"storage",
    content:"[STORAGE_MANAGER] Saving database (js object) to local storage."
};

// Called when the export method is called
MSG.STORAGE_EXPORT = {
    type:"storage",
    content:"[STORAGE_MANAGER] Exporting database to data url below:"
};

/**********************************************************
FILE POLICE
**********************************************************/

// Called when filePolice is legit
MSG.FILEPOLICE_IS_LEGIT = {
    type:"filePolice",
    content:"[FILE_POLICE] File Police Test: LEGIT (No duplicates or empty files found)"
};

// Called when filePolice is not legit
MSG.FILEPOLICE_NOT_LEGIT = {
    type:"filePolice",
    content:"[FILE_POLICE] File Police Test:NOT LEGIT (Found duplicate or empty files)"
};

// Called when filePolice identifies .mp4 files
MSG.FILEPOLICE_HAS_MP4_FILES = {
    type:"filePolice",
    content:"[FILE_POLICE] File Police found some .mp4 files. Will use them in application."
};

// Called when filePolice identifies empty files
MSG.FILEPOLICE_HAS_EMPTY_FILES = {
    type:"filePolice",
    content:"[FILE_POLICE] File Police found some emty files. Delete them in the OS."
};

// Called when filePolice identifies duplicate files
MSG.FILEPOLICE_HAS_DUPLICATE_FILES = {
    type:"filePolice",
    content:"[FILE_POLICE] File Police found some duplicate files. Delete one of the copies in the OS."
};

// Called when filePolice identifies ther file types
MSG.FILEPOLICE_OTHER_FILES = {
    type:"filePolice",
    content:"[FILE_POLICE] These are the remaining file types. Be sure to convert the video formats to .mp4."
};

/**********************************************************
CURATOR
**********************************************************/

// Counts total number of file curated
MSG.CURATOR_DONE = {
    type:"curatorSummary",
    content:"[CURATOR_SUMMARY] All files processed. Total count:"
};

// Counts number of videos before curation
MSG.CURATOR_EXISTING_COUNT = {
    type:"curatorSummary",
    content:"[CURATOR_SUMMARY] Existing VDOs count:"
};

// Counts number of videos marked to be removed
MSG.CURATOR_REMOVE_COUNT = {
    type:"curatorSummary",
    content:"[CURATOR_SUMMARY] VDOs marked to remove count:"
};

// Outputs any unprocessed vdos after curation
MSG.CURATOR_UNPROCESSED_VDOS = {
    type:"curatorSummary",
    content:"[CURATOR_SUMMARY] Unprocessed VDOs:"
};

// Outputs any unprocessed files after curation
MSG.CURATOR_UNPROCESSED_FILES = {
    type:"curatorSummary",
    content:"[CURATOR_SUMMARY] All files processed. Total count:"
};

/**********************************************************
DATABASE
**********************************************************/

// Called when database is built by the first time
MSG.DATABASE_BUILT = {
    type:"database",
    content:"[DATABASE] First database built."
};

// Called when the whole database is requested
MSG.DATABASE_GET_ALL = {
    type:"database",
    content:"[DATABASE] Getting entire database:"
};

// Called when a specific item is requested from the database
MSG.DATABASE_GET_BY_ID = {
    type:"database",
    content:"[DATABASE] Get VDO by id from database:"
};

export default MSG;