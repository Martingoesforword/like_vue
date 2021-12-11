const {utils: DataUtil} = require("./dataTree");
const triggerJudgement = require("./triggerJudgement");
var GLOBAL_TRIGGER_PREFIX = "trigger-";

window.LIKE_VIEWS = {
    viewMain: {
        onInit: function () {
            //工头告诉表演者，工作即将开始，你需要准备一下
        },

        onUIEvent: function (eventName) {
            //event通知发生事件
            var triggerFuncName = GLOBAL_TRIGGER_PREFIX+ eventName;

            if(window.triggerClouse[triggerFuncName]) {
                window.triggerClouse[triggerFuncName]();
            }
        },
    },
}