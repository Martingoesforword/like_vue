var logicTemples = window.LIKE_LOGIC;
var utils = window.LIKE_DATA_UTILS;
var db = window.LIKE_DATA;


//设计和实现简单逻辑体
var logicViewTimes = new logicTemples.viewCatLogic({
    logicName: "logicViewTimes",

    onFire: function () {
        //添加对db中dbPath的监视，并通知dbPath数据的逻辑体集合
        var data = utils.getDataByPath(this.db, this.dataPath);
        data.__RT_META.__WATCHERS[this.logicName] = this;
    },

    onExchange: function (runTimeInfo) {
        this.taskers.forEach((tasker)=>{
            tasker.onUpdate(runTimeInfo);
        });
    },
});
var logicAddOne = new logicTemples.baseLogic({
    logicName: "logicAddOne",

    onFire: function () {
        //添加对db中dbPath的监视，并通知dbPath数据的逻辑体集合
        var flag = utils.logicUseData(this);

        if(flag) {
            //执行逻辑
            var data = utils.getDataByPath(this.db, this.dataPath);
            if(data) {
                data.__DATA -= 1;
                setTimeout(()=>{
                    data.__DATA += 2;
                    utils.logicReleaseData(this);
                }, 5000);
            }
            else {
                utils.logicReleaseData(this);
            }
        }
    },

    onInterrupt: function () {
        console.error("我正在使用这个数据，你不能拿走！");
        throw new Error("我正在使用这个数据，你不能拿走！");
    }
});


//将逻辑和io绑定，连接好火炉的烟囱，研究好火炉的开关操作
utils.bindingViewLogic(viewTasker, logicViewTimes);
utils.bindingTriggerLogic(viewTasker, logicAddOne);


//使用数据驱动逻辑，给火炉加入木炭
utils.driveLogic(db, "clickTimes", logicViewTimes);
utils.driveLogic(db, "clickTimes", logicAddOne);


//开始执行逻辑，点燃火炉
logicViewTimes.onFire();

