    layui.use('element', function(){
        var element = layui.element;

        element.on('tab(tab)', function(data){


        });


    });

    var duration = 0;
    var period = 'all';

    layui.use('form', function(){
        var form = layui.form;

        form.on('radio(duration)', function(data){
            duration = data.value;
            filter(duration, period);
        });

        form.on('radio(period)', function(data){
            period = data.value;
            filter(duration, period);
        });

    });

    var line = echarts.init(document.getElementById('line'));
    var colors = ['#DC143C', '#1E90FF']
    var optionLine = {
            color: colors,
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data:['收缩压', '舒张压']
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                boundaryGap: true,
                data: []
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                     name:'收缩压',
                     type:'line',
                     stack: '总量',
                     data: []
                },
                {
                     name:'舒张压',
                     type:'line',
                     stack: '总量',
                     data: []
                }
            ]
    };

    var ring = echarts.init(document.getElementById('ring'));
    var colors = ['#27b0b0', '#cccccc']
    var optionRing = {
        color: colors,
        series: [
            {
                name:'患病风险',
                type:'pie',
                radius: ['50%', '70%'],
                avoidLabelOverlap: false,
                label: {
                    normal: {
                        show: true,
                        position: 'center',
                        textStyle: {
                            fontSize: '29',
                            fontWeight: 'bold'
                        }
                    },
                    emphasis: {
                        show: true,
                        textStyle: {
                            fontSize: '30',
                            fontWeight: 'bold'
                        }
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                data:[]
            }
        ]
    };

    var bpe = null;

    $.ajax({
        url: 'http://www.jiayibilin.com/api-webmanage/patient/listDetail',
        data: {
            wechatId: getUrlParam('wechatId')
        },
        success: function(res) {

            var pe = res.patientInfo;
            $('#name').html(pe.name);
            $('#sex').html(pe.sex);
            $('#age').html(pe.age);
            $('#id_card').html(pe.id_card);
            $('#phone').html(pe.phone);
            $('#address').html(pe.address);
            $('#detailed_address').html(pe.detailed_address);

            if (pe.prob != null) {
                $('#prob').html(pe.prob.toFixed(1) + '%');
                var prob = [];
                prob.push({value:pe.prob, name:pe.prob.toFixed(1) + '%'});
                prob.push({value:100-pe.prob});
                optionRing.series[0].data = prob
                ring.setOption(optionRing);
            } else {
                $('#evaluateResult').css('display', 'none');
                $('#title3').html('风险评估结果（尚未评估）');
            }

            var he = res.healthInfo;
            if (he != null) {
                $('#height').html(he.height);
                $('#weight').html(he.weight);
                $('#bmi').html(Math.round(he.weight / ((he.height * 0.01) * (he.height * 0.01))));
                $('#diabetes').html(he.diabetes);
                $('#chd').html(he.chd);
                $('#stroke').html(he.stroke);
                $('#hypertension').html(he.hypertension);
                $('#family_history').html(he.family_history);
                $('#other_history').html(he.other_history);
                $('#smoke').html(he.smoke);
                $('#smoking').html(he.smoking);
                $('#drink').html(he.drink);
                $('#drinking').html(he.drinking);
            } else {
                $('#healthInfo').css('display', 'none');
                $('#title1').html('健康信息（尚未填写）');
            }


            bpe = res.bloodPressure;
            if (bpe.length > 0) {
                var nc = 0;
                var hc = 0;
                var max_s = 0;
                var max_d = 0;
                var avg_s = 0;
                var avg_d = 0;
                var avg_r = 0;
                var x = [];
                var s = [];
                var d = [];
                for (var i = 0; i < bpe.length; i++) {
                    var bp = bpe[i];
                    if (bp.systolic_pressure > 140 || bp.diastolic_pressure > 90) {
                        hc ++;
                    } else {
                        nc ++;
                    }
                    if (parseFloat(bp.systolic_pressure) > max_s) {
                        max_s = parseFloat(bp.systolic_pressure);
                    }
                    if (parseFloat(bp.diastolic_pressure) > max_d) {
                        max_d = parseFloat(bp.diastolic_pressure)
                    }
                    avg_s += bp.systolic_pressure / bpe.length;
                    avg_d += bp.diastolic_pressure / bpe.length;
                    avg_r += bp.rhr / bpe.length;
                    x.push(bp.date);
                    s.push(bp.systolic_pressure);
                    d.push(bp.diastolic_pressure);
                }

                $('#nc').html(nc);
                $('#hc').html(hc);
                $('#max_s').html(max_s);
                $('#max_d').html(max_d);
                $('#avg').html(Math.ceil(avg_s) + ' / ' + Math.ceil(avg_d));
                $('#avg_r').html(Math.round(avg_r));

                optionLine.xAxis.data = x;
                optionLine.series[0].data = s;
                optionLine.series[1].data = d;
                line.setOption(optionLine);
            } else {
                $('#testData').css('display', 'none');
                $('#title2').html('测量数据（没有数据）');
            }
        }
    })

    var table;
    layui.use('table', function(){
        table = layui.table;
            //执行渲染

        table.render({
            elem: '#odr_table',
            url: 'http://www.jiayibilin.com/api-webmanage/order/listPatient?wechatId=' + getUrlParam('wechatId'),
            even: true,
            page: true,
            cols: [[{field:'id', title:'序号', width:90},
                   {field:'indent_number', title:'订单编号', width:240},
                   {field:'purchased_time', title:'购买时间', width:200},
                   {field:'name', title:'服务名称', width:300},
                   {field:'duration', title:'服务期限', width:90},
                   {field:'doctor_name', title:'医生', width:100},
                   {field:'patient_name', title:'居民', width:100},
                   {field:'sum_count', title:'总次数', width:90},
                   {field:'left_count', title:'剩余次数', width:90},
                   {field:'price', title:'服务价格', width:100},
                   {field:'indent_status', title:'订单状态', width:95},
                   {title:'操作', toolbar:'#opt', align:'center', width:80}]]
        });

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

    var filter = function(duration, period) {
        if (bpe == null) return;

        var nc = 0;
        var hc = 0;
        var max_s = 0;
        var max_d = 0;
        var avg_s = 0;
        var avg_d = 0;
        var avg_r = 0;
        var x = [];
        var s = [];
        var d = [];
        for (var i = 0; i < bpe.length; i++) {
            var bp = bpe[i];
            if ((bp.time != period && period != 'all') || (DateDiff(bp.date, new Date().Format('yyyy-MM-dd')) > duration && duration != 0)) {
                continue;
            }
            if (bp.systolic_pressure > 140 || bp.diastolic_pressure > 90) {
                hc ++;
            } else {
                nc ++;
            }
            if (parseFloat(bp.systolic_pressure) > max_s) {
                max_s = parseFloat(bp.systolic_pressure);
            }
            if (parseFloat(bp.diastolic_pressure) > max_d) {
                max_d = parseFloat(bp.diastolic_pressure)
            }
            avg_s += bp.systolic_pressure / bpe.length;
            avg_d += bp.diastolic_pressure / bpe.length;
            avg_r += bp.rhr / bpe.length;
            x.push(bp.date);
            s.push(bp.systolic_pressure);
            d.push(bp.diastolic_pressure);
        }

        $('#nc').html(nc);
        $('#hc').html(hc);
        $('#max_s').html(max_s);
        $('#max_d').html(max_d);
        $('#avg').html(Math.ceil(avg_s) + ' / ' + Math.ceil(avg_d));
        $('#avg_r').html(Math.round(avg_r));

        optionLine.xAxis.data = x;
        optionLine.series[0].data = s;
        optionLine.series[1].data = d;
        line.setOption(optionLine);
    };