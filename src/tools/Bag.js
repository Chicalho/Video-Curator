class Bag{
    
    constructor(){
        this.content = [];
    }

    add(obj){
        this.content.push(obj);
    }
    
    remove(obj){
        var index = this.content.indexOf(obj);
        if(index != -1){
            this.content.splice(index, 1);
        }
    }
    
    clear(){
        this.content = [];
    }
    
}

export default Bag;