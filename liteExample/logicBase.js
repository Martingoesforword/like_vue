window.LIKE_LOGIC = function (initLogic) {
    this.logicName = initLogic["logicName"];
    this.db = initLogic["db"];
    this.dataPath = initLogic["dataPath"];
    //设计logic必要接口，例如
    this.views = [];
    //逻辑运行时函数
    this.onFire = initLogic["onFire"];

    this.onExchange = initLogic["onExchange"];

    this.onInterrupt = initLogic["onInterrupt"];
}
