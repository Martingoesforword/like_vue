window.LIKE_DATA = {
    clickTimes: {
        __RT_META: {
            __WATCHERS: {},
            __OWNER: null
        },
        __DATA: 0
    }
}

window.LIKE_DATA_RUNTIME = [];

window.LIKE_DATA_UTILS = {
    bindingViewLogic: function (view, logic) {
        logic.views.push(view);
    },

    bindingTriggerLogic: function (view, logic) {
        logic.views.push(view);
    },

    initLogic: function (logic, db, dataPath) {
        logic.db = db;
        logic.dataPath = dataPath;

        window.LIKE_DATA_RUNTIME[dataPath] = db[dataPath];
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
            var logic = watchers[watcherName];

            logic.onExchange(data.__DATA);
        }
    }
}