layui.use('element', function(){
  var element = layui.element;


});

var table;
layui.use('table', function(){
    table = layui.table;
    table.render({
        elem: '#odr_table',
        url: 'http://www.jiayibilin.com/api-webmanage/order/listDoctor?phone=' + getUrlParam('phone'),
        even: true,
        page: true,
        cols: [[{field:'id', title:'序号', width:90},
                {field:'indent_number', title:'订单编号', width:240},
                {field:'purchased_time', title:'购买时间', width:200},
                {field:'name', title:'服务名称', width:260},
                {field:'duration', title:'服务期限', width:90},
                {field:'doctor_name', title:'医生', width:100},
                {field:'patient_name', title:'居民', width:100},
                {field:'patient_phone', title:'居民电话', width:140},
                {field:'sum_count', title:'总次数', width:90},
                {field:'left_count', title:'剩余次数', width:90},
                {field:'price', title:'服务价格', width:100},
                {field:'indent_status', title:'订单状态', width:95},
                {title:'操作', toolbar:'#opt', align:'center', width:80}
               ]]
    });

    //执行渲染
    table.on('tool(odr)', function(obj){ //注：tool是工具条事件名，test是table原始容器的属性 lay-filter="对应的值"
        var data = obj.data; //获得当前行数据
        var layEvent = obj.event; //获得 lay-event 对应的值
        var tr = obj.tr; //获得当前行 tr 的DOM对象

        if(layEvent === 'detail'){

            console.log(data);

            $('#purchased_time').html(data.purchased_time);
            $('#indent_number').html(data.indent_number);
            $('#indent_status').html(data.indent_status);
            $('#doctor_name').html(data.doctor_name);
            $('#patient_name').html(data.patient_name);
            $('#patient_phone').html(data.patient_phone);
            $('#service_name').html(data.name);
            $('#service_duration').html(data.duration);
            $('#sum_count').html(data.sum_count);
            $('#left_count').html(data.left_count);
            $('#price').html('￥' + data.price);
            $('#pay').html('￥' + data.price);

            $('#service_start_time').html(data.purchased_time);

            var dt = data.purchased_time.replace('-', '/');
            var t = new Date(new Date(dt).valueOf() + data.duration * 24 * 60 * 60 * 1000);

            $('#service_end_time').html(t.Format("yyyy-MM-dd hh:mm:ss"));

            $('#modal').removeAttr('hidden');
        }
    });

});