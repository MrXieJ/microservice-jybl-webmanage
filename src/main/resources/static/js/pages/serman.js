layui.use('element', function(){
  var element = layui.element;


});

var form;
layui.use('form', function(){
  form = layui.form;

});

var table;
var temp;

layui.use('table', function(){
    table = layui.table;

    table.on('tool(ser)', function(obj){ //注：tool是工具条事件名，test是table原始容器的属性 lay-filter="对应的值"
      var data = obj.data; //获得当前行数据
      var layEvent = obj.event; //获得 lay-event 对应的值
      var tr = obj.tr; //获得当前行 tr 的DOM对象

      if(layEvent === 'edit'){

        $('input[name="a_name"]').val(data.name);
        $('#a_content').val(data.content);

        $('#a_kind option[value="' + data.risk_level_id + '"]').attr('selected', true);
        form.render('select');

        $('input[name="a_duration"]').val(data.duration);
        $('input[name="a_count"]').val(data.count);
        $('input[name="a_price"]').val(data.price);

        $('#btn_edit').css('display', 'inline-block');
        $('#btn_add').css('display', 'none');
        $('#modal_title').html('编辑服务');
        $('#editmodal').removeAttr('hidden');

        temp = data;

      } else if(layEvent === 'del'){ //删除

        $('#confirm').unbind('click').removeAttr('onclick').click(function(){
            obj.del();
            del(data.id);
        });

        showModal('确认删除服务?');

      } else if(layEvent === 'disable'){

        $('#confirm').unbind('click').removeAttr('onclick').click(function(){
            changeStatus(data.id, 0);
        })
        showModal('确定冻结此项服务?');

      } else if(layEvent === 'enable'){

        $('#confirm').unbind('click').removeAttr('onclick').click(function(){
            changeStatus(data.id, 1);
        })
        showModal('确定激活此项服务?');

      }
    });

});

var search = function(){

    var option = {
        where: {}
    };

    if ( $('input[name="status"]:checked').val() != -1 ) {
        option.where['status'] = $('input[name="status"]:checked').val()
    }

    if ( $('input[name="name"]').val() != '') {
        option.where['name'] = $('input[name="name"]').val()
    }


    table.reload('ser_table', option);
}

var toAdd = function(){
    $('#modal_title').html('新增服务');
    $('#btn_add').css('display', 'inline-block');
    $('#btn_edit').css('display', 'none');

    $('input[name="a_name"]').val('');
    $('#a_content').val('');
    $('#a_kind option[value=""]').attr('selected', true);
    form.render('select');
    $('input[name="a_duration"]').val('');
    $('input[name="a_count"]').val('');
    $('input[name="a_price"]').val('');

    $('#editmodal').removeAttr('hidden');
}

var add = function(){

    $('#confirm').unbind('click').removeAttr('onclick').click(function(){

        $('#infomodal').attr('hidden', true);

        $.ajax({
            url: 'http://www.jiayibilin.com/api-webmanage/service/add',
            data: {
                name: $('input[name="a_name"]').val(),
                content: $('#a_content').val(),
                riskLevelId: $('#a_kind option:selected').val(),
                kind: $('#a_kind option:selected').html(),
                duration: $('input[name="a_duration"]').val(),
                count: $('input[name="a_count"]').val(),
                price: $('input[name="a_price"]').val(),
            },
            success: function(res) {
                console.log('add');
                $('#editmodal').attr('hidden', true);
                table.reload('ser_table', {});
            }
        })

    });

    showModal('确认添加服务?');

}

var edit = function(){

    $('#confirm').unbind('click').removeAttr('onclick').click(function(){

        $('#infomodal').attr('hidden', true);

        var data = temp;

        var param = {
            id: data.id
        };

        if ( $('input[name="a_name"]').val() != data.name ) {
            param['name'] = $('input[name="a_name"]').val();
        }

        if ( $('#a_content').val() != data.content ) {
            param['content'] = $('#a_content').val();
        }

        if ( $('#a_kind option:selected').html() != data.kind ) {
            param['riskLevelId'] = $('#a_kind option:selected').val();
            param['kind'] = $('#a_kind option:selected').html();
        }

        if ( $('input[name="a_duration"]').val() != data.duration ) {
            param['duration'] = $('input[name="a_duration"]').val();
        }

        if ( $('input[name="a_count"]').val() != data.count ) {
            param['count'] = $('input[name="a_count"]').val();
        }

        if ( $('input[name="a_price"]').val() != data.price ) {
            param['price'] = $('input[name="a_price"]').val();
        }

        $.ajax({
                url: 'http://www.jiayibilin.com/api-webmanage/service/edit',
                data: param,
                success: function(res) {
                    console.log('edit');
                    $('#editmodal').attr('hidden', true);
                    table.reload('ser_table', {});
                }
        })

    });

    showModal('确认修改服务?');

}

var del = function(id){

    $.ajax({
        url: 'http://www.jiayibilin.com/api-webmanage/service/del',
        data: {
            id: id
            },
        success: function(res) {
            console.log('del');
            $('#infomodal').attr('hidden', true);
            table.reload('ser_table', {});
        }
    })
}

var changeStatus = function(id, status){

    $.ajax({
            url: 'http://www.jiayibilin.com/api-webmanage/service/changeStatus',
            data: {
                id: id,
                status: status
            },
            success: function(res) {
                console.log('changeStatus');
                $('#infomodal').attr('hidden', true);
                table.reload('ser_table', {});
            }
    })

}

function showModal(msg) {
    $('#prompt').html(msg);
    $('#infomodal').removeAttr('hidden');
}