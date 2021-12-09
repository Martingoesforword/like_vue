//负责数据的视图化

//负责数据突变的动画展示

// 负责 Fake性的所见即所得 输入突变的 构造和传递给ioMount，并由ioMount直接调用triggerJudgement进行后续处理


//h5视图层
var h5;
<H5>
</H5>



var eventMng = require("./eventManager");
var triggerJudgement = require("./triggerJudgement");
var DataUtil = require("./dataTree").utils;

//绑定UI和事件处理
eventMng.bindUIInterface(h5);

var view = {
    defaultDealLikeVUE: function (e) {
        //调用VUE的双向绑定
        //例如在input输入文本， 相应的数据就会发生变化

        //其实如何将VUE的双向绑定和likeVUE进行耦合，也是一个问题？？？？
    }
}

//view绑定通知
module.exports = {
    onBindInterface: function (io) {
        //将h5视图层和 io 进行绑定, 当确实发生某个raw的交互行为（例如点击，移动等）的时候，
        eventMng.bindUIInterface(this);       //onUIEvent
    },

    onBindInputCalcState: function (data) {
        //将零碎性的UI控件集合 的 enable属性，visible属性等和一个 表达式进行绑定，如果表达式的值发生了变动（也就是其中一环发生变动），则需要重新计算，并以计算值参考如何调整UI控件的属性
        var ctl = h5.getElementById("clickButton");

        var calcDesc = [data["clickTimes"], "*", "1"];
        DataUtil.setCalcRelative(ctl, "visible", data, calcDesc);
    },

    onUIEvent: function (e) {
        //event通知发生事件

        //当发生点击的时候，通知io，对raw事件进行处理，例如简单的交互间隙屏蔽操作（禁用按钮等）
        view.defaultDealLikeVUE(e);

        //同时，raw事件会在io管理中传递给 法官，法官判断之后，进入事件处理环节
        triggerJudgement.onPostJudgement(e);
    },
}
