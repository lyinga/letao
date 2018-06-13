var letao;
$(function() {
    letao = new Letao();
    letao.initPullRefresh();
    letao.searchProductList();
    search = getQueryString('search');
    letao.getProductList({
        proName:search
    },function (data) {  
        var html = template('ProductListTmp',data);
        $('.content .mui-row').html(html);
    });
    letao.productSort();
});
//Letao的构造函数
var Letao = function() {

}
var search;
var page = 1;

Letao.prototype = {
    //初始化下拉刷新
    initPullRefresh: function() {
        mui.init({
            pullRefresh: {
                container: ".mui-scroll-wrapper", // 传入区域滚动父容器的选择器
                down: {
                    callback: function() {
                        setTimeout(function() {
                            letao.getProductList({
                                proName:search
                            },function (data) { 
                                console.log("下拉刷新结束了"); 
                                var html = template('ProductListTmp',data);
                                $('.content .mui-row').html(html);
                                mui('.mui-scroll-wrapper').pullRefresh().endPulldownToRefresh();
                                mui('.mui-scroll-wrapper').pullRefresh().refresh(true);
                                page = 1;
                            })
                        }, 1500)
                    }
                },
                up: {
                    contentnomore:'已经到底了...',
                    callback: function() {
                        setTimeout(function() { 
                            letao.getProductList({
                                proName:search,
                                page: ++page
                            },function (data) {  
                                console.log("上拉加载结束了"); 
                                var html = template('ProductListTmp',data);
                                $('.content .mui-row').append(html);
                                // console.log(data.data.length);

                                if(data.data.length > 0) {
                                    mui('.mui-scroll-wrapper').pullRefresh().endPullupToRefresh();
                                } else {
                                    mui('.mui-scroll-wrapper').pullRefresh().endPullupToRefresh(true);
                                }
                            })
                        }, 1500)
                    }
                }
            }
        });
    },

    searchProductList:function () {  
        $('.btn-search').on('tap',function () {
            search = $('.search-input').val()
            // console.log(search);
            letao.getProductList({
                proName:search
            },function(data) {
                // 4. 把数据调用模板引擎生成html
                var html = template('ProductListTmp', data);
                // 5. 把生成的模板绑定到商品列表的内容
                $('.content .mui-row').html(html);
            });
        })
           
    },

    getProductList:function (obj,callback) {  
        $.ajax({
            url: '/product/queryProduct',
            data:{
                proName:obj.proName,
                page: obj.page || 1,
                pageSize:obj.pageSize || 2,
                price: obj.price,
                num: obj.num
            },
            success:function (data) {  
                // console.log(data);
                if (callback) {
                    callback(data);
                }
            }
        })

    },

    productSort:function () {  
        $('.productlist .title').on('tap','a',function () {  
            // console.log(this);
            var sortType = $(this).data('sort-type');
            var sort = $(this).data('sort');
            // console.log(sort);
            // console.log(sortType);
            if (sort == 1) {
                sort = 2;
            }else {
                sort = 1; 
            }
            var paixun =$(this).attr('data-sort',sort);
            // console.log(paixun);
            if(sortType == 'price') {
                letao.getProductList({
                    proName:search,
                    price:sort
                },function (data) {  
                    var html = template('ProductListTmp', data);
                    // 5. 把生成的模板绑定到商品列表的内容
                    $('.content .mui-row').html(html);
                })
            }else if (sortType == 'num'){
                letao.getProductList({
                    proName:search,
                    num:sort
                },function (data) {  
                    var html = template('ProductListTmp', data);
                    // 5. 把生成的模板绑定到商品列表的内容
                    $('.content .mui-row').html(html);
                })
            }
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