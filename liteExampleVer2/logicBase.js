var passFunc = ()=>false;

window.LIKE_LOGIC = {
    //只会执行，不含数据，例如一个栈区数据加法逻辑体
    stackLogic: function (initLogic) {
        this.logicName = initLogic["logicName"];

        //逻辑被调用
        this.onFire = initLogic["onFire"] || passFunc;

        //逻辑被外部中断
        this.onInterrupt = initLogic["onInterrupt"] || passFunc;
    },

    //猫只会看，出现状况会大叫
    viewCatLogic: function (initLogic) {
        window.LIKE_LOGIC.stackLogic.call(this, initLogic);

        this.db = initLogic["db"];
        this.dataPath = initLogic["dataPath"];

        //资源(数据)变动
        this.taskers = [];
        this.onExchange = initLogic["onExchange"] || passFunc;
    },

    //加入数据所属概念，如果其他逻辑要求获取数据所有权，需要请求反转劫持
    baseLogic: function (initLogic) {
        window.LIKE_LOGIC.viewCatLogic.call(this, initLogic);

        //数据所有权被劫持
        this.onRevertHijack = initLogic["onRevertHijack"] || passFunc;
    },
}
