//维护逻辑体状态机

//初始化状态机

//接收不同的突变型输入进行不同的处理
    //例子：
        //1. 关闭界面按钮-->triggerStopAllLogicBody，遍历已注册子logicbody，调用其onInterript方法
        //2. 点击+1按钮-->triggerClickAddOneSubLogic


// 二维状态机设计【无法使用和设计】： 无法管理复杂情形下，例如不同数据状态组合，逻辑状态组合等情形下的状态变更


var logicBodyForClickAddOne = require("./subLogic/clickAddOneLogic");

var logicManager = {
    excuteSubLogics: {
        "clickRecord" : logicBodyForClickAddOne,
    },

    onExcAddOne: function () {
        var logic = this.excuteSubLogics["clickRecord"];

        //logic是长时操作，同步返回
        return logic.onFire();
    },

    onInterriptAll: function () {
        //遍历当前子逻辑
        var ret;

        this.excuteSubLogics.forEach((subLogic)=>{
            var logic = this.excuteSubLogics[subLogic];
            logic.onInterript();
        });

        return ret;
    },

    onAbortAll:function () {
        //遍历当前子逻辑
        var ret;

        this.excuteSubLogics.forEach((subLogic)=>{
            var logic = this.excuteSubLogics[subLogic];
            logic.onAbort();
        });

        return ret;
    }
}

module.exports = {
    onProxyJudgement: {
        onTriggerAddOne: function () {
            logicManager.onExcAddOne();
        },

        onTriggerStopAll: function () {
            return logicManager.onStopAll();
        }
    }
}
