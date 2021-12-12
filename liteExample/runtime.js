var logicBase = window.LIKE_LOGIC;
var utils = window.LIKE_DATA_UTILS;
var db = window.LIKE_DATA;

var logicViewTimes = new logicBase({
    logicName: "logicViewTimes",

    onExc: function () {
        //添加对db中dbPath的监视，并通知dbPath数据的逻辑体集合
        var data = this.db[this.dataPath];
        data.__RT_META.__WATCHERS[this.logicName] = this;
    },

    onExchange: function (runTimeInfo) {
        var self = this;
        this.views.forEach((view)=>{
            view.onUpdate(runTimeInfo);
        });
    },

});

var logicAddOne = new logicBase({
    logicName: "logicAddOne",
    views: [],

    onExc: function () {
        //添加对db中dbPath的监视，并通知dbPath数据的逻辑体集合
        utils.logicUseData(this);

        //执行逻辑
        this.db[this.dataPath].__DATA += 1;

        utils.logicReleaseData(this);
    },
});


utils.bindingViewLogic(mainView, logicViewTimes);
utils.bindingTriggerLogic(mainView, logicAddOne);

utils.initLogic(logicViewTimes, db, "clickTimes");
logicViewTimes.onExc();
utils.initLogic(logicAddOne, db, "clickTimes");