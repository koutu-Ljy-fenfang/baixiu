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


// 获取全选按钮
var selectAll = $('#selectAll');

// 获取批量删除按钮
var deleteMany = $('#deleteMany');

// 当全选按钮的状态发生改变时
selectAll.on('change', function () {
	// 获取到全选按钮当前的状态
	var status = $(this).prop('checked');

	if (status) {
		// 显示批量删除按钮
		deleteMany.show();
	}else {
		// 隐藏批量删除按钮
		deleteMany.hide();
	}


	// 获取到所有用户 并将用户的状态和全选按钮保持一致
	$('#categoryBox').find('input').prop('checked', status);
});

$('#categoryBox').on('change', '.userStatus', function () {
	// 获取到所有用户 在所有用户中过滤出选中的用户
	// 判断选中用户的数量和所有用户的数量是否一致
	// 如果一致 就说明所有的用户都是选中的
	// 否则 就是有用户没有被选中
	var inputs = $('#categoryBox').find('input');

	if (inputs.length == inputs.filter(':checked').length) {
		selectAll.prop('checked', true)
	}else {
		selectAll.prop('checked', false)
	}

	// 如果选中的复选框的数量大于0 就说明有选中的复选框
	if (inputs.filter(':checked').length > 0) {
		deleteMany.show();
	}else {
		deleteMany.hide();
	}
});

// 为批量删除按钮添加点击事件
deleteMany.on('click', function () {
	var ids = [];
	// 获取选中的用户
	var checkedUser = $('#categoryBox').find('input').filter(':checked');
	// 循环复选框 从复选框元素的身上获取data-id属性的值
	checkedUser.each(function (index, element) {
		ids.push($(element).attr('data-id'));
	});
	// console.log(ids);
	
	
	if (confirm('您真要确定要进行批量删除操作吗')) {
		$.ajax({
			type: 'delete',
			url: '/categories/' + ids.join('-'),
			success: function () {
				location.reload();
			}
		})
	}
});