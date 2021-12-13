//测试例程： 点击加一处理 的逻辑体


const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

var Data = require("../dataTree").data;
var DataUtils = require("../dataTree").utils;


var logicBody = function() {
    this.name = "clickAddOne";
    this.operationData = null;

    this.onInit = function () {
        //初始化逻辑体，例如CPU资源等
    };

    this.onFire = function () {
        var flag = this.onPrepareRes();
        //如果无法准备好必要数据，则直接返回
        if(!flag) {
            return "当前由于无法劫持数据，无法执行相应逻辑";
        }

        this.operationData["clickTimes"] ++;
        sleep(1000);

        this.onReleaseRes();
    };

    this.onPrepareRes = function () {
        //劫持数据节点
        return DataUtils.Hijack(this, Data, "clickTimes");
    };

    this.onReleaseRes = function () {
        DataUtils.UnHijack(this);
    };

    this.onInterript = function () {
        //外界要中断当前逻辑体的行为
        return "滚，现在还不到时候，你关不了界面，除非你把电脑关了";
    };

    //表示强行关程序
    this.onAbort = function () {
        return "真的不能关，要关的话，程序就出错了，懂么？" +
            "不过你这就马上关了，我看我能做点什么，我要是能把数据保存就保存一下，保存不了，大家都完蛋吧！";
    };

    this.OnRevertHijack = function (name) {
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
    };

    //劫持数据后的请求，例如get，set
    this.onHijack = function (repostRequest) {
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


module.exports = logicBody;