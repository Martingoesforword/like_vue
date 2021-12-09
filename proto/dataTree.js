// 数据树表示整个逻辑体生命周期的所有数据

// 数据是可以被劫持的，被逻辑体劫持后，数据的get，set方法请求调用 将会被逻辑体代为处理

//


module.exports = {
    data: {
        clickTimes: 0,
    },

    utils: {
        Hijack: function (requireLogic, dataRoot, dataName) {
            //如果已经有usingLogic，认定已经有劫持逻辑了
            //要么你可以向劫持逻辑申请转劫持，要么就返回false
            if(dataRoot[dataName]["usingLogic"]) {
                var flag = this.RevertHijack(requireLogic, dataRoot[dataName]["usingLogic"], dataRoot, dataName);
                if(flag) {
                    return true;
                }
                return false;
            }

            var originalData = dataRoot[dataName];
            dataRoot[dataName] = {
                "dataInfo": {
                    "original": originalData,
                    //初始化新值为原值
                    "operated": originalData,
                },
                "usingLogic": requireLogic,
            }
            requireLogic.operationData = {
                "dataRoot": dataRoot,
                "dataName": dataName
            }
            return true;
        },

        RevertHijack: function (requireLogic, usingLogic, dataRoot, dataName) {
            //requireLogic向劫持逻辑体请求翻转控制权
            var name = requireLogic.name;

            //交给usingLogic判断要不要翻转控制
            //如果同意翻转，usingLogic内部需要处理好解劫持的流程
            if(usingLogic.OnRevertHijack(name)) {
                //检查到底有没有释放
                if(dataRoot[dataName]["usingLogic"]) {
                    return false;
                }

                return this.Hijack(requireLogic, dataRoot, dataName);
            }
            return false;
        },

        UnHijack: function (releaseLogic) {
            var operationData = releaseLogic.operationData;
            var dataRoot = operationData["dataRoot"];
            var dataName = operationData["dataName"];

            var usingData = dataRoot[dataName];

            dataRoot[dataName] = usingData["dataInfo"]["newData"];
        }
    }
}
