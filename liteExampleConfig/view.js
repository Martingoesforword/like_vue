
//这就是view
var viewTasker = {
    onUpdate: function (runTimeInfo) {
        var times = runTimeInfo;
        document.getElementById("clickTimes").innerText = times;
    },

    callLogicAddOne: function () {
        logicAddOne.onFire();
    },

    callInterruptAllLogics: function () {
        try {
            for (var dataPath in window.LIKE_DATA_RUNTIME) {
                //data有劫持者的时候，需要询问劫持者的意见
                var data = window.LIKE_DATA_RUNTIME[dataPath];
                if(data.__RT_META.__OWNER) {
                    data.__RT_META.__OWNER.onInterrupt();
                }
            }

        }
        catch (e) {
            return;
        }
        document.getElementById("allPage").style.display = "none";
    }
}