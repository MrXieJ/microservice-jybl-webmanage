        layui.use('element', function(){
            var element = layui.element;
        });

        var pie = echarts.init(document.getElementById('pie'));
        var optionPie = {
            title : {
                text: '居民健康状况',
                x:'center'
            },
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                left: 'left',
                data: ['极高危人群' ,'高危人群','中危人群','低危人群','健康人群','未评估']
            },
            series: [
                {
                    name:'健康状况',
                    type:'pie',
                    radius: ['45%', '70%'],
                    avoidLabelOverlap: false,
                    label: {
                        normal: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            show: true,
                            textStyle: {
                                fontSize: '24',
                                fontWeight: 'bold'
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    data:[
                        {value:0, name:'极高危人群'},
                        {value:0, name:'高危人群'},
                        {value:0, name:'中危人群'},
                        {value:0, name:'低危人群'},
                        {value:0, name:'健康人群'},
                        {value:0, name:'未评估'}
                    ]
                }
            ]
        };


        var bar1 = echarts.init(document.getElementById('bar1'));
        var colors = ['#27b0b0', '#675bba']
        var optionBar1 = {
                color: colors,
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross'
                    }
                },
                grid: {
                    right: '20%'
                },
                legend: {
                    data:['医生', '居民'],
                    y: 'bottom'
                },
                xAxis: [
                    {
                        type: 'category',
                        axisTick: {
                            alignWithLabel: true
                        },
                        data: []
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        name: '医生：人',
                        position: 'left',
                        axisLine: {
                            lineStyle: {
                                color: colors[0]
                            }
                        },
                        axisLabel: {
                            formatter: '{value}'
                        }
                    },
                    {
                        type: 'value',
                        name: '居民：人',
                        position: 'right',
                        axisLine: {
                            lineStyle: {
                                color: colors[1]
                            }
                        },
                        axisLabel: {
                            formatter: '{value}'
                        }
                    }
                ],
                series: [
                    {
                        name:'医生',
                        type:'bar',
                        data:[]
                    },
                    {
                        name:'居民',
                        type:'bar',
                        yAxisIndex: 1,
                        data:[]
                    }
                ]
            };


        var bar2 = echarts.init(document.getElementById('bar2'));
                var colors = ['#27b0b0', '#675bba']
                var optionBar2 = {
                        color: colors,
                        tooltip: {
                            trigger: 'axis',
                            axisPointer: {
                                type: 'cross'
                            }
                        },
                        grid: {
                            right: '20%'
                        },
                        legend: {
                            data:['订单数量', '订单额度'],
                            y: 'bottom'
                        },
                        xAxis: [
                            {
                                type: 'category',
                                axisTick: {
                                    alignWithLabel: true
                                },
                                data: []
                            }
                        ],
                        yAxis: [
                            {
                                type: 'value',
                                name: '数量：单',
                                position: 'left',
                                axisLine: {
                                    lineStyle: {
                                        color: colors[0]
                                    }
                                },
                                axisLabel: {
                                    formatter: '{value}'
                                }
                            },
                            {
                                type: 'value',
                                name: '额度：元',
                                position: 'right',
                                axisLine: {
                                    lineStyle: {
                                        color: colors[1]
                                    }
                                },
                                axisLabel: {
                                    formatter: '{value}'
                                }
                            }
                        ],
                        series: [
                            {
                                name:'订单数量',
                                type:'bar',
                                data:[]
                            },
                            {
                                name:'订单额度',
                                type:'bar',
                                yAxisIndex: 1,
                                data:[]
                            }
                        ]
                    };


    $(function(){

        $.ajax({
            url:'http://www.jiayibilin.com/api-webmanage/statistic/listAll',
            success: function(res) {

                var uov = res.userOverview;
                $('#dayPatient').html(uov[0].patient_count);
                $('#dayDoctor').html(uov[0].doctor_count);
                $('#patientTotal').html(uov[1].patient_count);
                $('#doctorTotal').html(uov[1].doctor_count);

                var ues = res.userStatistic;
                var months1 = [];
                var patientCounts = [];
                var doctorCounts = [];
                for (var i = 0; i < ues.length; i++){
                    months1.push(ues[i].month);
                    patientCounts.push(ues[i].patient_count);
                    doctorCounts.push(ues[i].doctor_count);
                }

                optionBar1.xAxis[0].data = months1;
                optionBar1.series[0].data = doctorCounts;
                optionBar1.series[1].data = patientCounts;

                bar1.setOption(optionBar1);

                var gs = res.groupStatistic;
                var gsd = optionPie.series[0].data;

                for (var i = 0; i < gs.length; i++) {
                    for (var j = 0; j < gsd.length; j++) {
                        if (gs[i].name == gsd[j].name) {
                            gsd[j].value = gs[i].value;
                            break;
                        }
                    }
                }
                optionPie.series[0].data = gsd;
                pie.setOption(optionPie);


                var oov = res.orderOverview;
                $('#monthsCount').html(oov[0].count);
                $('#monthsTotal').html(oov[0].total);
                $('#dayCount').html(oov[1].count);
                $('#dayTotal').html(oov[1].total);

                var oes = res.orderStatistic;
                var months2 = [];
                var counts = [];
                var totals = [];
                for (var i = 0; i < oes.length; i++){
                    months2.push(oes[i].month);
                    counts.push(oes[i].count);
                    totals.push(oes[i].total);
                }

                optionBar2.xAxis[0].data = months2;
                optionBar2.series[0].data = counts;
                optionBar2.series[1].data = totals;

                bar2.setOption(optionBar2);
            }
        })


    })

