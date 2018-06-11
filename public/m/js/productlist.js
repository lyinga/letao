$(function() {
    var letao = new Letao();
    letao.initPullRefresh();
});

//Letao的构造函数
var Letao = function() {

}

Letao.prototype = {
    //初始化下拉刷新
    initPullRefresh: function() {
        mui.init({
            pullRefresh: {
                container: ".mui-scroll-wrapper", // 传入区域滚动父容器的选择器
                down: {
                    // height: 50, //可选,默认50.触发下拉刷新拖动距离,
                    // auto: false, //可选,默认false.首次加载自动下拉刷新一次
                    // contentdown: "下拉可以刷新", //可选，在下拉可刷新状态时，下拉刷新控件上显示的标题内容
                    // contentover: "释放立即刷新", //可选，在释放可刷新状态时，下拉刷新控件上显示的标题内容
                    // contentrefresh: "正在刷新...", //可选，正在刷新状态时，下拉刷新控件上显示的标题内容
                    callback: function() {
                        setTimeout(function() {
                            // 延迟1.5秒结束下拉刷新
                            mui('.mui-scroll-wrapper').pullRefresh().endPulldownToRefresh();
                        }, 1500)
                    }
                    //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
                },
                up: {
                    contentnomore:'再下实在给不了更多...',
                    callback: function() {
                    		 setTimeout(function() {
                            // 延迟1.5秒结束上拉加载更多
                            // mui('.mui-scroll-wrapper').pullRefresh().endPullupToRefresh();
                            // 调用结束上拉加载更多并且传入了true既结束上拉加载更多并且提示没有更多数据
                            mui('.mui-scroll-wrapper').pullRefresh().endPullupToRefresh(true);
                        }, 1500)
                    } //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
                }
            }
        });
    }
    //初始化上拉加载更多
    //   initPullUpRefresh:function () {
    //   	mui.init({
    //   pullRefresh : {
    //     container:".mui-scroll-wrapper",//待刷新区域标识，querySelector能定位的css选择器均可，比如：id、.class等
    //     up:{		    
    //       callback :function () {

    //       } //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
    //     }
    //   }
    // });
    //   }
}