var MSG = {};

// Called just before testing if local storage contains Vdos
MSG.STORAGE_TEST = {
    type:"storage",
    content:"Testing if data is already saved in local storage..."
};

// Called after test IF local storage does not contain Vdos
MSG.STORAGE_FAIL = {
    type:"storage",
    content:"Data is NOT saved in local storage, fetching json backup."
};

// Called after test IF local storage contains Vdos
MSG.STORAGE_SUCCESS = {
    type:"storage",
    content:"Data is saved in local storage, using it."
};

// Called when saved file fails to load
MSG.STORAGE_XHR_FAIL = {
    type:"storage",
    content:"Saved file could not be loaded:"
};

// Called when the JSON output is sent via callback (allows building of Database)
MSG.STORAGE_DONE = {
    type:"storage",
    content:"Storage done, JSON is ready to build Database"
};

// Called when the save method is called
MSG.STORAGE_SAVE = {
    type:"storage",
    content:"Saving database (js object) to local storage."
};

// Called when the export method is called
MSG.STORAGE_EXPORT = {
    type:"storage",
    content:"Exporting database to data url below:"
};

export default MSG;