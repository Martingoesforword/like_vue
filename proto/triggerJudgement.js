// 法官角色通过ioMount提供的信息进行判断是否满足逻辑上的logic的触发情形

// 如果满足，则将直接调用 logic注册到 法官的 一锤定音模组中的相关触发调用

// 这个触发调用将直接调用 逻辑体 的输入突变操作（这里是否需要再加一层还需要看看）

var judge = {
    onJudgeAddOneLogic: function () {
        //判断某个交互确实要触发 加1逻辑
        var logicManagerProxy = require("./logicManager").onProxyJudgement;
        logicManagerProxy.onTriggerAddOne();
    },
}

module.exports = {
    onPostJudgement: function (e) {
        //判断e的来源等之后，执行相对于逻辑处理
        judge.onJudgeAddOneLogic();
    }
}
