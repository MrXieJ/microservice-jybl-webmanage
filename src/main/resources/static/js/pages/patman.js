layui.use('element', function(){
  var element = layui.element;


});

layui.use('form', function(){
  var form = layui.form;

});

var table;

layui.use('table', function(){
    table = layui.table;
    //执行渲染

    table.on('tool(pat)', function(obj){ //注：tool是工具条事件名，test是table原始容器的属性 lay-filter="对应的值"
          var data = obj.data; //获得当前行数据
          var layEvent = obj.event; //获得 lay-event 对应的值
          var tr = obj.tr; //获得当前行 tr 的DOM对象

          if(layEvent === 'detail'){
            window.location.href="./patinfo.html?wechatId=" + data.wechat_id;
          }
    });

});

var search = function(){

    var option = {
        where: {}
    };

    if ( $('input[name="sex"]:checked').val() != -1 ) {
        option.where['sex'] = $('input[name="sex"]:checked').val()
    }

    if ( $('input[name="kind"]:checked').val() != -1 ) {
            option.where['kind'] = $('input[name="kind"]:checked').val()
    }

    if ( $('input[name="age"]:checked').val() != -1 ) {
            option.where['age'] = $('input[name="age"]:checked').val()
        }

    if ( $('input[name="count"]:checked').val() != -1) {
            option.where['count'] = $('input[name="count"]:checked').val()
    }


    table.reload('pat_table', option);
}