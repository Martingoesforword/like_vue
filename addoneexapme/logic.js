const {utils: DataUtils} = require("../dataTree");
const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

var AddOneLogicBody = {
    db: null,
    dbPath: "/clickTimes",
    name : "clickAddOne",
    operationData : null,

    onInit : function (db) {
        //初始化逻辑体，例如CPU资源等
        this.db = db;
    },

    //长时任务
    onFire :async function (master)  {
        var flag = this.onPrepareRes();
        //如果无法准备好必要数据，则直接返回
        if(!flag) {
            return "当前由于无法劫持数据，无法执行相应逻辑";
        }

        this.operationData["clickTimes"] ++;
        await sleep(1000);

        this.onReleaseRes();
    },

    onPrepareRes : function () {
        //劫持数据节点
        return DataUtils.Hijack(this, this.db, this.dbPath);
    },

    onReleaseRes : function () {
        DataUtils.UnHijack(this);
    },

    onInterript : function () {
        //外界要中断当前逻辑体的行为
        return "滚，现在还不到时候，你关不了界面，除非你把电脑关了";
    },

    //表示强行关程序
    onAbort : function () {
        return "真的不能关，要关的话，程序就出错了，懂么？" +
            "不过你这就马上关了，我看我能做点什么，我要是能把数据保存就保存一下，保存不了，大家都完蛋吧！";
    },

    OnRevertHijack : function (name) {
        switch (name) {
            case "someone": {
                var tip = "我真的给不了你";
                return false;
            }
            case "otherone": {
                var tip = "可以给你哎";
                return true;
            }
        }
        //默认不交出控制权
        return false;
    },

    //劫持数据后的请求，例如get，set
    onHijack : function (repostRequest) {
        var hijackType = repostRequest['type'];
        switch (hijackType) {
            case "set": {
                repostRequest.returnValue = "操作中，请勿处理";
                break;
            }
            case "get": {
                repostRequest.returnValue = "操作中，原先值为";
                break;
            }
        }

    },

    appendOutput: function () {

    }
}

//同步的逻辑，没有长时操作，代理数据的透传服务
var LazyDataLogicBody = {
    db: null,
    dbPath: "/clickTimes",
    name : "commonData",

    onInit : function (db) {
        //初始化逻辑体，例如CPU资源等
        this.db = db;
    },

    //长时任务
    onFire : function (master)  {

    },

    appendOutput : function (master, outputView, outputDataPath) {
        //将数据库的path数据和view绑定，并处理变动工作行为
        DataUtils.Hijack(this, this.db, outputDataPath);

    },

    onPrepareRes : function () {
        //劫持数据节点
        return DataUtils.Hijack(this, this.db, this.dbPath);
    },

    onReleaseRes : function () {
        DataUtils.UnHijack(this);
    },

    onInterript : function () {
        //外界要中断当前逻辑体的行为
        return "滚，现在还不到时候，你关不了界面，除非你把电脑关了";
    },

    //表示强行关程序
    onAbort : function () {
        return "真的不能关，要关的话，程序就出错了，懂么？" +
            "不过你这就马上关了，我看我能做点什么，我要是能把数据保存就保存一下，保存不了，大家都完蛋吧！";
    },

    OnRevertHijack : function (name) {
        switch (name) {
            case "anyone": {
                var tip = "我可以给你，但是你要通知我发生了什么，因为我代理某个view去展示这个值，如果你把他改变了，我就得通知他进行变化";
                return true;
            }
        }
        //默认不交出控制权
        return false;
    },

    //劫持数据后的请求，例如get，set
    onHijack : function (repostRequest) {
        var hijackType = repostRequest['type'];
        switch (hijackType) {
            case "set": {
                repostRequest.returnValue = "操作中，请勿处理";
                break;
            }
            case "get": {
                repostRequest.returnValue = "操作中，原先值为";
                break;
            }
        }
    }
}

window.LIKE_LOGIC = {
//定义所需的触发性输入集合，例如这个逻辑体中，
    logicMain: AddOneLogicBody,
    logicCommon: LazyDataLogicBody
}