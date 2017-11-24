layui.use('form', function(){
  var form = layui.form;

});


var submitLogin = function() {

    var username = $('input[name="username"]').val();
    var password = $('input[name="password"]').val();

    SetCookie('username', username);

    var param = {
        username: username,
        password: password
    }

    if ( $('input[name="remember"]').is(':checked') ) {
        param['rememberMe'] = 1;
    } else {
        param['rememberMe'] = 0;
    }


    $.ajax({
        url: 'http://www.jiayibilin.com/api-webmanage/submitLogin',
        data: param,
        success: function(res){
            if (res.code == 0) {
                if ($('input[name="remember"]').is(':checked')) {
                    SetCookie('password', password);
                } else {
                    SetCookie('password', '');
                }
                window.location.href="./html/index.html";
            } else {
                showModal(res.msg);
            }
        }
    })
}

$(function(){
     console.log(document.cookie);

     var username = GetCookie('username');
     var password = GetCookie('password');

     if (username != null) {
        $('input[name="username"]').val(username);
     }

     if (password != null) {
        $('input[name="password"]').val(password);
     }

})

function SetCookie(name,value)
{
    var Days = 30;
    var exp = new Date();
    exp.setTime(exp.getTime() + Days*24*60*60*1000);
    document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
}


//取Cookie的值
function GetCookie(name) {
    var arg = name + "=";
    var alen = arg.length;
    var clen = document.cookie.length;
    var i = 0;
    while (i < clen) {
        var j = i + alen;
       /*  alert(j); */
        if (document.cookie.substring(i, j) == arg)
        return getCookieVal(j);//取到cookie的值
        i = document.cookie.indexOf(" ", i) + 1;
        if (i == 0)
        break;
    }
    return null;
}

//取到cookie的值
function getCookieVal(offset) {
    var endstr = document.cookie.indexOf(";", offset);
    if (endstr == -1) endstr = document.cookie.length;
    return unescape(document.cookie.substring(offset, endstr));
}

function showModal(msg) {
    $('#prompt').html(msg);
    $('#modal').removeAttr('hidden');
}