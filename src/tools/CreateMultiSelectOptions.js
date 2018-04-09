function CreateMultiSelectOptions(options){
    var createdList = [];
    for(var option of options) {
        createdList.push({ key: option, value: option, text: option });
    }
    createdList.sort(function(a, b){
        if(a.value < b.value) return -1;
        if(a.value > b.value) return 1;
        return 0;
    })
    return createdList;
}

export default CreateMultiSelectOptions;