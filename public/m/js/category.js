
$(function () {  
    var letao = new Letao();

    letao.initScroll();
    letao.categoryLeft();
    letao.categoryRight();
});

var Letao = function () {
	
}

Letao.prototype = {
    initScroll:function () {  
        var options = {
            scrollY: true, //是否竖向滚动
            scrollX: false, //是否横向滚动
            startX: 0, //初始化时滚动至x
            startY: 0, //初始化时滚动至y
            indicators: true, //是否显示滚动条
            deceleration: 0.0006, //阻尼系数,系数越小滑动越灵敏  值越大滚动越慢
            bounce: true //是否启用回弹
        };
        // 初始化区域滚动
        mui('.mui-scroll-wrapper').scroll(options);
    },
    categoryLeft:function () {  
        $.ajax({
            url:"/category/queryTopCategory",
            success:function (backdata) {  
                // console.log(backdata);
                var html = template("categoryLeftTmp",backdata);
                $(".category-left ul").html(html);
            }
        })
    },

    categoryRight:function () {  
        getRightData(1);
        $(".category-left ul").on("click","a",function (e) {  
            // console.log(e);
            // var li = e.target.parentNode;
            $(e.target.parentNode).addClass("active").siblings().removeClass("active");
            var id = e.target.dataset['id'];
            // console.log(id);
            getRightData(id);

        })
       
        function getRightData(id) {  
            $.ajax({
                url:"/category/querySecondCategory",
                data:{id:id},
                success:function (backdata) {  
                    // console.log(backdata);
                    var html = template("categoryRightTmp",backdata);
                    if (html) {
                        $(".category-right .mui-row").html(html);
                    }else {
                        $('.category-right .mui-row').html('<h6>再下实在给不更多了</h6>');
                    }
                }
            })
        }
       
    }

}
