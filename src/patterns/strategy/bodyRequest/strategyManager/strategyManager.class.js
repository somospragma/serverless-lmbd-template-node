class StrategyManager{
    constructor(){
        this._strategies = [];
    }
    
    addStrategy(strategy){
        this._strategies = [...this._strategies, strategy];
    }

    getStrategy(name){
        return this._strategies.find(strategy => strategy._name === name);
    }
}

module.exports = {StrategyManager}