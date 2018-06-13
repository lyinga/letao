var letao;
$(function () {  
    letao = new Letao();
    letao.selectSize();
    letao.addCart();
    var productid = getQueryString('productid');
    letao.getProductDetail(productid);
    // letao.initslide();
    

})

// 定义构造函数。
var Letao = function () {  }

Letao.prototype = {
    initslide:function () {  
        var gallery = mui('.mui-slider');
        gallery.slider({
            interval:1000//自动轮播周期，若为0则不自动播放，默认为0；
        });
    },
    selectSize:function () {  
        $('#product').on('tap','.btn-size',function () {  
            $(this).addClass('active').siblings().removeClass('active');
        })
    },
    getProductDetail:function (id) {  
        $.ajax({
            url:"/product/queryProductDetail",
            data:{id:id},
            success:function (data) { 
                var start = data.size.split('-')[0] -0;
                var end = data.size.split('-')[1] -0;
                var arr = [];
                // 遍历出来
                for(var i = start; i <=end;i++) {
                    arr.push(i);
                }
                data.size = arr;
                // console.log(data);
                var html = template("getDetailTmp",data);
                $("#product").html(html);
                mui('.mui-numbox').numbox();

                var slidehtml = template("productSlideTmp",data);
                $('.mui-slider').html(slidehtml);
                letao.initslide();
            }
        })
    },

    addCart:function () {  
        $(".btn-add-cart").on('tap',function () {  
            console.log("呀！你点我了啊");
            var size = $('.btn-size.active').data('size');
            if(!size) {
                mui.toast('请选择尺码',{ duration:'short', type:'div' }); 
                return;
            }
            var num = mui('.mui-numbox').numbox().getValue();
            if (!num){
                mui.toast('请选择数量',{ duration:'short', type:'div' }); 
                return;
            }
    
            mui.confirm('添加成功，是否前往购物车','温馨提示',['是','否'],function (e) {  
                if(e.index == 0){
                    console.log('进入购物车');
                }else if (e.index ==1) {
                    console.log('停留在详情页面');
                }
            })
        })

    }
}

//获取url地址栏的参数的函数 网上找的  name就是url参数名
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return decodeURI(r[2]);
    } else {
        return null;
    }
}