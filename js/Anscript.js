function showData()
{
	var y;
	var xdoc = loadXML();
	var x = xdoc.documentElement.getElementsByTagName('data');

	var txt = '<table border="1" cellpadding="10" class="Table showData"><tr><th>Tên</th><th>Đường dẫn</th><th>Sửa</th><th>Xóa</th></tr>';
	for(var i = 0; i < x.length; i++)
	{
		txt = txt + '<tr class="rowData">';
		y = x[i].getElementsByTagName('name');
		try {
			txt = txt + '<td>' + y[0].firstChild.nodeValue + '</td>';
		} catch(er) {
			txt = txt + '<td>&nbsp;</td>';
		}

		y = x[i].getElementsByTagName('url');
		try {
			txt = txt + '<td><a href="' + y[0].firstChild.nodeValue + '" target="_blank">' + y[0].firstChild.nodeValue + '</a></td>';
		} catch(er) {
			txt = txt + '<td>&nbsp;</td>';
		}

		txt = txt + '<td><button type="button" class="modBtn" title="Sửa đánh dấu này" value="' + i + '">Sửa</button></td>';
		txt = txt + '<td><button type="button" class="delBtn" title="Xóa đánh dấu này" value="' + i + '">Xóa</button></td>';
		txt = txt + '</tr>';
	}

	txt = txt + '</table>';
	document.getElementById('Data').innerHTML = txt;
	loadData();
}

function loadData()
{
	$('.modBtn').click(function() {
		var row = $(this).closest('tr');
		var name = row.children().eq(0);
		var url = row.children().eq(1);

		if($(this).text() == 'Sửa') {
			name.html('<input type="text" class="modName" placeholder="Tên đánh dấu" required="required" value="' + name.text() + '" />');
			url.html('<input type="url" class="modUrl" placeholder="Địa chỉ đánh dấu" required="required" value="' + url.text() + '" />');
			$(this).text('Cập nhật');
		}
		else {
			$(this).text('Sửa');
			$.post('server/modifyData.php', {Name: name.children().eq(0).val(), Url: url.children().eq(0).val(), Id: row.index() - 1}, function() {
				$('#Clear').click();
				showData();
			});
		}
	});

	$('.delBtn').click(function() {
		if(confirm('Bạn có chắc chắn muốn xóa đánh dấu này không?'))
		{
			$.post('server/deleteData.php', {id: $(this).val()}, function() {
				$('#Clear').click();
				showData();
			});
		}
	});
}

$(document).ready(function() {
	var f1 = 0;

	$('#Name').focus(function() {
		$(this).select();
	});

	$('#Url').focus(function() {
		$(this).select();
	});

	$('#myBookmark').click(function() {
		if(f1 == 0)
		{
			showData();
			$('#Data').fadeIn('slow');
			$(this).attr({title: 'Ẩn đánh dấu'});
			$(this).text('Ẩn');
			f1 = 1;
		}
		else if(f1 == 1)
		{
			$('#Data').slideUp('slow');
			$(this).attr({title: 'Xem đánh dấu'});
			$(this).text('Xem');
			f1 = 2;
		}
		else
		{
			$('#Data').slideDown('slow');
			$(this).attr({title: 'Ẩn đánh dấu'});
			$(this).text('Ẩn');
			f1 = 1;
		}
	});

	$('#create').submit(function(e) {
		e.preventDefault();
		$.post('server/createData.php', {Name: $('#Name').val(), Url: $('#Url').val()}, function() {
			$('#Clear').click();
			showData();
		});
	});
});