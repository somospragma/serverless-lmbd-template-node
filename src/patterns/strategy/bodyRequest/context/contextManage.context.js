const { StrategyManager } = require("../strategyManager/strategyManager.class");
const { Strategy } = require("../strategyManager/strategy.class");
const { post } = require("../impl/post.impl");
const { get } = require("../impl/get.impl");
const { invk } = require("../impl/invk.impl");
const { msn } = require("../../../../const/msn.const");
const { timeStamp } = require("../../../../utils/general/timeStamp.util");

exports.Context = class Context {
    constructor(type, event){
        this._type = type;
        this._event = event; 
        this._setStrategyManager = new StrategyManager();
    }

    setStrategy(){
        this._setStrategyManager.addStrategy(new Strategy("get",  ()=> { return get(this._event)  } ));
        this._setStrategyManager.addStrategy(new Strategy("post", ()=> { return post(this._event) } ));
        this._setStrategyManager.addStrategy(new Strategy("invk", ()=> { return invk(this._event) } ));
    }

    chooseStrategy() {
        this._strategy = this._setStrategyManager.getStrategy(this._type);
    }

    getAction(){
        if(!!this._strategy){
            return this._strategy.doAction();
        }
        this.errorGetStrategy();
    }

    errorGetStrategy(){
        const error = new Error(msn.STGYERROR);
        error.validation = null;
        error.statusCode = 500;
        error.statusMessage = msn.STGYERROR;
        error.time = timeStamp();
        throw error;
    }

}