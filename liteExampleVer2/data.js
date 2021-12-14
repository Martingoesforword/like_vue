window.LIKE_DATA = {
    __DATA_RUNTIME: [],
    DATA_ROOT: {
        clickTimes: {
            __RT_META: {
                __LINK_TO: "/newTimeInfo/newTimes",
                __CONFIDENCE_LEVEL: 0,
                __WATCHERS: {},
                __OWNER: null
            },
            __DATA: 0
        },

        newTimeInfo: {
            __RT_META: {
                __CONFIDENCE_LEVEL: 0,
                __WATCHERS: {},
                __OWNER: null
            },
            __DATA: {
                newTimes: {
                    __RT_META: {
                        __CONFIDENCE_LEVEL: 0,
                        __WATCHERS: {},
                        __OWNER: null
                    },
                    __DATA: 0
                }
            }
        }
    }
}

window.LIKE_DATA_UTILS = {
    getDataByPath: function (db, dataPath) {
        var dataRoot = db.DATA_ROOT;
        var paths = dataPath.split("/");
        var currentObj = dataRoot;
        for (var pathIndex in paths) {
            //如果当前路径对象为非根对象，则需要取出数据段
            if(currentObj !== dataRoot) {
                currentObj = currentObj.__DATA;
            }
            //获取一个路径
            var path = paths[pathIndex];
            //路径为空路径，跳过
            if(path === "") continue;
            //如果当前路径对象为空，直接返回
            if(!currentObj) return null;
            currentObj = currentObj[path];
        }
        var objLinkBefore = currentObj;
        //数据被迁移：目前只支持根数据迁移
        if(currentObj.__RT_META.__LINK_TO)
        {
            return this.getDataByPath(db, currentObj.__RT_META.__LINK_TO);
        }
        else {
            return currentObj;
        }
    },

    bindingViewLogic: function (view, logic) {
        logic.taskers.push(view);
    },

    bindingTriggerLogic: function (view, logic) {
        logic.taskers.push(view);
    },

    driveLogic: function (db, dataPath, logic) {
        logic.db = db;
        logic.dataPath = dataPath;

        window.LIKE_DATA.__DATA_RUNTIME[dataPath] = db[dataPath];
    },

    logicUseData: function (logic) {
        var data = utils.getDataByPath(logic.db, logic.dataPath);

        if(data.__RT_META.__OWNER) {
            return false;
        }
        data.__RT_META.__OWNER = logic;
        return true;
    },

    logicReleaseData: function (logic) {
        var data = utils.getDataByPath(logic.db, logic.dataPath);
        data.__RT_META.__OWNER = null;
        var watchers = data.__RT_META.__WATCHERS;
        for (var watcherName in watchers) {
            var watchLogic = watchers[watcherName];

            watchLogic.onExchange(data.__DATA);
        }
    }
}
