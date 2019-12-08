// 向服务器发送请求 获取文章列表数据
$.ajax({
    type: 'get',
    url: '/posts',
    success: function (response) {
        var html = template('postsTpl', response)
        $('#postsBox').html(html);
    }
});