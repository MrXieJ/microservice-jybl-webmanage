layui.use('element', function(){
  var element = layui.element;


});

var table;
var t;
layui.use('table', function(){
    table = layui.table;
    //执行渲染
    table.render({
    id: 'docser_table',
    elem: '#docser_table',
    url: 'http://www.jiayibilin.com/api-webmanage/service/listDocService?phone=' + getUrlParam('phone'),
    even: true,
    page: true,
    cols: [[{ field: 'rid', title: '序号', width: 100 },
           { field: 'service_name', title: '服务名称', width: 240 },
           { field: 'service_duration', title: '服务期限', width: 100 },
           { field: 'kind', title: '适用人群', width: 120 },
           { field: 'service_count', title: '次数', width: 100 },
           { field: 'service_price', title: '价格', width: 140 },
           { field: 'added_time', title: '上架时间', width: 180 },
           { field: 'purchased_count', title: '购买次数', width: 100 },
           { toolbar: '#opt', title: '操作', width: 80, align:'center' },
           ]], //设置表头

    });

    table.on('tool(docser)', function(obj){
          var data = obj.data;
          var layEvent = obj.event;
          var tr = obj.tr;

          if(layEvent === 'enable'){
                $('#prompt').html('确定上架此项服务?');
                $('#confirm').on('click', function(){
                    changeStatus(data.id, 1);
                });
                $('#infomodal').removeAttr('hidden');
          } else if(layEvent === 'disable'){
                $('#prompt').html('确定下架此项服务?');
                $('#confirm').on('click', function(){
                    changeStatus(data.id, 0);
                });
                $('#infomodal').removeAttr('hidden');
          }
    });

    t = layui.table;
    t.render({
        id: 'ser_table',
        elem: '#ser_table',
        url: 'http://www.jiayibilin.com/api-webmanage/service/listAllAvailable?phone=' + getUrlParam('phone'),
        even: true,
        page: true,
        height: 450,
        cols: [[{ checkbox: true },
                { field: 'rid', title: '序号', width: 100 },
                { field: 'name', title: '名称', width: 300 },
                { field: 'duration', title: '期限', width: 115 },
                { field: 'count', title: '次数', width: 100 },
                { field: 'kind', title: '适用人群', width: 120 },
                { field: 'price', title: '价格', width: 110 },
               ]]
    });


});

layui.use('form', function(){
  var form = layui.form;

});

var changeStatus= function(id, status) {
    $.ajax({
        url: 'http://www.jiayibilin.com/api-webmanage/service/changeDocSerStatus',
        data: {
            id: id,
            status: status
        },
        success: function(res) {
            $('#infomodal').attr('hidden', true);
            table.reload('docser_table', {});
        }
    })
}

$(function(){
    $('#add_confirm').on('click', function(){

        var check = t.checkStatus('ser_table');

        var arr = [];
        for (var i = 0; i < check.data.length; i++) {
            arr.push(check.data[i]);
        }

        var data =  JSON.stringify({
           phone: getUrlParam('phone'),
           rows: arr,
        });

        $.ajax({
                url: 'http://www.jiayibilin.com/api-webmanage/service/addDocService',
                type: 'POST',
                contentType: 'application/json',
                data: data,
                success: function(res) {
                    $('#addmodal').attr('hidden', true);
                    table.reload('docser_table', {});
                }
        })

    })
})

var toAdd = function() {
    t.reload('ser_table', {});
    $('#addmodal').removeAttr('hidden');
}