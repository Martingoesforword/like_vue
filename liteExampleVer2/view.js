//这就是view
var viewTasker = {
    triggerLogicByAction: function (miniTaskName) {
        var isUserAction = arguments.callee.caller.arguments[0]?.isTrusted || false;
        viewTasker[miniTaskName]?.call(this, isUserAction);

    },

    onUpdate: function (runTimeInfo) {
        var times = runTimeInfo;
        document.getElementById("clickTimes").innerText = times;
    },

    callLogicAddOne: function (isUserAction) {
        if(isUserAction) {
            logicAddOne.onFire();
        }
    },

    callInterruptAllLogics: function (isUserAction) {
        if(isUserAction) {
            try {
                for (var dataPath in window.LIKE_DATA.__DATA_RUNTIME) {
                    //data有劫持者的时候，需要询问劫持者的意见
                    var data = window.LIKE_DATA.__DATA_RUNTIME[dataPath];
                    if(data && data.__RT_META.__OWNER) {
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
}
