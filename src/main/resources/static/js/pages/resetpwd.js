layui.use('form', function(){
  var form = layui.form;

  form.on('submit(*)', function(data){
      return false;
  });

});

var countdown = 60;

function setTime(val) {
    if (countdown == 0) {
        val.removeClass('layui-btn-disabled');
        val.html('获取验证码');
        countdown = 60;
    } else {
        val.addClass('layui-btn-disabled');
        val.html('重新发送(' + countdown + ')');
        countdown--;
        setTimeout(function() {
            setTime(val);
        }, 1000)
    }
}

var hash = '', tamp = 0;
var getSmsCode = function() {

    $.ajax({
        url: 'http://www.jiayibilin.com/api-webmanage/user/getSmsCode',
        data: {
            phone: $('input[name="phone"]').val()
        },
        success: function(res){
            if(res.code == 0) {
                setTime($('#get_code'));
                hash = res.hash;
                tamp = res.tamp;
            } else {
                showModal(res.msg);
            }
        }
    })

}

var resetPwd = function() {

    if ( $('input[name="code"]').val() == '') {

            layer.open({
                title: '提示',
                content: '请输入验证码'
            });
            return;
        }

    if ( $('input[name="newpwd"]').val() != $('input[name="cfmpwd"]').val() ) {

        layer.open({
            title: '提示',
            content: '两次密码不一致，请重新输入'
        });
        return;
    }

    $.ajax({
        url: 'http://www.jiayibilin.com/api-webmanage/user/resetPassword',
        data: {
            phone: $('input[name="phone"]').val(),
            msgNum: $('input[name="code"]').val(),
            password: $('input[name="newpwd"]').val(),
            hash: hash,
            tamp: tamp
        },
        success: function(res){
            if (res.code == 0) {
                $("#cancel").html('留在此页');
                $("#cancel").css('display', 'inline-block');
                $("#confirm").html('前往登录');
                $("#confirm").unbind('click').removeAttr('onclick').click(function(){
                    window.location.href="./resetpwd.html";
                })
            } else {
                $("#cancel").css('display', 'none');
                $("#confirm").html('确定');
                $("#confirm").unbind('click').removeAttr('onclick').click(function(){
                    $('#modal').attr('hidden', true);
                })
            }
            showModal(res.msg);
        }
    })


}

function showModal(msg) {
    $('#prompt').html(msg);
    $('#modal').removeAttr('hidden');
}