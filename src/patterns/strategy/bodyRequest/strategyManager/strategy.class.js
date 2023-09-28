class Strategy{
    constructor(name, handler){
        this._name = name;
        this._handler = handler;
    }
    doAction(){
        return this._handler();
    }
}

module.exports = {Strategy}