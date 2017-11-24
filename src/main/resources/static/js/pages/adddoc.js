layui.use('element', function(){
  var element = layui.element;


});

var sex = false, hospital = false, title = false, department = false, nam = false, practice_code = false, adept = false, experience = false;
var form;
layui.use('form', function(){
    form = layui.form;

    form.on('radio(sex)', function(data){
        console.log('sex');
        sex = true;
    });

    form.on('select(hospital)', function(data){
        console.log('hospital');
        hospital = true;
    });

    form.on('select(title)', function(data){
        console.log('title');
        title = true;
    });

    form.on('select(department)', function(data){
        console.log('department');
        department = true;
    });
});

var head_pic = null;
var practice_pic = null;
layui.use('upload', function(){
  var $ = layui.jquery, upload = layui.upload;

  var uploadInst = upload.render({
    elem: '#upload_avatar',
    auto: false,
    choose: function(obj){
      obj.preview(function(index, file, result){
        $('#head_pic').attr('src', result);
        head_pic = file;
      });
    }
  });

  var uploadInst = upload.render({
      elem: '#upload_no1',
      auto:false,
      choose: function(obj){
        obj.preview(function(index, file, result){
          $('#practice_pic').attr('src', result);
          practice_pic = file;
        });
      }
    });
});

layui.use('laydate', function(){
    var laydate = layui.laydate;

    laydate.render({
        elem: '#date1',
        format: 'y-MM-dd'
    });

    laydate.render({
        elem: '#date2',
        format: 'y-MM-dd'
    });
});

var client = null;
$(function(){

    if ( getUrlParam('edit') != null && getUrlParam('edit') == 1 ) {

        $('#cur_cite').html('编辑医生');
        $('#primary').html('保存修改');
        $('#second').css('display', 'none');
        //$('#delete').css('display', 'inline-block');
        //$('#delete').attr('href', 'javascript:del(getUrlParam("phone"));');

        $.ajax({
            url:"http://www.jiayibilin.com/api-webmanage/doctor/info",
            data: {
                phone: getUrlParam('phone')
            },
            success: function(res){

                if (res.code != 0) return;

                var doc = res.doctor;
                $('input[name="phone"]').val(doc.phone);
                $('input[name="phone"]').attr('disabled', true);
                $('input[name="password"]').val(doc.password);
                $('input[name="password"]').attr('disabled', true);
                $('input[name="name"]').val(doc.name);
                $('input:radio[value="'+ doc.sex +'"]').attr('checked', true);
                $('input[name="practice_code"]').val(doc.practice_code);
                $('#hospital option[value="' + doc.hospital + '"]').attr('selected', true);
                $('#title option[value="' + doc.title + '"]').attr('selected', true);
                $('#department option[value="' + doc.department + '"]').attr('selected', true);
                $('#head_pic').attr('src', doc.head_pic);
                $('#practice_pic').attr('src', doc.practice_pic);
                $('textarea[name="adept"]').html(doc.adept);
                $('textarea[name="experience"]').html(doc.experience);

                if (doc.verify == '认证中') {
                    $('#verify').css('display', 'inline-block');
                    $('#verify').attr('href', 'javascript:verify(getUrlParam("phone"));');
                }


                $('input[name="name"]').change(function(){
                    console.log('name');
                    nam = true;
                });
                $('input[name="practice_code"]').change(function(){
                    console.log('practice_code');
                    practice_code = true;

                });
                $('textarea[name="adept"]').change(function(){
                    console.log('adept');
                    adept = true;
                });
                $('textarea[name="experience"]').change(function(){
                    console.log('experience');
                    experience = true;
                });

                $('#primary').unbind('click').removeAttr('onclick').click(function(){

                    var param = {};
                    param['phone'] = doc.phone;

                    var buildParam = function(param) {
                        if (nam) param['name'] = $('input[name="name"]').val();
                        if (practice_code) param['practiceCode'] = $('input[name="practice_code"]').val();
                        if (adept) param['adept'] = $('textarea[name="adept"]').val();
                        if (experience) param['experience'] = $('textarea[name="experience"]').val();
                        if (sex) param['sex'] = $('input[name="sex"]:checked').val();
                        if (hospital) param['hospital'] = $('#hospital option:selected').val();
                        if (title) param['title'] = $('#title option:selected').val();
                        if (department) param['department'] = $('#department option:selected').val();
                    }

                    if (head_pic != null && practice_pic != null) {
                        if (client == null) {
                                       OSS.urllib.request("http://www.jiayibilin.com/api-stsserver/requestSTS",{method: 'GET'},function (err, response) {
                                        if (err) return alert(err);
                                        try {
                                            result = JSON.parse(response);
                                            client = new OSS.Wrapper({
                                                accessKeyId: result.AccessKeyId,
                                                accessKeySecret: result.AccessKeySecret,
                                                stsToken: result.SecurityToken,
                                                endpoint: 'oss-cn-shenzhen.aliyuncs.com',
                                                bucket: 'jybl-photo'
                                            });
                                            var time = new Date().getTime();
                                            var ext = /\.[^\.]+/.exec(head_pic.name);
                                            var asHead = 'doctor/head/' + time + ext;
                                            client.multipartUpload(asHead, head_pic).then(function (result) {
                                                head_pic = result.res.requestUrls[0].split('?')[0];
                                                param['headPic'] = head_pic;
                                                ext = /\.[^\.]+/.exec(practice_pic.name);
                                                var asPractice = 'doctor/practice/' + time + ext;
                                                client.multipartUpload(asPractice, practice_pic).then(function (result) {
                                                    practice_pic = result.res.requestUrls[0].split('?')[0];
                                                    param['practicePic'] = practice_pic;
                                                    buildParam(param);
                                                    edit(param);
                                                    }).catch(function (err) {
                                                        alert(err);
                                                    });
                                            }).catch(function (err) {
                                                alert(err);
                                            });
                                        } catch (e) {
                                            errmsg = 'parse sts response info error: ' + e.message;
                                            console.log(errmsg);
                                        }

                                       })
                                    } else {
                                       var ext = /\.[^\.]+/.exec(head_pic.name);
                                       var time = new Date().getTime();
                                       var asHead = 'doctor/head/' + time + ext;
                                       client.multipartUpload(asHead, head_pic).then(function (result) {
                                        head_pic = result.res.requestUrls[0].split('?')[0];
                                        param['headPic'] = head_pic;
                                        ext = /\.[^\.]+/.exec(practice_pic.name);
                                        var asPractice = 'doctor/practice/' + time + ext;
                                        client.multipartUpload(asPractice, practice_pic).then(function (result) {
                                            practice_pic = result.res.requestUrls[0].split('?')[0];
                                            param['practicePic'] = practice_pic;
                                            buildParam(param);
                                            edit(param);
                                        }).catch(function (err) {
                                            alert(err);
                                        });
                                       }).catch(function (err) {
                                        alert(err);
                                       });
                                    }
                    } else if (head_pic != null) {
                        if (client != null) {
                            var time = new Date().getTime();
                            var ext = /\.[^\.]+/.exec(head_pic.name);
                            var asHead = 'doctor/head/' + time + ext;
                            client.multipartUpload(asHead, head_pic).then(function (result) {
                                head_pic = result.res.requestUrls[0].split('?')[0];
                                param['headPic'] = head_pic;
                                buildParam(param);
                                edit(param);
                            }).catch(function (err) {
                                alert(err);
                            });
                        } else {
                            OSS.urllib.request("http://www.jiayibilin.com/api-stsserver/requestSTS",{method: 'GET'},function (err, response) {
                                                        if (err) return alert(err);
                                                        try {
                                                            result = JSON.parse(response);
                                                            client = new OSS.Wrapper({
                                                                accessKeyId: result.AccessKeyId,
                                                                accessKeySecret: result.AccessKeySecret,
                                                                stsToken: result.SecurityToken,
                                                                endpoint: 'oss-cn-shenzhen.aliyuncs.com',
                                                                bucket: 'jybl-photo'
                                                            });
                                                            var time = new Date().getTime();
                                                            var ext = /\.[^\.]+/.exec(head_pic.name);
                                                            var asHead = 'doctor/head/' + time + ext;
                                                            client.multipartUpload(asHead, head_pic).then(function (result) {
                                                                head_pic = result.res.requestUrls[0].split('?')[0];
                                                                param['headPic'] = head_pic;
                                                                buildParam(param);
                                                                edit(param);
                                                            }).catch(function (err) {
                                                                alert(err);
                                                            });
                                                        } catch (e) {
                                                            errmsg = 'parse sts response info error: ' + e.message;
                                                            console.log(errmsg);
                                                        }
                                                    })
                        }

                    } else if (practice_pic != null) {
                        if (client != null) {
                            var time = new Date().getTime();
                            var ext = /\.[^\.]+/.exec(practice_pic.name);
                            var asPractice = 'doctor/practice/' + time + ext;
                            client.multipartUpload(asPractice, practice_pic).then(function (result) {
                                practice_pic = result.res.requestUrls[0].split('?')[0];
                                param['practicePic'] = practice_pic;
                                buildParam(param);
                                edit(param);
                            }).catch(function (err) {
                                alert(err);
                            });
                        } else {
                            OSS.urllib.request("http://www.jiayibilin.com/api-stsserver/requestSTS",{method: 'GET'},function (err, response) {
                                                        if (err) return alert(err);
                                                        try {
                                                            result = JSON.parse(response);
                                                            client = new OSS.Wrapper({
                                                                accessKeyId: result.AccessKeyId,
                                                                accessKeySecret: result.AccessKeySecret,
                                                                stsToken: result.SecurityToken,
                                                                endpoint: 'oss-cn-shenzhen.aliyuncs.com',
                                                                bucket: 'jybl-photo'
                                                            });
                                                            var time = new Date().getTime();
                                                            var ext = /\.[^\.]+/.exec(practice_pic.name);
                                                            var asPractice = 'doctor/practice/' + time + ext;
                                                            client.multipartUpload(asPractice, practice_pic).then(function (result) {
                                                                practice_pic = result.res.requestUrls[0].split('?')[0];
                                                                param['practicePic'] = practice_pic;
                                                                buildParam(param);
                                                                edit(param);
                                                            }).catch(function (err) {
                                                                alert(err);
                                                            });
                                                        } catch (e) {
                                                            errmsg = 'parse sts response info error: ' + e.message;
                                                            console.log(errmsg);
                                                        }
                                                    })
                        }
                    } else {
                        if (!sex && !hospital && !title && !department && !nam && !practice_code && !adept && !experience) return;
                        buildParam(param);
                        edit(param);
                    }
                });


            }
        });
    } else {

        $('#primary').unbind('click').removeAttr('onclick').click(function() {

            if (client == null) {
               OSS.urllib.request("http://www.jiayibilin.com/api-stsserver/requestSTS",{method: 'GET'},function (err, response) {
                if (err) return alert(err);
                try {
                    result = JSON.parse(response);
                    client = new OSS.Wrapper({
                        accessKeyId: result.AccessKeyId,
                        accessKeySecret: result.AccessKeySecret,
                        stsToken: result.SecurityToken,
                        endpoint: 'oss-cn-shenzhen.aliyuncs.com',
                        bucket: 'jybl-photo'
                    });
                    var time = new Date().getTime();
                    var ext = /\.[^\.]+/.exec(head_pic.name);
                    var asHead = 'doctor/head/' + time + ext;
                    client.multipartUpload(asHead, head_pic).then(function (result) {
                        head_pic = result.res.requestUrls[0].split('?')[0];
                        ext = /\.[^\.]+/.exec(practice_pic.name);
                        var asPractice = 'doctor/practice/' + time + ext;
                        client.multipartUpload(asPractice, practice_pic).then(function (result) {
                            practice_pic = result.res.requestUrls[0].split('?')[0];
                            add();
                        }).catch(function (err) {
                            alert(err);
                        });
                    }).catch(function (err) {
                        alert(err);
                    });
                } catch (e) {
                    errmsg = 'parse sts response info error: ' + e.message;
                    console.log(errmsg);
                }

               })
            } else {
               var ext = /\.[^\.]+/.exec(head_pic.name);
               var time = new Date().getTime();
               var asHead = 'doctor/head/' + time + ext;
               client.multipartUpload(asHead, head_pic).then(function (result) {
                head_pic = result.res.requestUrls[0].split('?')[0];
                ext = /\.[^\.]+/.exec(practice_pic.name);
                var asPractice = 'doctor/practice/' + time + ext;
                client.multipartUpload(asPractice, practice_pic).then(function (result) {
                    practice_pic = result.res.requestUrls[0].split('?')[0];
                    add();
                }).catch(function (err) {
                    alert(err);
                });
               }).catch(function (err) {
                  alert(err);
               });
            }
        })
    }
})

var add = function(){
    $.ajax({
        url: 'http://www.jiayibilin.com/api-webmanage/doctor/add',
        data: {
            phone: $('input[name="phone"]').val(),
            password: $('input[name="password"]').val(),
            name: $('input[name="name"]').val(),
            sex: $('input[name="sex"]:checked').val(),
            practiceCode: $('input[name="practice_code"]').val(),
            hospital: $('#hospital option:selected').val(),
            title: $('#title option:selected').val(),
            department: $('#department option:selected').val(),
            headPic: head_pic,
            practicePic: practice_pic,
            adept: $('textarea[name="adept"]').val(),
            experience: $('textarea[name="experience"]').val(),
            verify: '已认证'
        },
        success: function(res){

             $('#info').html('添加医生成功!');
             $('#info_primary').html('继续添加');
             $('#info_primary').unbind('click').removeAttr('onclick').click(function(){
                $('#infomodal').attr('hidden', true);
                $('#aform')[0].reset();
                $('#head_pic').removeAttr('src');
                $('#practice_pic').removeAttr('src');
             });
             $('#info_second').html('返回');
             $('#info_second').unbind('click').removeAttr('onclick').click(function(){
                window.location.href="./docman.html";
             });
             $('#infomodal').removeAttr('hidden');


        }
    })
}

var edit = function(param) {

    $.ajax({
        url: 'http://www.jiayibilin.com/api-webmanage/doctor/edit',
        data: param,
        success: function(res){

            head_pic = null;
            practice_pic = null;
            sex = false;
            hospital = false;
            title = false;
            department = false;
            nam = false;
            practice_code = false;
            adept = false;
            experience = false;

            $('#info').html('保存修改成功!');
            $('#info_primary').html('留在此页');
            $('#info_primary').unbind('click').removeAttr('onclick').click(function(){
                $('#infomodal').attr('hidden', true);
            });
            $('#info_second').html('返回');
            $('#info_second').unbind('click').removeAttr('onclick').click(function(){
                window.location.href="./docman.html";
            });
            $('#infomodal').removeAttr('hidden');
        }
    })
}

var verify = function(phone) {

    $('#info').html('确认通过认证?');
    $('#info_primary').html('审核通过');
    $('#info_primary').unbind('click').removeAttr('onclick').click(function(){
        $.ajax({
            url: 'http://www.jiayibilin.com/api-webmanage/doctor/verify',
            data: {
                phone: phone
            },
            success: function(res){
                $('#verify').css('display', 'none');
                $('#infomodal').attr('hidden', true);
            }
        })
    });
    $('#info_second').html('取消');
    $('#info_second').unbind('click').removeAttr('onclick').click(function(){
        $('#infomodal').attr('hidden', true);
    });
    $('#infomodal').removeAttr('hidden');

}

var del = function(phone) {

    $('#info').html('确认删除医生?');
    $('#info_primary').html('确定');
    $('#info_primary').unbind('click').removeAttr('onclick').click(function(){
        $.ajax({
            url: 'http://www.jiayibilin.com/api-webmanage/doctor/del',
            data: {
                phone: phone
            },
            success: function(res){
                window.location.href="./docman.html";
            }
        })
    });
    $('#info_second').html('取消');
    $('#info_second').unbind('click').removeAttr('onclick').click(function(){
        $('#infomodal').attr('hidden', true);
    });
    $('#infomodal').removeAttr('hidden');
}

