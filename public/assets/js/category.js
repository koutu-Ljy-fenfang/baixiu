// 当添加分类表单发生提交行为的时候
$('#addCategory').on('submit', function () {
    // 获取用户在表单中输入的内容
    var formData = $(this).serialize();

    $.ajax({
        type: 'POST',
        url: '/categories',
        data: formData,
        success: function () {
            location.reload();
        }
    })
    // 阻止表单默认提交行为
    return false;
})

// 发送ajax请求 向服务器端索要分类列表数据
$.ajax({
    type: 'GET',
    url: '/categories',
    success: function (response) {
        var html = template('categoryListTpl', {
            data: response
        });
        $('#categoryBox').html(html);
    }
});

// 为编辑按钮添加点击事件
$('#categoryBox').on('click', '.edit', function () {
    // 获取用户在表单中输入的内容
    var formData = $(this).serialize();
    // 获取要修改的那个用户的id值
    var id = $(this).attr('data-id');
    // 发送请求 修改用户信息
    $.ajax({
        type: 'get',
        url: '/categories/' + id,
        success: function (response) {
            console.log(response);
            var html = template('modifyCategoryTpl', response);
			$('#formBox').html(html);
        }
    })
});

// 为修改表单添加表单提交事件
$('#formBox').on('submit', '#modifyCategory', function () {
	// 获取用户在表单中输入的内容
	var formData = $(this).serialize();
	// 获取要修改的那个用户的id值
	var id = $(this).attr('data-id');
	// 发送请求 修改用户信息
	$.ajax({
		type: 'put',
		url: '/categories/' + id,
		data: formData,
		success: function () {
			// 修改用户信息成功 重新加载页面
			location.reload()
		}
	})

	// 阻止表单默认提交
	return false;
});

// 删除单个分类
$('#categoryBox').on('click', '.delete', function() {
    if (confirm('您真的要删除吗?')) {
		// 获取到即将要删除的用户id
		var id = $(this).attr('data-id');
        // 想服务器端发送请求 删除用户
        
		$.ajax({
			type: 'delete',
			url: '/categories/' + id,
			success: function (response) {
				// 重新加载页面
				location.reload()
			}
		})
	}
});

