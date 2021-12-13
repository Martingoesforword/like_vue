var logicBase = window.LIKE_LOGIC;
var utils = window.LIKE_DATA_UTILS;
var db = window.LIKE_DATA;

var logicViewTimes = new logicBase({
    logicName: "logicViewTimes",

    onFire: function () {
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

    onInterrupt: function () {

    }

});

var logicAddOne = new logicBase({
    logicName: "logicAddOne",
    views: [],

    onFire: function () {
        //添加对db中dbPath的监视，并通知dbPath数据的逻辑体集合
        var flag = utils.logicUseData(this);

        if(flag) {
            //执行逻辑
            var self = this;
            self.db[self.dataPath].__DATA -= 1;
            setTimeout(()=>{
                self.db[self.dataPath].__DATA += 2;
                utils.logicReleaseData(this);
            }, 100);
        }
    },

    onInterrupt: function () {
        console.error("我正在使用这个数据，你不能拿走！");
        throw new Error("我正在使用这个数据，你不能拿走！");
    }
});


utils.bindingViewLogic(mainView, logicViewTimes);
utils.bindingTriggerLogic(mainView, logicAddOne);

utils.initLogic(logicViewTimes, db, "clickTimes");
logicViewTimes.onFire();
utils.initLogic(logicAddOne, db, "clickTimes");