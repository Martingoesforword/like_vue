
//boot将logic初始化

//将view挂载到logic的输入端

//表示工头去组织所有工人，也就是逻辑体去做事情，其实view就好像是秘书，boot是工头，而logic是工人

var GLOBAL_TRIGGER_PREFIX = "trigger-";


var workMaster = {
    //表示工头设计好的工作内容，工作流程
    configs: {
        logics: null,
        data: null,
        triggerBindings: null,
        outputBindings: null,
        inputBindings: null,
    },

    //表示主人要求工头开始设计和组织工作内容
    onAskPlan: function () {
        this.configs.logics = {
            "logicAddOne" : window.LIKE_LOGIC.logicMain,
            "logicCommon" : window.LIKE_LOGIC.logicCommon,
        };

        //工头需要准备工作的原材料, 供工人使用
        this.configs.data = window.LIKE_DATA.dataBody;

        //工头需要安排表演者如何于工人建立联系
        //下面例子是说的：某个抽象输入性触发 rawInputClick，在逻辑上表示的是要触发 logicAddOne 逻辑
        this.configs.triggerBindings = {
            "clickTrigger": "logicAddOne"
        };

        this.configs.inputBindings = {
        };

        this.configs.outputBindings = {
            "times": {
                "dbPath": "clickTimes",
                "logic": "logicCommon",
                "view": "viewMain"
            }
        };
    },

    //表示主人一声令下，要求工头开始进行工作
    onAskCommand: function () {
        window.triggerClouse = {};

        //工头吩咐工人开始准备工作： logicBody.init
        this.configs.logics.forEach((logicName)=>{
            var logic = this.configs.logics[logicName];
            logic.onInit(this.configs.data);
        });

        //工头将指令盘连接到工人房间： this.bindTrigger
        var self = this;
        this.configs.triggerBindings.forEach((triggerName)=>{
            var triggerLogicName = this.configs.triggerBindings[triggerName];
            var triggerLogic = this.configs.logics[triggerLogicName];

            var triggerFuncName = GLOBAL_TRIGGER_PREFIX + triggerName;
            window.triggerClouse[triggerFuncName] = function () {
                // triggerinfo为args
                // 逻辑被触发的时候，将会执行相应逻辑，但在逻辑上应该是异步的，但也可以是同步的
                // 将self传入的意思是，逻辑体内部需要给工头备注
                // 自己正在做什么事情，有没有做完这个事情等
                triggerLogic.onExc(self, ...arguments);
            };
        });

        //工头吩咐表演者开始准备工作： view.init  并将任务大屏链接到表演者房间(view)：
        this.configs.outputBindings.forEach((outputName)=>{
            var outputBridge = this.configs.triggerBindings[outputName];
            var outputLogicName = outputBridge["logic"];
            var outputViewName = outputBridge["view"];

            var outputLogic = this.configs.logics[outputLogicName];
            var outputView = window.LIKE_VIEWS[outputViewName];
            var outputDataPath = outputBridge["dbPath"];

            //通用输出逻辑处理view的某个属性的输出处理工作
            //如果dbpath的 被改动，则 由 通用数据处理逻辑去代理此项任务，并通知绑定的view
            outputLogic.appendOutput(self, outputView, outputDataPath);
        });

        //工头告诉主人： 主人，您可以开始了
    },

    //表示主人遇到了一些 使用方面的问题
    //例如新手引导等
    onAskHelp: function () {

    }

}


