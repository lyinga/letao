var letao;

$(function () {  
    letao = new Letao();
    letao.addHistory();
    letao.queryHistory();
    letao.deleteHistory();
    letao.clearHistoty();
})


var Letao = function () {  

}

Letao.prototype = {
    addHistory:function () { 
         
        $('.btn-search').on('click',function () {  
            var search = $('.search-input').val();
            // console.log(search);
            if (!search.trim()){
                alert('请输入搜索的关键字');
                return;
            }
            // 获取本地存储已经存储的值
            var arr = window.localStorage.getItem('searchData');
            var id = 0;
            // console.log(arr);
            if(arr && JSON.parse(arr).length > 0) {
                arr = JSON.parse(arr);
                id = arr[arr.length-1].id+1;
            }else {
                arr = [];
                id = 0;
            }
            // 判断是否重复  如果重复就去重
            var flag = false;
            for (var i = 0; i<arr.length; i++) {
                if (arr[i].search == search) {
                    flag = true;
                }
            }
            if (flag == false) {
                arr.push({
                    'search':search,
                    'id':id
                })

            }
            window.localStorage.setItem('searchData',JSON.stringify(arr));
            letao.queryHistory();
            window.location.href = 'productlist.html?search='+search;
           

        })
    },
    // 查询历史记录并渲染页面
    queryHistory:function () {  
        var arr = window.localStorage.getItem('searchData');
        // console.log(arr);
        if(arr && JSON.parse(arr).length > 0) {
            arr = JSON.parse(arr);
        }else {
            arr = [];
        }
        // 翻转数组
        arr = arr.reverse();

        var html = template('searchListTmp',{'rows':arr});
        $('.content').html(html);
    },
    // 删除历史记录
    deleteHistory:function () {  
        var that = this;
        
        $('.content').on('click','.btn-delete',function () {  
            var id = $(this).data('id');
            // console.log(id);
            var arr = window.localStorage.getItem('searchData');
            if (arr && JSON.parse(arr).length > 0){
                arr = JSON.parse(arr);
            }else {
                arr = [];
            }
            for (var i = 0; i < arr.length; i++) {
                if(arr[i].id == id) {
                    arr.splice(i,1);
                }
            }
            // 把删除的数组重新存储到本地存储
            window.localStorage.setItem('searchData',JSON.stringify(arr));
            // 渲染列表
            letao.queryHistory();
        })
    },
    // 清空历史记录
    clearHistoty: function () {  
        $('.btn-clear').on('click',function () {  
            console.log("hhh");
            window.localStorage.setItem('searchData','');
            letao.queryHistory();
        })
    }
}