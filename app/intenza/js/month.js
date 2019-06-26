/*jshint esversion: 6 */
/*jshint loopfunc: true */
/*
=======================================================
進入畫面自動取得年紀錄
=======================================================
*/
$(window).load(function() {
    if ($.cookie('logCookie')) {
        let jsonObj = JSON.parse($.cookie('logCookie'));
        console.log(jsonObj);
        uClientID = jsonObj.data.uClientID;
        $.ajax({
                type: 'POST',
                url: 'http://54.214.111.32:9004/RtInfoSum/DateuClientID/GET/2017-01-01/2018-01-01/' + uClientID,
                dataType: 'json',
                data: {
                    username: jsonObj.data.UserName,
                    password: jsonObj.data.UserPassword
                },
                contentType: 'application/x-www-form-urlencoded; charset=utf-8',
                xhrFields: {
                    withCredentials: true
                },
                crossDomain: true
            })
            .done(function(uJsonObj) {
                //有運動資料就印出，沒有就跳出 message - 目前無任何一筆運動資訊
                if (!uJsonObj.data.event) {
                    console.log(uJsonObj);
                    $('.showDate').append('<h1>' + '年紀錄' + '</h1>');
                    let janMile = 0;
                    let febMile = 0;
                    let marMile = 0;
                    let aprMile = 0;
                    let mayMile = 0;
                    let junMile = 0;
                    let julMile = 0;
                    let augMile = 0;
                    let sepMile = 0;
                    let octMile = 0;
                    let novMile = 0;
                    let decMile = 0;
                    for (let i in uJsonObj.data.rows) {
                        let getAllMonth = uJsonObj.data.rows[i].StartTime;
                        getAllMonthStr = getAllMonth.slice(5, 7);
                        switch (getAllMonthStr) {
                            case '01':
                                janMile += parseInt(uJsonObj.data.rows[i].Miles);
                                break;
                            case '02':
                                febMile += parseInt(uJsonObj.data.rows[i].Miles);
                                break;
                            case '03':
                                marMile += parseInt(uJsonObj.data.rows[i].Miles);
                                break;
                            case '04':
                                aprMile += parseInt(uJsonObj.data.rows[i].Miles);
                                break;
                            case '05':
                                mayMile += parseInt(uJsonObj.data.rows[i].Miles);
                                break;
                            case '06':
                                junMile += parseInt(uJsonObj.data.rows[i].Miles);
                                break;
                            case '07':
                                julMile += parseInt(uJsonObj.data.rows[i].Miles);
                                break;
                            case '08':
                                augMile += parseInt(uJsonObj.data.rows[i].Miles);
                                break;
                            case '09':
                                sepMile += parseInt(uJsonObj.data.rows[i].Miles);
                                break;
                            case '10':
                                octMile += parseInt(uJsonObj.data.rows[i].Miles);
                                break;
                            case '11':
                                novMile += parseInt(uJsonObj.data.rows[i].Miles);
                                break;
                            case '12':
                                decMile += parseInt(uJsonObj.data.rows[i].Miles);
                                break;
                            default:
                                console.log('error');
                                break;
                        }
                    } // for in 結束
                    //$(document).ready(function() {

                    let allMonthMile = [janMile, febMile, marMile, aprMile, mayMile, junMile,
                        julMile, augMile, sepMile, octMile, novMile, decMile
                    ];
                    console.log(allMonthMile);
                    let chartdata = {
                        labels: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
                        datasets: [{
                            label: 'Mile',
                            backgroundColor: 'rgba(200,200,200,0.75)',
                            borderColor: 'rgba(200,200,200,0.75)',
                            hoverBackgroundColor: 'rgba(200,200,200,1)',
                            hoverBorderColor: 'rgba(200,200,200,1)',
                            animationEasing: "easeOutQuart",
                            data: allMonthMile
                        }]
                    }; //chartdata 結束

                    let canvas = document.getElementById("mycanvas");
                    let ctx = canvas.getContext("2d");
                    let myNewChart = new Chart(ctx, {
                        type: 'bar',
                        data: chartdata
                    });

                    //點擊監聽事件，
                    canvas.onclick = function(evt) {
                        let activePoints = myNewChart.getElementsAtEvent(evt);
                        let chartData = activePoints[0]['_chart'].config.data;
                        let idx = activePoints[0]['_index'];
                        let label = chartData.labels[idx];
                        let value = chartData.datasets[0].data[idx];

                        let dayMiel_1 = 0;
                        let dayMiel_2 = 0;
                        let dayMiel_3 = 0;
                        let dayMiel_4 = 0;
                        let dayMiel_5 = 0;
                        let dayMiel_6 = 0;
                        let dayMiel_7 = 0;
                        let dayMiel_8 = 0;
                        let dayMiel_9 = 0;
                        let dayMiel_10 = 0;
                        let dayMiel_11 = 0;
                        let dayMiel_12 = 0;
                        let dayMiel_13 = 0;
                        let dayMiel_14 = 0;
                        let dayMiel_15 = 0;
                        let dayMiel_16 = 0;
                        let dayMiel_17 = 0;
                        let dayMiel_18 = 0;
                        let dayMiel_19 = 0;
                        let dayMiel_20 = 0;
                        let dayMiel_21 = 0;
                        let dayMiel_22 = 0;
                        let dayMiel_23 = 0;
                        let dayMiel_24 = 0;
                        let dayMiel_25 = 0;
                        let dayMiel_26 = 0;
                        let dayMiel_27 = 0;
                        let dayMiel_28 = 0;
                        let dayMiel_29 = 0;
                        let dayMiel_30 = 0;
                        let dayMiel_31 = 0;

                        getDayMile_1 = function() {
                            return dayMiel_1;
                        };
                        getDayMile_2 = function() {
                            return dayMiel_2;
                        };
                        getDayMile_3 = function() {
                            return dayMiel_3;
                        };
                        getDayMile_4 = function() {
                            return dayMiel_4;
                        };
                        getDayMile_5 = function() {
                            return dayMiel_5;
                        };
                        getDayMile_6 = function() {
                            return dayMiel_6;
                        };
                        getDayMile_7 = function() {
                            return dayMiel_7;
                        };
                        getDayMile_8 = function() {
                            return dayMiel_8;
                        };
                        getDayMile_9 = function() {
                            return dayMiel_9;
                        };
                        getDayMile_10 = function() {
                            return dayMiel_10;
                        };
                        getDayMile_11 = function() {
                            return dayMiel_11;
                        };
                        getDayMile_12 = function() {
                            return dayMiel_12;
                        };
                        getDayMile_13 = function() {
                            return dayMiel_13;
                        };
                        getDayMile_14 = function() {
                            return dayMiel_14;
                        };
                        getDayMile_15 = function() {
                            return dayMiel_15;
                        };
                        getDayMile_16 = function() {
                            return dayMiel_16;
                        };
                        getDayMile_17 = function() {
                            return dayMiel_17;
                        };
                        getDayMile_18 = function() {
                            return dayMiel_18;
                        };
                        getDayMile_19 = function() {
                            return dayMiel_19;
                        };
                        getDayMile_20 = function() {
                            return dayMiel_20;
                        };
                        getDayMile_21 = function() {
                            return dayMiel_21;
                        };
                        getDayMile_22 = function() {
                            return dayMiel_22;
                        };
                        getDayMile_23 = function() {
                            return dayMiel_23;
                        };
                        getDayMile_24 = function() {
                            return dayMiel_24;
                        };
                        getDayMile_25 = function() {
                            return dayMiel_25;
                        };
                        getDayMile_26 = function() {
                            return dayMiel_26;
                        };
                        getDayMile_27 = function() {
                            return dayMiel_27;
                        };
                        getDayMile_28 = function() {
                            return dayMiel_28;
                        };
                        getDayMile_29 = function() {
                            return dayMiel_29;
                        };
                        getDayMile_30 = function() {
                            return dayMiel_30;
                        };
                        getDayMile_31 = function() {
                            return dayMiel_31;
                        };
                        switch (label) {
                            case '一月':
                                $.ajax({
                                    type: 'POST',
                                    url: 'http://54.214.111.32:9004/RtInfoSum/DateuClientID/GET/2017-01-01/2017-01-31/' + uClientID,
                                    dataType: 'json',
                                    data: {
                                        username: jsonObj.data.UserName,
                                        password: jsonObj.data.UserPassword,
                                        dEncoding: jsonObj.data.dEncoding
                                    },
                                    contentType: 'application/x-www-form-urlencoded; charset=utf-8',
                                    xhrFields: {
                                        withCredentials: true
                                    },
                                    crossDomain: true,
                                }).done(function(data) {
                                    console.log(data);
                                    $('#mycanvas').hide();
                                    if (!data.data.event) {
                                        console.log(data);
                                        let getdEncodingArr = [];
                                        for (let i in data.data.rows) {
                                            let getAllMonth = uJsonObj.data.rows[i].StartTime;
                                            getAllMonthStr = getAllMonth.slice(8, 10);
                                            switch (getAllMonthStr) {
                                                case '01':
                                                    dayMiel_1 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '02':
                                                    dayMiel_2 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '03':
                                                    dayMiel_3 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '04':
                                                    dayMiel_4 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '05':
                                                    dayMiel_5 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '06':
                                                    dayMiel_6 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '07':
                                                    dayMiel_7 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '08':
                                                    dayMiel_8 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '09':
                                                    dayMiel_9 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '10':
                                                    dayMiel_10 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '11':
                                                    dayMiel_11 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '12':
                                                    dayMiel_12 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '13':
                                                    dayMiel_13 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '14':
                                                    dayMiel_14 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '15':
                                                    dayMiel_15 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '16':
                                                    dayMiel_16 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '17':
                                                    dayMiel_17 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '18':
                                                    dayMiel_18 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '19':
                                                    dayMiel_19 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '20':
                                                    dayMiel_20 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '21':
                                                    dayMiel_21 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '22':
                                                    dayMiel_22 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '23':
                                                    dayMiel_23 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '24':
                                                    dayMiel_24 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '25':
                                                    dayMiel_25 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '26':
                                                    dayMiel_26 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '27':
                                                    dayMiel_27 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '28':
                                                    dayMiel_28 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '29':
                                                    dayMiel_29 += parseInt(adata.data.rows[i].Miles);
                                                    break;
                                                case '30':
                                                    dayMiel_30 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '31':
                                                    dayMiel_31 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                default:
                                                    console.log('error');
                                                    break;
                                            } //switch 結束
                                            let getDateForMune = data.data.rows[i].StartTime;
                                            let getYear = getDateForMune.slice(0, 4);
                                            let getMonth = getDateForMune.slice(5, 7);
                                            let getDate = getDateForMune.slice(8, 10);
                                            $('.showTextMune').html(
                                                '<p>' + getMonth + '月份共有 ' + data.data.rows.length + ' 筆運動資料。' + '</p>'
                                            );
                                            $('.showDate').html('<h1>' + getMonth + ' 月份的紀錄' + '</h1>');
                                            //在圖表下面秀出當月有幾筆的資料
                                            $('.showDayMessage').append(
                                                '<tr class="active searchDay">' + '<th>' + getYear + '/' + getMonth +
                                                '/' + getDate + '</th>' + '<th>' + data.data.rows[i].Miles + ' mile ' + '</th>' + '<th>' +
                                                data.data.rows[i].Cal + ' kcal ' + '</th>' + '<th>' + data.data.rows[i].Watt + ' w ' + '</th>' + '</tr>'
                                            );
                                            //把當月的總資料丟到一個array裡
                                            let getdEncoding = data.data.rows[i];
                                            getdEncodingArr[i] = getdEncoding;
                                            $('.searchDay').removeClass('searchDay').addClass('searchDay' + i);

                                        } // for in 結束

                                        //抓出使用者點哪一筆的日紀錄
                                        for (let i in getdEncodingArr) {
                                            let getDateForMune = data.data.rows[i].StartTime;
                                            let getMonth = getDateForMune.slice(5, 7);
                                            let getDate = getDateForMune.slice(8, 10);
                                            $('.searchDay' + i).on('click', function() {
                                                $('#mycanvasDay').hide();
                                                $('.monthMune ul').hide();
                                                $('.showDayMessage').hide();
                                                $('.showTextMune').hide();
                                                $('.showDate').html('<h1>' + '</h1>' + '<span>' + getMonth + '月' + getDate + '號' + '</span>' +
                                                    '<span>' + '詳細的運動資料。' + '</span>');
                                                $('.showDayMessage2').append(
                                                    '<tr>' + '<th class="active">' + '</th>' + '<th class="active">' + 'TOTAL' + '</th>' + '</tr>' +
                                                    '<tr>' + '<td>' + 'DIS' + '</td>' + '<td>' + getdEncodingArr[i].Miles + ' km' + '</td>' + '</tr>' +
                                                    '<tr>' + '<td>' + 'TIME' + '</td>' + '<td>' + getdEncodingArr[i].SportsTime + '</td>' + '</tr>' +
                                                    '<tr>' + '<td>' + 'CALORIES' + '</td>' + '<td>' + getdEncodingArr[i].Cal + ' kcal' + '</td>' + '</tr>'
                                                );
                                                $('.showDayMessage3').append(
                                                    '<tr>' + '<th class="active">' + 'AVG' + '</th>' + '<th class="active">' + '</th>' + '<th class="active">' + 'MAX' + '</th>' + '</tr>' +
                                                    '<tr>' + '<td>' + getdEncodingArr[i].Watt + '</td>' + '<th>' + 'WATT' + '</th>' + '<td>' + getdEncodingArr[i].MaxWatt + '</td>' + '</tr>' +
                                                    '<tr>' + '<td>' + getdEncodingArr[i].AR + '</td>' + '<th>' + 'RPM' + '</th>' + '<td>' + getdEncodingArr[i].MaxR + '</td>' + '</tr>' +
                                                    '<tr>' + '<td>' + getdEncodingArr[i].AH + '</td>' + '<th>' + 'HR' + '</th>' + '<td>' + getdEncodingArr[i].MaxH + '</td>' + '</tr>'
                                                );
                                            });
                                        }


                                        let chartdata = {
                                            labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10",
                                                "11", "12", "13", "14", "15", "16", "17", "18", "19", "20",
                                                "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"
                                            ],
                                            datasets: [{
                                                label: 'Mile',
                                                backgroundColor: 'rgba(200,200,200,0.75)',
                                                borderColor: 'rgba(200,200,200,0.75)',
                                                hoverBackgroundColor: 'rgba(200,200,200,1)',
                                                hoverBorderColor: 'rgba(200,200,200,1)',
                                                animationEasing: "easeOutQuart",
                                                data: [getDayMile_1(), getDayMile_2(), getDayMile_3(), getDayMile_4(),
                                                    getDayMile_5(), getDayMile_6(), getDayMile_7(), getDayMile_8(),
                                                    getDayMile_9(), getDayMile_10(), getDayMile_11(), getDayMile_12(),
                                                    getDayMile_13(), getDayMile_14(), getDayMile_15(), getDayMile_16(),
                                                    getDayMile_17(), getDayMile_18(), getDayMile_19(), getDayMile_20(),
                                                    getDayMile_21(), getDayMile_22(), getDayMile_23(), getDayMile_24(),
                                                    getDayMile_25(), getDayMile_26(), getDayMile_27(), getDayMile_28(),
                                                    getDayMile_29(), getDayMile_30(), getDayMile_31()
                                                ]
                                            }]
                                        };
                                        let canvas = document.getElementById("mycanvasDay");
                                        let ctx = canvas.getContext("2d");
                                        let myNewChart = new Chart(ctx, {
                                            type: 'bar',
                                            data: chartdata
                                        });

                                    } else if (data.data.event == 'empty') {
                                        $('#myList').html('目前無任何一筆運動資訊');
                                    }
                                }).fail(function(xhr) {
                                    console.log('一月份錯誤');
                                });
                                break;
                            case '二月':
                                $.ajax({
                                    type: 'POST',
                                    url: 'http://54.214.111.32:9004/RtInfoSum/DateuClientID/GET/2017-02-01/2017-02-31/' + uClientID,
                                    dataType: 'json',
                                    data: {
                                        username: jsonObj.data.UserName,
                                        password: jsonObj.data.UserPassword,
                                        dEncoding: jsonObj.data.dEncoding
                                    },
                                    contentType: 'application/x-www-form-urlencoded; charset=utf-8',
                                    xhrFields: {
                                        withCredentials: true
                                    },
                                    crossDomain: true,
                                }).done(function(data) {
                                    $('#mycanvas').hide();
                                    if (!data.data.event) {
                                        let getdEncodingArr = [];
                                        for (let i in data.data.rows) {
                                            let getAllMonth = uJsonObj.data.rows[i].StartTime;
                                            getAllMonthStr = getAllMonth.slice(8, 10);
                                            switch (getAllMonthStr) {
                                                case '01':
                                                    dayMiel_1 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '02':
                                                    dayMiel_2 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '03':
                                                    dayMiel_3 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '04':
                                                    dayMiel_4 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '05':
                                                    dayMiel_5 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '06':
                                                    dayMiel_6 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '07':
                                                    dayMiel_7 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '08':
                                                    dayMiel_8 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '09':
                                                    dayMiel_9 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '10':
                                                    dayMiel_10 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '11':
                                                    dayMiel_11 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '12':
                                                    dayMiel_12 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '13':
                                                    dayMiel_13 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '14':
                                                    dayMiel_14 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '15':
                                                    dayMiel_15 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '16':
                                                    dayMiel_16 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '17':
                                                    dayMiel_17 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '18':
                                                    dayMiel_18 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '19':
                                                    dayMiel_19 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '20':
                                                    dayMiel_20 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '21':
                                                    dayMiel_21 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '22':
                                                    dayMiel_22 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '23':
                                                    dayMiel_23 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '24':
                                                    dayMiel_24 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '25':
                                                    dayMiel_25 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '26':
                                                    dayMiel_26 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '27':
                                                    dayMiel_27 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '28':
                                                    dayMiel_28 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '29':
                                                    dayMiel_29 += parseInt(adata.data.rows[i].Miles);
                                                    break;
                                                case '30':
                                                    dayMiel_30 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '31':
                                                    dayMiel_31 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                default:
                                                    console.log('error');
                                                    break;
                                            } //switch 結束
                                            let getDateForMune = data.data.rows[i].StartTime;
                                            let getYear = getDateForMune.slice(0, 4);
                                            let getMonth = getDateForMune.slice(5, 7);
                                            let getDate = getDateForMune.slice(8, 10);
                                            $('.showTextMune').html(
                                                '<p>' + getMonth + '月份共有 ' + data.data.rows.length + ' 筆運動資料。' + '</p>'
                                            );
                                            $('.showDate').html('<h1>' + getMonth + ' 月份的紀錄' + '</h1>');
                                            //在圖表下面秀出當月有幾筆的資料
                                            $('.showDayMessage').append(
                                                '<tr class="active searchDay">' + '<th>' + getYear + '/' + getMonth +
                                                '/' + getDate + '</th>' + '<th>' + data.data.rows[i].Miles + ' mile ' + '</th>' + '<th>' +
                                                data.data.rows[i].Cal + ' kcal ' + '</th>' + '<th>' + data.data.rows[i].Watt + ' w ' + '</th>' + '</tr>'
                                            );
                                            //把當月的總資料丟到一個array裡
                                            let getdEncoding = data.data.rows[i];
                                            getdEncodingArr[i] = getdEncoding;
                                            $('.searchDay').removeClass('searchDay').addClass('searchDay' + i);

                                        } // for in 結束 

                                        //抓出使用者點哪一筆的日紀錄
                                        for (let i in getdEncodingArr) {
                                            let getDateForMune = data.data.rows[i].StartTime;
                                            let getMonth = getDateForMune.slice(5, 7);
                                            let getDate = getDateForMune.slice(8, 10);
                                            $('.searchDay' + i).on('click', function() {
                                                $('#mycanvasDay').hide();
                                                $('.monthMune ul').hide();
                                                $('.showDayMessage').hide();
                                                $('.showTextMune').hide();
                                                $('.showDate').html('<h1>' + '</h1>' + '<span>' + getMonth + '月' + getDate + '號' + '</span>' +
                                                    '<span>' + '詳細的運動資料。' + '</span>');
                                                $('.showDayMessage2').append(
                                                    '<tr>' + '<th class="active">' + '</th>' + '<th class="active">' + 'TOTAL' + '</th>' + '</tr>' +
                                                    '<tr>' + '<td>' + 'DIS' + '</td>' + '<td>' + getdEncodingArr[i].Miles + ' km' + '</td>' + '</tr>' +
                                                    '<tr>' + '<td>' + 'TIME' + '</td>' + '<td>' + getdEncodingArr[i].SportsTime + '</td>' + '</tr>' +
                                                    '<tr>' + '<td>' + 'CALORIES' + '</td>' + '<td>' + getdEncodingArr[i].Cal + ' kcal' + '</td>' + '</tr>'
                                                );
                                                $('.showDayMessage3').append(
                                                    '<tr>' + '<th class="active">' + 'AVG' + '</th>' + '<th class="active">' + '</th>' + '<th class="active">' + 'MAX' + '</th>' + '</tr>' +
                                                    '<tr>' + '<td>' + getdEncodingArr[i].Watt + '</td>' + '<th>' + 'WATT' + '</th>' + '<td>' + getdEncodingArr[i].MaxWatt + '</td>' + '</tr>' +
                                                    '<tr>' + '<td>' + getdEncodingArr[i].AR + '</td>' + '<th>' + 'RPM' + '</th>' + '<td>' + getdEncodingArr[i].MaxR + '</td>' + '</tr>' +
                                                    '<tr>' + '<td>' + getdEncodingArr[i].AH + '</td>' + '<th>' + 'HR' + '</th>' + '<td>' + getdEncodingArr[i].MaxH + '</td>' + '</tr>'
                                                );
                                            });
                                        }
                                        let chartdata = {
                                            labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10",
                                                "11", "12", "13", "14", "15", "16", "17", "18", "19", "20",
                                                "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"
                                            ],
                                            datasets: [{
                                                label: 'Mile',
                                                backgroundColor: 'rgba(200,200,200,0.75)',
                                                borderColor: 'rgba(200,200,200,0.75)',
                                                hoverBackgroundColor: 'rgba(200,200,200,1)',
                                                hoverBorderColor: 'rgba(200,200,200,1)',
                                                animationEasing: "easeOutQuart",
                                                data: [getDayMile_1(), getDayMile_2(), getDayMile_3(), getDayMile_4(),
                                                    getDayMile_5(), getDayMile_6(), getDayMile_7(), getDayMile_8(),
                                                    getDayMile_9(), getDayMile_10(), getDayMile_11(), getDayMile_12(),
                                                    getDayMile_13(), getDayMile_14(), getDayMile_15(), getDayMile_16(),
                                                    getDayMile_17(), getDayMile_18(), getDayMile_19(), getDayMile_20(),
                                                    getDayMile_21(), getDayMile_22(), getDayMile_23(), getDayMile_24(),
                                                    getDayMile_25(), getDayMile_26(), getDayMile_27(), getDayMile_28(),
                                                    getDayMile_29(), getDayMile_30(), getDayMile_31()
                                                ]
                                            }]
                                        };
                                        let canvas = document.getElementById("mycanvasDay");
                                        let ctx = canvas.getContext("2d");
                                        let myNewChart = new Chart(ctx, {
                                            type: 'bar',
                                            data: chartdata
                                        });

                                    } else if (data.data.event == 'empty') {
                                        $('#myList').html('目前無任何一筆運動資訊');
                                    }
                                }).fail(function(xhr) {
                                    console.log('二月份錯誤');
                                });
                                break;
                            case '三月':
                                $.ajax({
                                    type: 'POST',
                                    url: 'http://54.214.111.32:9004/RtInfoSum/DateuClientID/GET/2017-03-01/2017-03-31/' + uClientID,
                                    dataType: 'json',
                                    data: {
                                        username: jsonObj.data.UserName,
                                        password: jsonObj.data.UserPassword,
                                        dEncoding: jsonObj.data.dEncoding
                                    },
                                    contentType: 'application/x-www-form-urlencoded; charset=utf-8',
                                    xhrFields: {
                                        withCredentials: true
                                    },
                                    crossDomain: true,
                                }).done(function(data) {
                                    console.log(data);
                                    $('#mycanvas').hide();
                                    if (!data.data.event) {
                                        console.log(data);

                                        let getdEncodingArr = [];
                                        for (let i in data.data.rows) {
                                            let getAllMonth = uJsonObj.data.rows[i].StartTime;
                                            getAllMonthStr = getAllMonth.slice(8, 10);
                                            switch (getAllMonthStr) {
                                                case '01':
                                                    dayMiel_1 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '02':
                                                    dayMiel_2 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '03':
                                                    dayMiel_3 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '04':
                                                    dayMiel_4 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '05':
                                                    dayMiel_5 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '06':
                                                    dayMiel_6 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '07':
                                                    dayMiel_7 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '08':
                                                    dayMiel_8 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '09':
                                                    dayMiel_9 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '10':
                                                    dayMiel_10 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '11':
                                                    dayMiel_11 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '12':
                                                    dayMiel_12 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '13':
                                                    dayMiel_13 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '14':
                                                    dayMiel_14 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '15':
                                                    dayMiel_15 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '16':
                                                    dayMiel_16 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '17':
                                                    dayMiel_17 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '18':
                                                    dayMiel_18 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '19':
                                                    dayMiel_19 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '20':
                                                    dayMiel_20 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '21':
                                                    dayMiel_21 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '22':
                                                    dayMiel_22 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '23':
                                                    dayMiel_23 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '24':
                                                    dayMiel_24 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '25':
                                                    dayMiel_25 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '26':
                                                    dayMiel_26 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '27':
                                                    dayMiel_27 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '28':
                                                    dayMiel_28 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '29':
                                                    dayMiel_29 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '30':
                                                    dayMiel_30 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '31':
                                                    dayMiel_31 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                default:
                                                    console.log('error');
                                                    break;
                                            } //switch 結束
                                            let getDateForMune = data.data.rows[i].StartTime;
                                            let getYear = getDateForMune.slice(0, 4);
                                            let getMonth = getDateForMune.slice(5, 7);
                                            let getDate = getDateForMune.slice(8, 10);
                                            $('.showTextMune').html(
                                                '<p>' + getMonth + '月份共有 ' + data.data.rows.length + ' 筆運動資料。' + '</p>'
                                            );
                                            $('.showDate').html('<h1>' + getMonth + ' 月份的紀錄' + '</h1>');
                                            //在圖表下面秀出當月有幾筆的資料
                                            $('.showDayMessage').append(
                                                '<tr class="active searchDay">' + '<th>' + getYear + '/' + getMonth +
                                                '/' + getDate + '</th>' + '<th>' + data.data.rows[i].Miles + ' mile ' + '</th>' + '<th>' +
                                                data.data.rows[i].Cal + ' kcal ' + '</th>' + '<th>' + data.data.rows[i].Watt + ' w ' + '</th>' + '</tr>'
                                            );
                                            //把當月的總資料丟到一個array裡
                                            let getdEncoding = data.data.rows[i];
                                            getdEncodingArr[i] = getdEncoding;
                                            $('.searchDay').removeClass('searchDay').addClass('searchDay' + i);

                                        } // for in 結束

                                        //抓出使用者點哪一筆的日紀錄
                                        for (let i in getdEncodingArr) {
                                            let getDateForMune = data.data.rows[i].StartTime;
                                            let getMonth = getDateForMune.slice(5, 7);
                                            let getDate = getDateForMune.slice(8, 10);
                                            $('.searchDay' + i).mouseover(function(event) {
                                                $(this).removeClass('active');
                                            });
                                            $('.searchDay' + i).mouseleave(function() {
                                                $(this).addClass('active');
                                            });
                                            $('.searchDay' + i).on('click', function() {
                                                $('#mycanvasDay').hide();
                                                $('.monthMune ul').hide();
                                                $('.showDayMessage').hide();
                                                $('.showTextMune').hide();
                                                $('.showDate').html('<h1>' + '</h1>' + '<span>' + getMonth + '月' + getDate + '號' + '</span>' +
                                                    '<span>' + '詳細的運動資料。' + '</span>');
                                                $('.showDayMessage2').append(
                                                    '<tr>' + '<th class="active">' + '</th>' + '<th class="active">' + 'TOTAL' + '</th>' + '</tr>' +
                                                    '<tr>' + '<td>' + 'DIS' + '</td>' + '<td>' + getdEncodingArr[i].Miles + ' km' + '</td>' + '</tr>' +
                                                    '<tr>' + '<td>' + 'TIME' + '</td>' + '<td>' + getdEncodingArr[i].SportsTime + '</td>' + '</tr>' +
                                                    '<tr>' + '<td>' + 'CALORIES' + '</td>' + '<td>' + getdEncodingArr[i].Cal + ' kcal' + '</td>' + '</tr>'
                                                );
                                                $('.showDayMessage3').append(
                                                    '<tr>' + '<th class="active">' + 'AVG' + '</th>' + '<th class="active">' + '</th>' + '<th class="active">' + 'MAX' + '</th>' + '</tr>' +
                                                    '<tr>' + '<td>' + getdEncodingArr[i].Watt + '</td>' + '<th>' + 'WATT' + '</th>' + '<td>' + getdEncodingArr[i].MaxWatt + '</td>' + '</tr>' +
                                                    '<tr>' + '<td>' + getdEncodingArr[i].AR + '</td>' + '<th>' + 'RPM' + '</th>' + '<td>' + getdEncodingArr[i].MaxR + '</td>' + '</tr>' +
                                                    '<tr>' + '<td>' + getdEncodingArr[i].AH + '</td>' + '<th>' + 'HR' + '</th>' + '<td>' + getdEncodingArr[i].MaxH + '</td>' + '</tr>'
                                                );
                                            });
                                        }

                                        let chartdata = {
                                            labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10",
                                                "11", "12", "13", "14", "15", "16", "17", "18", "19", "20",
                                                "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"
                                            ],
                                            datasets: [{
                                                label: 'Mile',
                                                backgroundColor: 'rgba(200,200,200,0.75)',
                                                borderColor: 'rgba(200,200,200,0.75)',
                                                hoverBackgroundColor: 'rgba(200,200,200,1)',
                                                hoverBorderColor: 'rgba(200,200,200,1)',
                                                animationEasing: "easeOutQuart",
                                                data: [getDayMile_1(), getDayMile_2(), getDayMile_3(), getDayMile_4(),
                                                    getDayMile_5(), getDayMile_6(), getDayMile_7(), getDayMile_8(),
                                                    getDayMile_9(), getDayMile_10(), getDayMile_11(), getDayMile_12(),
                                                    getDayMile_13(), getDayMile_14(), getDayMile_15(), getDayMile_16(),
                                                    getDayMile_17(), getDayMile_18(), getDayMile_19(), getDayMile_20(),
                                                    getDayMile_21(), getDayMile_22(), getDayMile_23(), getDayMile_24(),
                                                    getDayMile_25(), getDayMile_26(), getDayMile_27(), getDayMile_28(),
                                                    getDayMile_29(), getDayMile_30(), getDayMile_31()
                                                ]
                                            }]
                                        };
                                        let canvas = document.getElementById("mycanvasDay");
                                        let ctx = canvas.getContext("2d");
                                        let myNewChart = new Chart(ctx, {
                                            type: 'bar',
                                            data: chartdata
                                        });

                                    } else if (data.data.event == 'empty') {
                                        $('#myList').html('目前無任何一筆運動資訊');
                                    }
                                }).fail(function(xhr) {
                                    console.log('三月份錯誤');
                                });
                                break;
                            case '四月':
                                $.ajax({
                                    type: 'POST',
                                    url: 'http://54.214.111.32:9004/RtInfoSum/DateuClientID/GET/2017-04-01/2017-04-31/' + uClientID,
                                    dataType: 'json',
                                    data: {
                                        username: jsonObj.data.UserName,
                                        password: jsonObj.data.UserPassword,
                                        dEncoding: jsonObj.data.dEncoding
                                    },
                                    contentType: 'application/x-www-form-urlencoded; charset=utf-8',
                                    xhrFields: {
                                        withCredentials: true
                                    },
                                    crossDomain: true,
                                }).done(function(data) {
                                    console.log(data);
                                    $('#mycanvas').hide();
                                    if (!data.data.event) {
                                        console.log(data);
                                        let getdEncodingArr = [];
                                        for (let i in data.data.rows) {
                                            let getAllMonth = uJsonObj.data.rows[i].StartTime;
                                            getAllMonthStr = getAllMonth.slice(8, 10);
                                            switch (getAllMonthStr) {
                                                case '01':
                                                    dayMiel_1 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '02':
                                                    dayMiel_2 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '03':
                                                    dayMiel_3 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '04':
                                                    dayMiel_4 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '05':
                                                    dayMiel_5 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '06':
                                                    dayMiel_6 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '07':
                                                    dayMiel_7 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '08':
                                                    dayMiel_8 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '09':
                                                    dayMiel_9 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '10':
                                                    dayMiel_10 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '11':
                                                    dayMiel_11 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '12':
                                                    dayMiel_12 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '13':
                                                    dayMiel_13 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '14':
                                                    dayMiel_14 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '15':
                                                    dayMiel_15 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '16':
                                                    dayMiel_16 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '17':
                                                    dayMiel_17 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '18':
                                                    dayMiel_18 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '19':
                                                    dayMiel_19 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '20':
                                                    dayMiel_20 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '21':
                                                    dayMiel_21 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '22':
                                                    dayMiel_22 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '23':
                                                    dayMiel_23 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '24':
                                                    dayMiel_24 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '25':
                                                    dayMiel_25 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '26':
                                                    dayMiel_26 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '27':
                                                    dayMiel_27 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '28':
                                                    dayMiel_28 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '29':
                                                    dayMiel_29 += parseInt(adata.data.rows[i].Miles);
                                                    break;
                                                case '30':
                                                    dayMiel_30 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '31':
                                                    dayMiel_31 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                default:
                                                    console.log('error');
                                                    break;
                                            } //switch 結束
                                            let getDateForMune = data.data.rows[i].StartTime;
                                            let getYear = getDateForMune.slice(0, 4);
                                            let getMonth = getDateForMune.slice(5, 7);
                                            let getDate = getDateForMune.slice(8, 10);
                                            $('.showTextMune').html(
                                                '<p>' + getMonth + '月份共有 ' + data.data.rows.length + ' 筆運動資料。' + '</p>'
                                            );
                                            $('.showDate').html('<h1>' + getMonth + ' 月份的紀錄' + '</h1>');
                                            //在圖表下面秀出當月有幾筆的資料
                                            $('.showDayMessage').append(
                                                '<tr class="active searchDay">' + '<th>' + getYear + '/' + getMonth +
                                                '/' + getDate + '</th>' + '<th>' + data.data.rows[i].Miles + ' mile ' + '</th>' + '<th>' +
                                                data.data.rows[i].Cal + ' kcal ' + '</th>' + '<th>' + data.data.rows[i].Watt + ' w ' + '</th>' + '</tr>'
                                            );
                                            //把當月的總資料丟到一個array裡
                                            let getdEncoding = data.data.rows[i];
                                            getdEncodingArr[i] = getdEncoding;
                                            $('.searchDay').removeClass('searchDay').addClass('searchDay' + i);

                                        } // for in 結束

                                        //抓出使用者點哪一筆的日紀錄
                                        for (let i in getdEncodingArr) {
                                            let getDateForMune = data.data.rows[i].StartTime;
                                            let getMonth = getDateForMune.slice(5, 7);
                                            let getDate = getDateForMune.slice(8, 10);
                                            $('.searchDay' + i).on('click', function() {
                                                $('#mycanvasDay').hide();
                                                $('.monthMune ul').hide();
                                                $('.showDayMessage').hide();
                                                $('.showTextMune').hide();
                                                $('.showDate').html('<h1>' + '</h1>' + '<span>' + getMonth + '月' + getDate + '號' + '</span>' +
                                                    '<span>' + '詳細的運動資料。' + '</span>');
                                                $('.showDayMessage2').append(
                                                    '<tr>' + '<th class="active">' + '</th>' + '<th class="active">' + 'TOTAL' + '</th>' + '</tr>' +
                                                    '<tr>' + '<td>' + 'DIS' + '</td>' + '<td>' + getdEncodingArr[i].Miles + ' km' + '</td>' + '</tr>' +
                                                    '<tr>' + '<td>' + 'TIME' + '</td>' + '<td>' + getdEncodingArr[i].SportsTime + '</td>' + '</tr>' +
                                                    '<tr>' + '<td>' + 'CALORIES' + '</td>' + '<td>' + getdEncodingArr[i].Cal + ' kcal' + '</td>' + '</tr>'
                                                );
                                                $('.showDayMessage3').append(
                                                    '<tr>' + '<th class="active">' + 'AVG' + '</th>' + '<th class="active">' + '</th>' + '<th class="active">' + 'MAX' + '</th>' + '</tr>' +
                                                    '<tr>' + '<td>' + getdEncodingArr[i].Watt + '</td>' + '<th>' + 'WATT' + '</th>' + '<td>' + getdEncodingArr[i].MaxWatt + '</td>' + '</tr>' +
                                                    '<tr>' + '<td>' + getdEncodingArr[i].AR + '</td>' + '<th>' + 'RPM' + '</th>' + '<td>' + getdEncodingArr[i].MaxR + '</td>' + '</tr>' +
                                                    '<tr>' + '<td>' + getdEncodingArr[i].AH + '</td>' + '<th>' + 'HR' + '</th>' + '<td>' + getdEncodingArr[i].MaxH + '</td>' + '</tr>'
                                                );
                                            });
                                        }

                                        let chartdata = {
                                            labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10",
                                                "11", "12", "13", "14", "15", "16", "17", "18", "19", "20",
                                                "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"
                                            ],
                                            datasets: [{
                                                label: 'Mile',
                                                backgroundColor: 'rgba(200,200,200,0.75)',
                                                borderColor: 'rgba(200,200,200,0.75)',
                                                hoverBackgroundColor: 'rgba(200,200,200,1)',
                                                hoverBorderColor: 'rgba(200,200,200,1)',
                                                animationEasing: "easeOutQuart",
                                                data: [getDayMile_1(), getDayMile_2(), getDayMile_3(), getDayMile_4(),
                                                    getDayMile_5(), getDayMile_6(), getDayMile_7(), getDayMile_8(),
                                                    getDayMile_9(), getDayMile_10(), getDayMile_11(), getDayMile_12(),
                                                    getDayMile_13(), getDayMile_14(), getDayMile_15(), getDayMile_16(),
                                                    getDayMile_17(), getDayMile_18(), getDayMile_19(), getDayMile_20(),
                                                    getDayMile_21(), getDayMile_22(), getDayMile_23(), getDayMile_24(),
                                                    getDayMile_25(), getDayMile_26(), getDayMile_27(), getDayMile_28(),
                                                    getDayMile_29(), getDayMile_30(), getDayMile_31()
                                                ]
                                            }]
                                        };
                                        let canvas = document.getElementById("mycanvasDay");
                                        let ctx = canvas.getContext("2d");
                                        let myNewChart = new Chart(ctx, {
                                            type: 'bar',
                                            data: chartdata
                                        });

                                    } else if (data.data.event == 'empty') {
                                        $('#myList').html('目前無任何一筆運動資訊');
                                    }
                                }).fail(function(xhr) {
                                    console.log('四月份錯誤');
                                });
                                break;
                            case '五月':
                                $.ajax({
                                    type: 'POST',
                                    url: 'http://54.214.111.32:9004/RtInfoSum/DateuClientID/GET/2017-05-01/2017-05-31/' + uClientID,
                                    dataType: 'json',
                                    data: {
                                        username: jsonObj.data.UserName,
                                        password: jsonObj.data.UserPassword,
                                        dEncoding: jsonObj.data.dEncoding
                                    },
                                    contentType: 'application/x-www-form-urlencoded; charset=utf-8',
                                    xhrFields: {
                                        withCredentials: true
                                    },
                                    crossDomain: true,
                                }).done(function(data) {
                                    console.log(data);
                                    $('#mycanvas').hide();
                                    if (!data.data.event) {
                                        console.log(data);
                                        let getdEncodingArr = [];
                                        for (let i in data.data.rows) {
                                            let getAllMonth = uJsonObj.data.rows[i].StartTime;
                                            getAllMonthStr = getAllMonth.slice(8, 10);
                                            switch (getAllMonthStr) {
                                                case '01':
                                                    dayMiel_1 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '02':
                                                    dayMiel_2 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '03':
                                                    dayMiel_3 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '04':
                                                    dayMiel_4 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '05':
                                                    dayMiel_5 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '06':
                                                    dayMiel_6 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '07':
                                                    dayMiel_7 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '08':
                                                    dayMiel_8 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '09':
                                                    dayMiel_9 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '10':
                                                    dayMiel_10 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '11':
                                                    dayMiel_11 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '12':
                                                    dayMiel_12 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '13':
                                                    dayMiel_13 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '14':
                                                    dayMiel_14 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '15':
                                                    dayMiel_15 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '16':
                                                    dayMiel_16 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '17':
                                                    dayMiel_17 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '18':
                                                    dayMiel_18 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '19':
                                                    dayMiel_19 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '20':
                                                    dayMiel_20 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '21':
                                                    dayMiel_21 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '22':
                                                    dayMiel_22 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '23':
                                                    dayMiel_23 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '24':
                                                    dayMiel_24 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '25':
                                                    dayMiel_25 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '26':
                                                    dayMiel_26 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '27':
                                                    dayMiel_27 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '28':
                                                    dayMiel_28 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '29':
                                                    dayMiel_29 += parseInt(adata.data.rows[i].Miles);
                                                    break;
                                                case '30':
                                                    dayMiel_30 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '31':
                                                    dayMiel_31 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                default:
                                                    console.log('error');
                                                    break;
                                            } //switch 結束
                                            let getDateForMune = data.data.rows[i].StartTime;
                                            let getYear = getDateForMune.slice(0, 4);
                                            let getMonth = getDateForMune.slice(5, 7);
                                            let getDate = getDateForMune.slice(8, 10);
                                            $('.showTextMune').html(
                                                '<p>' + getMonth + '月份共有 ' + data.data.rows.length + ' 筆運動資料。' + '</p>'
                                            );
                                            $('.showDate').html('<h1>' + getMonth + ' 月份的紀錄' + '</h1>');
                                            //在圖表下面秀出當月有幾筆的資料
                                            $('.showDayMessage').append(
                                                '<tr class="active searchDay">' + '<th>' + getYear + '/' + getMonth +
                                                '/' + getDate + '</th>' + '<th>' + data.data.rows[i].Miles + ' mile ' + '</th>' + '<th>' +
                                                data.data.rows[i].Cal + ' kcal ' + '</th>' + '<th>' + data.data.rows[i].Watt + ' w ' + '</th>' + '</tr>'
                                            );
                                            //把當月的總資料丟到一個array裡
                                            let getdEncoding = data.data.rows[i];
                                            getdEncodingArr[i] = getdEncoding;
                                            $('.searchDay').removeClass('searchDay').addClass('searchDay' + i);

                                        } // for in 結束

                                        //抓出使用者點哪一筆的日紀錄
                                        for (let i in getdEncodingArr) {
                                            let getDateForMune = data.data.rows[i].StartTime;
                                            let getMonth = getDateForMune.slice(5, 7);
                                            let getDate = getDateForMune.slice(8, 10);
                                            $('.searchDay' + i).on('click', function() {
                                                $('#mycanvasDay').hide();
                                                $('.monthMune ul').hide();
                                                $('.showDayMessage').hide();
                                                $('.showTextMune').hide();
                                                $('.showDate').html('<h1>' + '</h1>' + '<span>' + getMonth + '月' + getDate + '號' + '</span>' +
                                                    '<span>' + '詳細的運動資料。' + '</span>');
                                                $('.showDayMessage2').append(
                                                    '<tr>' + '<th class="active">' + '</th>' + '<th class="active">' + 'TOTAL' + '</th>' + '</tr>' +
                                                    '<tr>' + '<td>' + 'DIS' + '</td>' + '<td>' + getdEncodingArr[i].Miles + ' km' + '</td>' + '</tr>' +
                                                    '<tr>' + '<td>' + 'TIME' + '</td>' + '<td>' + getdEncodingArr[i].SportsTime + '</td>' + '</tr>' +
                                                    '<tr>' + '<td>' + 'CALORIES' + '</td>' + '<td>' + getdEncodingArr[i].Cal + ' kcal' + '</td>' + '</tr>'
                                                );
                                                $('.showDayMessage3').append(
                                                    '<tr>' + '<th class="active">' + 'AVG' + '</th>' + '<th class="active">' + '</th>' + '<th class="active">' + 'MAX' + '</th>' + '</tr>' +
                                                    '<tr>' + '<td>' + getdEncodingArr[i].Watt + '</td>' + '<th>' + 'WATT' + '</th>' + '<td>' + getdEncodingArr[i].MaxWatt + '</td>' + '</tr>' +
                                                    '<tr>' + '<td>' + getdEncodingArr[i].AR + '</td>' + '<th>' + 'RPM' + '</th>' + '<td>' + getdEncodingArr[i].MaxR + '</td>' + '</tr>' +
                                                    '<tr>' + '<td>' + getdEncodingArr[i].AH + '</td>' + '<th>' + 'HR' + '</th>' + '<td>' + getdEncodingArr[i].MaxH + '</td>' + '</tr>'
                                                );
                                            });
                                        }

                                        let chartdata = {
                                            labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10",
                                                "11", "12", "13", "14", "15", "16", "17", "18", "19", "20",
                                                "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"
                                            ],
                                            datasets: [{
                                                label: 'Mile',
                                                backgroundColor: 'rgba(200,200,200,0.75)',
                                                borderColor: 'rgba(200,200,200,0.75)',
                                                hoverBackgroundColor: 'rgba(200,200,200,1)',
                                                hoverBorderColor: 'rgba(200,200,200,1)',
                                                animationEasing: "easeOutQuart",
                                                data: [getDayMile_1(), getDayMile_2(), getDayMile_3(), getDayMile_4(),
                                                    getDayMile_5(), getDayMile_6(), getDayMile_7(), getDayMile_8(),
                                                    getDayMile_9(), getDayMile_10(), getDayMile_11(), getDayMile_12(),
                                                    getDayMile_13(), getDayMile_14(), getDayMile_15(), getDayMile_16(),
                                                    getDayMile_17(), getDayMile_18(), getDayMile_19(), getDayMile_20(),
                                                    getDayMile_21(), getDayMile_22(), getDayMile_23(), getDayMile_24(),
                                                    getDayMile_25(), getDayMile_26(), getDayMile_27(), getDayMile_28(),
                                                    getDayMile_29(), getDayMile_30(), getDayMile_31()
                                                ]
                                            }]
                                        };
                                        let canvas = document.getElementById("mycanvasDay");
                                        let ctx = canvas.getContext("2d");
                                        let myNewChart = new Chart(ctx, {
                                            type: 'bar',
                                            data: chartdata
                                        });

                                    } else if (data.data.event == 'empty') {
                                        $('#myList').html('目前無任何一筆運動資訊');
                                    }
                                }).fail(function(xhr) {
                                    console.log('五月份錯誤');
                                });
                                break;
                            case '六月':
                                $.ajax({
                                    type: 'POST',
                                    url: 'http://54.214.111.32:9004/RtInfoSum/DateuClientID/GET/2017-06-01/2017-06-31/' + uClientID,
                                    dataType: 'json',
                                    data: {
                                        username: jsonObj.data.UserName,
                                        password: jsonObj.data.UserPassword,
                                        dEncoding: jsonObj.data.dEncoding
                                    },
                                    contentType: 'application/x-www-form-urlencoded; charset=utf-8',
                                    xhrFields: {
                                        withCredentials: true
                                    },
                                    crossDomain: true,
                                }).done(function(data) {
                                    console.log(data);
                                    $('#mycanvas').hide();
                                    if (!data.data.event) {
                                        console.log(data);

                                        let getdEncodingArr = [];
                                        for (let i in data.data.rows) {
                                            let getAllMonth = uJsonObj.data.rows[i].StartTime;
                                            getAllMonthStr = getAllMonth.slice(8, 10);
                                            switch (getAllMonthStr) {
                                                case '01':
                                                    dayMiel_1 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '02':
                                                    dayMiel_2 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '03':
                                                    dayMiel_3 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '04':
                                                    dayMiel_4 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '05':
                                                    dayMiel_5 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '06':
                                                    dayMiel_6 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '07':
                                                    dayMiel_7 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '08':
                                                    dayMiel_8 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '09':
                                                    dayMiel_9 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '10':
                                                    dayMiel_10 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '11':
                                                    dayMiel_11 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '12':
                                                    dayMiel_12 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '13':
                                                    dayMiel_13 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '14':
                                                    dayMiel_14 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '15':
                                                    dayMiel_15 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '16':
                                                    dayMiel_16 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '17':
                                                    dayMiel_17 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '18':
                                                    dayMiel_18 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '19':
                                                    dayMiel_19 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '20':
                                                    dayMiel_20 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '21':
                                                    dayMiel_21 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '22':
                                                    dayMiel_22 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '23':
                                                    dayMiel_23 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '24':
                                                    dayMiel_24 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '25':
                                                    dayMiel_25 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '26':
                                                    dayMiel_26 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '27':
                                                    dayMiel_27 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '28':
                                                    dayMiel_28 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '29':
                                                    dayMiel_29 += parseInt(adata.data.rows[i].Miles);
                                                    break;
                                                case '30':
                                                    dayMiel_30 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '31':
                                                    dayMiel_31 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                default:
                                                    console.log('error');
                                                    break;
                                            } //switch 結束
                                            let getDateForMune = data.data.rows[i].StartTime;
                                            let getYear = getDateForMune.slice(0, 4);
                                            let getMonth = getDateForMune.slice(5, 7);
                                            let getDate = getDateForMune.slice(8, 10);
                                            $('.showTextMune').html(
                                                '<p>' + getMonth + '月份共有 ' + data.data.rows.length + ' 筆運動資料。' + '</p>'
                                            );
                                            $('.showDate').html('<h1>' + getMonth + ' 月份的紀錄' + '</h1>');
                                            //在圖表下面秀出當月有幾筆的資料
                                            $('.showDayMessage').append(
                                                '<tr class="active searchDay">' + '<th>' + getYear + '/' + getMonth +
                                                '/' + getDate + '</th>' + '<th>' + data.data.rows[i].Miles + ' mile ' + '</th>' + '<th>' +
                                                data.data.rows[i].Cal + ' kcal ' + '</th>' + '<th>' + data.data.rows[i].Watt + ' w ' + '</th>' + '</tr>'
                                            );
                                            //把當月的總資料丟到一個array裡
                                            let getdEncoding = data.data.rows[i];
                                            getdEncodingArr[i] = getdEncoding;
                                            $('.searchDay').removeClass('searchDay').addClass('searchDay' + i);

                                        } // for in 結束

                                        //抓出使用者點哪一筆的日紀錄
                                        for (let i in getdEncodingArr) {
                                            let getDateForMune = data.data.rows[i].StartTime;
                                            let getMonth = getDateForMune.slice(5, 7);
                                            let getDate = getDateForMune.slice(8, 10);
                                            $('.searchDay' + i).on('click', function() {
                                                $('#mycanvasDay').hide();
                                                $('.monthMune ul').hide();
                                                $('.showDayMessage').hide();
                                                $('.showTextMune').hide();
                                                $('.showDate').html('<h1>' + '</h1>' + '<span>' + getMonth + '月' + getDate + '號' + '</span>' +
                                                    '<span>' + '詳細的運動資料。' + '</span>');
                                                $('.showDayMessage2').append(
                                                    '<tr>' + '<th class="active">' + '</th>' + '<th class="active">' + 'TOTAL' + '</th>' + '</tr>' +
                                                    '<tr>' + '<td>' + 'DIS' + '</td>' + '<td>' + getdEncodingArr[i].Miles + ' km' + '</td>' + '</tr>' +
                                                    '<tr>' + '<td>' + 'TIME' + '</td>' + '<td>' + getdEncodingArr[i].SportsTime + '</td>' + '</tr>' +
                                                    '<tr>' + '<td>' + 'CALORIES' + '</td>' + '<td>' + getdEncodingArr[i].Cal + ' kcal' + '</td>' + '</tr>'
                                                );
                                                $('.showDayMessage3').append(
                                                    '<tr>' + '<th class="active">' + 'AVG' + '</th>' + '<th class="active">' + '</th>' + '<th class="active">' + 'MAX' + '</th>' + '</tr>' +
                                                    '<tr>' + '<td>' + getdEncodingArr[i].Watt + '</td>' + '<th>' + 'WATT' + '</th>' + '<td>' + getdEncodingArr[i].MaxWatt + '</td>' + '</tr>' +
                                                    '<tr>' + '<td>' + getdEncodingArr[i].AR + '</td>' + '<th>' + 'RPM' + '</th>' + '<td>' + getdEncodingArr[i].MaxR + '</td>' + '</tr>' +
                                                    '<tr>' + '<td>' + getdEncodingArr[i].AH + '</td>' + '<th>' + 'HR' + '</th>' + '<td>' + getdEncodingArr[i].MaxH + '</td>' + '</tr>'
                                                );
                                            });
                                        }
                                        let chartdata = {
                                            labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10",
                                                "11", "12", "13", "14", "15", "16", "17", "18", "19", "20",
                                                "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"
                                            ],
                                            datasets: [{
                                                label: 'Mile',
                                                backgroundColor: 'rgba(200,200,200,0.75)',
                                                borderColor: 'rgba(200,200,200,0.75)',
                                                hoverBackgroundColor: 'rgba(200,200,200,1)',
                                                hoverBorderColor: 'rgba(200,200,200,1)',
                                                animationEasing: "easeOutQuart",
                                                data: [getDayMile_1(), getDayMile_2(), getDayMile_3(), getDayMile_4(),
                                                    getDayMile_5(), getDayMile_6(), getDayMile_7(), getDayMile_8(),
                                                    getDayMile_9(), getDayMile_10(), getDayMile_11(), getDayMile_12(),
                                                    getDayMile_13(), getDayMile_14(), getDayMile_15(), getDayMile_16(),
                                                    getDayMile_17(), getDayMile_18(), getDayMile_19(), getDayMile_20(),
                                                    getDayMile_21(), getDayMile_22(), getDayMile_23(), getDayMile_24(),
                                                    getDayMile_25(), getDayMile_26(), getDayMile_27(), getDayMile_28(),
                                                    getDayMile_29(), getDayMile_30(), getDayMile_31()
                                                ]
                                            }]
                                        };
                                        let canvas = document.getElementById("mycanvasDay");
                                        let ctx = canvas.getContext("2d");
                                        let myNewChart = new Chart(ctx, {
                                            type: 'bar',
                                            data: chartdata
                                        });

                                    } else if (data.data.event == 'empty') {
                                        $('#myList').html('目前無任何一筆運動資訊');
                                    }
                                }).fail(function(xhr) {
                                    console.log('六月份錯誤');
                                });
                                break;
                            case '七月':
                                $.ajax({
                                    type: 'POST',
                                    url: 'http://54.214.111.32:9004/RtInfoSum/DateuClientID/GET/2017-07-01/2017-07-31/' + uClientID,
                                    dataType: 'json',
                                    data: {
                                        username: jsonObj.data.UserName,
                                        password: jsonObj.data.UserPassword,
                                        dEncoding: jsonObj.data.dEncoding
                                    },
                                    contentType: 'application/x-www-form-urlencoded; charset=utf-8',
                                    xhrFields: {
                                        withCredentials: true
                                    },
                                    crossDomain: true,
                                }).done(function(data) {
                                    console.log(data);
                                    $('#mycanvas').hide();
                                    if (!data.data.event) {
                                        console.log(data);

                                        let getdEncodingArr = [];
                                        for (let i in data.data.rows) {
                                            let getAllMonth = uJsonObj.data.rows[i].StartTime;
                                            getAllMonthStr = getAllMonth.slice(8, 10);
                                            switch (getAllMonthStr) {
                                                case '01':
                                                    dayMiel_1 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '02':
                                                    dayMiel_2 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '03':
                                                    dayMiel_3 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '04':
                                                    dayMiel_4 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '05':
                                                    dayMiel_5 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '06':
                                                    dayMiel_6 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '07':
                                                    dayMiel_7 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '08':
                                                    dayMiel_8 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '09':
                                                    dayMiel_9 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '10':
                                                    dayMiel_10 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '11':
                                                    dayMiel_11 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '12':
                                                    dayMiel_12 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '13':
                                                    dayMiel_13 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '14':
                                                    dayMiel_14 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '15':
                                                    dayMiel_15 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '16':
                                                    dayMiel_16 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '17':
                                                    dayMiel_17 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '18':
                                                    dayMiel_18 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '19':
                                                    dayMiel_19 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '20':
                                                    dayMiel_20 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '21':
                                                    dayMiel_21 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '22':
                                                    dayMiel_22 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '23':
                                                    dayMiel_23 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '24':
                                                    dayMiel_24 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '25':
                                                    dayMiel_25 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '26':
                                                    dayMiel_26 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '27':
                                                    dayMiel_27 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '28':
                                                    dayMiel_28 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '29':
                                                    dayMiel_29 += parseInt(adata.data.rows[i].Miles);
                                                    break;
                                                case '30':
                                                    dayMiel_30 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '31':
                                                    dayMiel_31 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                default:
                                                    console.log('error');
                                                    break;
                                            } //switch 結束
                                            let getDateForMune = data.data.rows[i].StartTime;
                                            let getYear = getDateForMune.slice(0, 4);
                                            let getMonth = getDateForMune.slice(5, 7);
                                            let getDate = getDateForMune.slice(8, 10);
                                            $('.showTextMune').html(
                                                '<p>' + getMonth + '月份共有 ' + data.data.rows.length + ' 筆運動資料。' + '</p>'
                                            );
                                            $('.showDate').html('<h1>' + getMonth + ' 月份的紀錄' + '</h1>');
                                            //在圖表下面秀出當月有幾筆的資料
                                            $('.showDayMessage').append(
                                                '<tr class="active searchDay">' + '<th>' + getYear + '/' + getMonth +
                                                '/' + getDate + '</th>' + '<th>' + data.data.rows[i].Miles + ' mile ' + '</th>' + '<th>' +
                                                data.data.rows[i].Cal + ' kcal ' + '</th>' + '<th>' + data.data.rows[i].Watt + ' w ' + '</th>' + '</tr>'
                                            );
                                            //把當月的總資料丟到一個array裡
                                            let getdEncoding = data.data.rows[i];
                                            getdEncodingArr[i] = getdEncoding;
                                            $('.searchDay').removeClass('searchDay').addClass('searchDay' + i);

                                        } // for in 結束

                                        //抓出使用者點哪一筆的日紀錄
                                        for (let i in getdEncodingArr) {
                                            let getDateForMune = data.data.rows[i].StartTime;
                                            let getMonth = getDateForMune.slice(5, 7);
                                            let getDate = getDateForMune.slice(8, 10);
                                            $('.searchDay' + i).on('click', function() {
                                                $('#mycanvasDay').hide();
                                                $('.monthMune ul').hide();
                                                $('.showDayMessage').hide();
                                                $('.showTextMune').hide();
                                                $('.showDate').html('<h1>' + '</h1>' + '<span>' + getMonth + '月' + getDate + '號' + '</span>' +
                                                    '<span>' + '詳細的運動資料。' + '</span>');
                                                $('.showDayMessage2').append(
                                                    '<tr>' + '<th class="active">' + '</th>' + '<th class="active">' + 'TOTAL' + '</th>' + '</tr>' +
                                                    '<tr>' + '<td>' + 'DIS' + '</td>' + '<td>' + getdEncodingArr[i].Miles + ' km' + '</td>' + '</tr>' +
                                                    '<tr>' + '<td>' + 'TIME' + '</td>' + '<td>' + getdEncodingArr[i].SportsTime + '</td>' + '</tr>' +
                                                    '<tr>' + '<td>' + 'CALORIES' + '</td>' + '<td>' + getdEncodingArr[i].Cal + ' kcal' + '</td>' + '</tr>'
                                                );
                                                $('.showDayMessage3').append(
                                                    '<tr>' + '<th class="active">' + 'AVG' + '</th>' + '<th class="active">' + '</th>' + '<th class="active">' + 'MAX' + '</th>' + '</tr>' +
                                                    '<tr>' + '<td>' + getdEncodingArr[i].Watt + '</td>' + '<th>' + 'WATT' + '</th>' + '<td>' + getdEncodingArr[i].MaxWatt + '</td>' + '</tr>' +
                                                    '<tr>' + '<td>' + getdEncodingArr[i].AR + '</td>' + '<th>' + 'RPM' + '</th>' + '<td>' + getdEncodingArr[i].MaxR + '</td>' + '</tr>' +
                                                    '<tr>' + '<td>' + getdEncodingArr[i].AH + '</td>' + '<th>' + 'HR' + '</th>' + '<td>' + getdEncodingArr[i].MaxH + '</td>' + '</tr>'
                                                );
                                            });
                                        }

                                        let chartdata = {
                                            labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10",
                                                "11", "12", "13", "14", "15", "16", "17", "18", "19", "20",
                                                "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"
                                            ],
                                            datasets: [{
                                                label: 'Mile',
                                                backgroundColor: 'rgba(200,200,200,0.75)',
                                                borderColor: 'rgba(200,200,200,0.75)',
                                                hoverBackgroundColor: 'rgba(200,200,200,1)',
                                                hoverBorderColor: 'rgba(200,200,200,1)',
                                                animationEasing: "easeOutQuart",
                                                data: [getDayMile_1(), getDayMile_2(), getDayMile_3(), getDayMile_4(),
                                                    getDayMile_5(), getDayMile_6(), getDayMile_7(), getDayMile_8(),
                                                    getDayMile_9(), getDayMile_10(), getDayMile_11(), getDayMile_12(),
                                                    getDayMile_13(), getDayMile_14(), getDayMile_15(), getDayMile_16(),
                                                    getDayMile_17(), getDayMile_18(), getDayMile_19(), getDayMile_20(),
                                                    getDayMile_21(), getDayMile_22(), getDayMile_23(), getDayMile_24(),
                                                    getDayMile_25(), getDayMile_26(), getDayMile_27(), getDayMile_28(),
                                                    getDayMile_29(), getDayMile_30(), getDayMile_31()
                                                ]
                                            }]
                                        };
                                        let canvas = document.getElementById("mycanvasDay");
                                        let ctx = canvas.getContext("2d");
                                        let myNewChart = new Chart(ctx, {
                                            type: 'bar',
                                            data: chartdata
                                        });

                                    } else if (data.data.event == 'empty') {
                                        $('#myList').html('目前無任何一筆運動資訊');
                                    }
                                }).fail(function(xhr) {
                                    console.log('七月份錯誤');
                                });
                                break;
                            case '八月':
                                $.ajax({
                                    type: 'POST',
                                    url: 'http://54.214.111.32:9004/RtInfoSum/DateuClientID/GET/2017-08-01/2017-08-31/' + uClientID,
                                    dataType: 'json',
                                    data: {
                                        username: jsonObj.data.UserName,
                                        password: jsonObj.data.UserPassword,
                                        dEncoding: jsonObj.data.dEncoding
                                    },
                                    contentType: 'application/x-www-form-urlencoded; charset=utf-8',
                                    xhrFields: {
                                        withCredentials: true
                                    },
                                    crossDomain: true,
                                }).done(function(data) {
                                    console.log(data);
                                    $('#mycanvas').hide();
                                    if (!data.data.event) {
                                        console.log(data);

                                        let getdEncodingArr = [];
                                        for (let i in data.data.rows) {
                                            let getAllMonth = uJsonObj.data.rows[i].StartTime;
                                            getAllMonthStr = getAllMonth.slice(8, 10);
                                            switch (getAllMonthStr) {
                                                case '01':
                                                    dayMiel_1 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '02':
                                                    dayMiel_2 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '03':
                                                    dayMiel_3 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '04':
                                                    dayMiel_4 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '05':
                                                    dayMiel_5 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '06':
                                                    dayMiel_6 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '07':
                                                    dayMiel_7 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '08':
                                                    dayMiel_8 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '09':
                                                    dayMiel_9 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '10':
                                                    dayMiel_10 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '11':
                                                    dayMiel_11 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '12':
                                                    dayMiel_12 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '13':
                                                    dayMiel_13 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '14':
                                                    dayMiel_14 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '15':
                                                    dayMiel_15 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '16':
                                                    dayMiel_16 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '17':
                                                    dayMiel_17 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '18':
                                                    dayMiel_18 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '19':
                                                    dayMiel_19 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '20':
                                                    dayMiel_20 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '21':
                                                    dayMiel_21 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '22':
                                                    dayMiel_22 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '23':
                                                    dayMiel_23 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '24':
                                                    dayMiel_24 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '25':
                                                    dayMiel_25 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '26':
                                                    dayMiel_26 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '27':
                                                    dayMiel_27 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '28':
                                                    dayMiel_28 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '29':
                                                    dayMiel_29 += parseInt(adata.data.rows[i].Miles);
                                                    break;
                                                case '30':
                                                    dayMiel_30 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '31':
                                                    dayMiel_31 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                default:
                                                    console.log('error');
                                                    break;
                                            } //switch 結束
                                            let getDateForMune = data.data.rows[i].StartTime;
                                            let getYear = getDateForMune.slice(0, 4);
                                            let getMonth = getDateForMune.slice(5, 7);
                                            let getDate = getDateForMune.slice(8, 10);
                                            $('.showTextMune').html(
                                                '<p>' + getMonth + '月份共有 ' + data.data.rows.length + ' 筆運動資料。' + '</p>'
                                            );
                                            $('.showDate').html('<h1>' + getMonth + ' 月份的紀錄' + '</h1>');
                                            //在圖表下面秀出當月有幾筆的資料
                                            $('.showDayMessage').append(
                                                '<tr class="active searchDay">' + '<th>' + getYear + '/' + getMonth +
                                                '/' + getDate + '</th>' + '<th>' + data.data.rows[i].Miles + ' mile ' + '</th>' + '<th>' +
                                                data.data.rows[i].Cal + ' kcal ' + '</th>' + '<th>' + data.data.rows[i].Watt + ' w ' + '</th>' + '</tr>'
                                            );
                                            //把當月的總資料丟到一個array裡
                                            let getdEncoding = data.data.rows[i];
                                            getdEncodingArr[i] = getdEncoding;
                                            $('.searchDay').removeClass('searchDay').addClass('searchDay' + i);

                                        } // for in 結束

                                        //抓出使用者點哪一筆的日紀錄
                                        for (let i in getdEncodingArr) {
                                            let getDateForMune = data.data.rows[i].StartTime;
                                            let getMonth = getDateForMune.slice(5, 7);
                                            let getDate = getDateForMune.slice(8, 10);
                                            $('.searchDay' + i).on('click', function() {
                                                $('#mycanvasDay').hide();
                                                $('.monthMune ul').hide();
                                                $('.showDayMessage').hide();
                                                $('.showTextMune').hide();
                                                $('.showDate').html('<h1>' + '</h1>' + '<span>' + getMonth + '月' + getDate + '號' + '</span>' +
                                                    '<span>' + '詳細的運動資料。' + '</span>');
                                                $('.showDayMessage2').append(
                                                    '<tr>' + '<th class="active">' + '</th>' + '<th class="active">' + 'TOTAL' + '</th>' + '</tr>' +
                                                    '<tr>' + '<td>' + 'DIS' + '</td>' + '<td>' + getdEncodingArr[i].Miles + ' km' + '</td>' + '</tr>' +
                                                    '<tr>' + '<td>' + 'TIME' + '</td>' + '<td>' + getdEncodingArr[i].SportsTime + '</td>' + '</tr>' +
                                                    '<tr>' + '<td>' + 'CALORIES' + '</td>' + '<td>' + getdEncodingArr[i].Cal + ' kcal' + '</td>' + '</tr>'
                                                );
                                                $('.showDayMessage3').append(
                                                    '<tr>' + '<th class="active">' + 'AVG' + '</th>' + '<th class="active">' + '</th>' + '<th class="active">' + 'MAX' + '</th>' + '</tr>' +
                                                    '<tr>' + '<td>' + getdEncodingArr[i].Watt + '</td>' + '<th>' + 'WATT' + '</th>' + '<td>' + getdEncodingArr[i].MaxWatt + '</td>' + '</tr>' +
                                                    '<tr>' + '<td>' + getdEncodingArr[i].AR + '</td>' + '<th>' + 'RPM' + '</th>' + '<td>' + getdEncodingArr[i].MaxR + '</td>' + '</tr>' +
                                                    '<tr>' + '<td>' + getdEncodingArr[i].AH + '</td>' + '<th>' + 'HR' + '</th>' + '<td>' + getdEncodingArr[i].MaxH + '</td>' + '</tr>'
                                                );
                                            });
                                        }

                                        let chartdata = {
                                            labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10",
                                                "11", "12", "13", "14", "15", "16", "17", "18", "19", "20",
                                                "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"
                                            ],
                                            datasets: [{
                                                label: 'Mile',
                                                backgroundColor: 'rgba(200,200,200,0.75)',
                                                borderColor: 'rgba(200,200,200,0.75)',
                                                hoverBackgroundColor: 'rgba(200,200,200,1)',
                                                hoverBorderColor: 'rgba(200,200,200,1)',
                                                animationEasing: "easeOutQuart",
                                                data: [getDayMile_1(), getDayMile_2(), getDayMile_3(), getDayMile_4(),
                                                    getDayMile_5(), getDayMile_6(), getDayMile_7(), getDayMile_8(),
                                                    getDayMile_9(), getDayMile_10(), getDayMile_11(), getDayMile_12(),
                                                    getDayMile_13(), getDayMile_14(), getDayMile_15(), getDayMile_16(),
                                                    getDayMile_17(), getDayMile_18(), getDayMile_19(), getDayMile_20(),
                                                    getDayMile_21(), getDayMile_22(), getDayMile_23(), getDayMile_24(),
                                                    getDayMile_25(), getDayMile_26(), getDayMile_27(), getDayMile_28(),
                                                    getDayMile_29(), getDayMile_30(), getDayMile_31()
                                                ]
                                            }]
                                        };
                                        let canvas = document.getElementById("mycanvasDay");
                                        let ctx = canvas.getContext("2d");
                                        let myNewChart = new Chart(ctx, {
                                            type: 'bar',
                                            data: chartdata
                                        });

                                    } else if (data.data.event == 'empty') {
                                        $('#myList').html('目前無任何一筆運動資訊');
                                    }
                                }).fail(function(xhr) {
                                    console.log('八月份錯誤');
                                });
                                break;
                            case '九月':
                                $.ajax({
                                    type: 'POST',
                                    url: 'http://54.214.111.32:9004/RtInfoSum/DateuClientID/GET/2017-09-01/2017-09-31/' + uClientID,
                                    dataType: 'json',
                                    data: {
                                        username: jsonObj.data.UserName,
                                        password: jsonObj.data.UserPassword,
                                        dEncoding: jsonObj.data.dEncoding
                                    },
                                    contentType: 'application/x-www-form-urlencoded; charset=utf-8',
                                    xhrFields: {
                                        withCredentials: true
                                    },
                                    crossDomain: true,
                                }).done(function(data) {
                                    console.log(data);
                                    $('#mycanvas').hide();
                                    if (!data.data.event) {
                                        console.log(data);

                                        let getdEncodingArr = [];
                                        for (let i in data.data.rows) {
                                            let getAllMonth = uJsonObj.data.rows[i].StartTime;
                                            getAllMonthStr = getAllMonth.slice(8, 10);
                                            switch (getAllMonthStr) {
                                                case '01':
                                                    dayMiel_1 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '02':
                                                    dayMiel_2 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '03':
                                                    dayMiel_3 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '04':
                                                    dayMiel_4 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '05':
                                                    dayMiel_5 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '06':
                                                    dayMiel_6 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '07':
                                                    dayMiel_7 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '08':
                                                    dayMiel_8 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '09':
                                                    dayMiel_9 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '10':
                                                    dayMiel_10 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '11':
                                                    dayMiel_11 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '12':
                                                    dayMiel_12 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '13':
                                                    dayMiel_13 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '14':
                                                    dayMiel_14 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '15':
                                                    dayMiel_15 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '16':
                                                    dayMiel_16 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '17':
                                                    dayMiel_17 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '18':
                                                    dayMiel_18 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '19':
                                                    dayMiel_19 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '20':
                                                    dayMiel_20 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '21':
                                                    dayMiel_21 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '22':
                                                    dayMiel_22 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '23':
                                                    dayMiel_23 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '24':
                                                    dayMiel_24 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '25':
                                                    dayMiel_25 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '26':
                                                    dayMiel_26 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '27':
                                                    dayMiel_27 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '28':
                                                    dayMiel_28 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '29':
                                                    dayMiel_29 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '30':
                                                    dayMiel_30 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '31':
                                                    dayMiel_31 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                default:
                                                    console.log('error');
                                                    break;
                                            } //switch 結束
                                            let getDateForMune = data.data.rows[i].StartTime;
                                            let getYear = getDateForMune.slice(0, 4);
                                            let getMonth = getDateForMune.slice(5, 7);
                                            let getDate = getDateForMune.slice(8, 10);
                                            $('.showTextMune').html(
                                                '<p>' + getMonth + '月份共有 ' + data.data.rows.length + ' 筆運動資料。' + '</p>'
                                            );
                                            $('.showDate').html('<h1>' + getMonth + ' 月份的紀錄' + '</h1>');
                                            //在圖表下面秀出當月有幾筆的資料
                                            $('.showDayMessage').append(
                                                '<tr class="active searchDay">' + '<th>' + getYear + '/' + getMonth +
                                                '/' + getDate + '</th>' + '<th>' + data.data.rows[i].Miles + ' mile ' + '</th>' + '<th>' +
                                                data.data.rows[i].Cal + ' kcal ' + '</th>' + '<th>' + data.data.rows[i].Watt + ' w ' + '</th>' + '</tr>'
                                            );
                                            //把當月的總資料丟到一個array裡
                                            let getdEncoding = data.data.rows[i];
                                            getdEncodingArr[i] = getdEncoding;
                                            $('.searchDay').removeClass('searchDay').addClass('searchDay' + i);

                                        } // for in 結束

                                        //抓出使用者點哪一筆的日紀錄
                                        for (let i in getdEncodingArr) {
                                            let getDateForMune = data.data.rows[i].StartTime;
                                            let getMonth = getDateForMune.slice(5, 7);
                                            let getDate = getDateForMune.slice(8, 10);
                                            $('.searchDay' + i).on('click', function() {
                                                $('#mycanvasDay').hide();
                                                $('.monthMune ul').hide();
                                                $('.showDayMessage').hide();
                                                $('.showTextMune').hide();
                                                $('.showDate').html('<h1>' + '</h1>' + '<span>' + getMonth + '月' + getDate + '號' + '</span>' +
                                                    '<span>' + '詳細的運動資料。' + '</span>');
                                                $('.showDayMessage2').append(
                                                    '<tr>' + '<th class="active">' + '</th>' + '<th class="active">' + 'TOTAL' + '</th>' + '</tr>' +
                                                    '<tr>' + '<td>' + 'DIS' + '</td>' + '<td>' + getdEncodingArr[i].Miles + ' km' + '</td>' + '</tr>' +
                                                    '<tr>' + '<td>' + 'TIME' + '</td>' + '<td>' + getdEncodingArr[i].SportsTime + '</td>' + '</tr>' +
                                                    '<tr>' + '<td>' + 'CALORIES' + '</td>' + '<td>' + getdEncodingArr[i].Cal + ' kcal' + '</td>' + '</tr>'
                                                );
                                                $('.showDayMessage3').append(
                                                    '<tr>' + '<th class="active">' + 'AVG' + '</th>' + '<th class="active">' + '</th>' + '<th class="active">' + 'MAX' + '</th>' + '</tr>' +
                                                    '<tr>' + '<td>' + getdEncodingArr[i].Watt + '</td>' + '<th>' + 'WATT' + '</th>' + '<td>' + getdEncodingArr[i].MaxWatt + '</td>' + '</tr>' +
                                                    '<tr>' + '<td>' + getdEncodingArr[i].AR + '</td>' + '<th>' + 'RPM' + '</th>' + '<td>' + getdEncodingArr[i].MaxR + '</td>' + '</tr>' +
                                                    '<tr>' + '<td>' + getdEncodingArr[i].AH + '</td>' + '<th>' + 'HR' + '</th>' + '<td>' + getdEncodingArr[i].MaxH + '</td>' + '</tr>'
                                                );
                                            });
                                        }

                                        let chartdata = {
                                            labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10",
                                                "11", "12", "13", "14", "15", "16", "17", "18", "19", "20",
                                                "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"
                                            ],
                                            datasets: [{
                                                label: 'Mile',
                                                backgroundColor: 'rgba(200,200,200,0.75)',
                                                borderColor: 'rgba(200,200,200,0.75)',
                                                hoverBackgroundColor: 'rgba(200,200,200,1)',
                                                hoverBorderColor: 'rgba(200,200,200,1)',
                                                animationEasing: "easeOutQuart",
                                                data: [getDayMile_1(), getDayMile_2(), getDayMile_3(), getDayMile_4(),
                                                    getDayMile_5(), getDayMile_6(), getDayMile_7(), getDayMile_8(),
                                                    getDayMile_9(), getDayMile_10(), getDayMile_11(), getDayMile_12(),
                                                    getDayMile_13(), getDayMile_14(), getDayMile_15(), getDayMile_16(),
                                                    getDayMile_17(), getDayMile_18(), getDayMile_19(), getDayMile_20(),
                                                    getDayMile_21(), getDayMile_22(), getDayMile_23(), getDayMile_24(),
                                                    getDayMile_25(), getDayMile_26(), getDayMile_27(), getDayMile_28(),
                                                    getDayMile_29(), getDayMile_30(), getDayMile_31()
                                                ]
                                            }]
                                        };
                                        let canvas = document.getElementById("mycanvasDay");
                                        let ctx = canvas.getContext("2d");
                                        let myNewChart = new Chart(ctx, {
                                            type: 'bar',
                                            data: chartdata
                                        });

                                    } else if (data.data.event == 'empty') {
                                        $('#myList').html('目前無任何一筆運動資訊');
                                    }
                                }).fail(function(xhr) {
                                    console.log('九月份錯誤');
                                });
                                break;
                            case '十月':
                                $.ajax({
                                    type: 'POST',
                                    url: 'http://54.214.111.32:9004/RtInfoSum/DateuClientID/GET/2017-10-01/2017-10-31/' + uClientID,
                                    dataType: 'json',
                                    data: {
                                        username: jsonObj.data.UserName,
                                        password: jsonObj.data.UserPassword,
                                        dEncoding: jsonObj.data.dEncoding
                                    },
                                    contentType: 'application/x-www-form-urlencoded; charset=utf-8',
                                    xhrFields: {
                                        withCredentials: true
                                    },
                                    crossDomain: true,
                                }).done(function(data) {
                                    console.log(data);
                                    $('#mycanvas').hide();
                                    if (!data.data.event) {
                                        console.log(data);

                                        let getdEncodingArr = [];
                                        for (let i in data.data.rows) {
                                            let getAllMonth = uJsonObj.data.rows[i].StartTime;
                                            getAllMonthStr = getAllMonth.slice(8, 10);
                                            switch (getAllMonthStr) {
                                                case '01':
                                                    dayMiel_1 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '02':
                                                    dayMiel_2 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '03':
                                                    dayMiel_3 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '04':
                                                    dayMiel_4 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '05':
                                                    dayMiel_5 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '06':
                                                    dayMiel_6 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '07':
                                                    dayMiel_7 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '08':
                                                    dayMiel_8 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '09':
                                                    dayMiel_9 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '10':
                                                    dayMiel_10 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '11':
                                                    dayMiel_11 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '12':
                                                    dayMiel_12 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '13':
                                                    dayMiel_13 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '14':
                                                    dayMiel_14 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '15':
                                                    dayMiel_15 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '16':
                                                    dayMiel_16 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '17':
                                                    dayMiel_17 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '18':
                                                    dayMiel_18 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '19':
                                                    dayMiel_19 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '20':
                                                    dayMiel_20 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '21':
                                                    dayMiel_21 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '22':
                                                    dayMiel_22 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '23':
                                                    dayMiel_23 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '24':
                                                    dayMiel_24 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '25':
                                                    dayMiel_25 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '26':
                                                    dayMiel_26 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '27':
                                                    dayMiel_27 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '28':
                                                    dayMiel_28 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '29':
                                                    dayMiel_29 += parseInt(adata.data.rows[i].Miles);
                                                    break;
                                                case '30':
                                                    dayMiel_30 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '31':
                                                    dayMiel_31 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                default:
                                                    console.log('error');
                                                    break;
                                            } //switch 結束
                                            let getDateForMune = data.data.rows[i].StartTime;
                                            let getYear = getDateForMune.slice(0, 4);
                                            let getMonth = getDateForMune.slice(5, 7);
                                            let getDate = getDateForMune.slice(8, 10);
                                            $('.showTextMune').html(
                                                '<p>' + getMonth + '月份共有 ' + data.data.rows.length + ' 筆運動資料。' + '</p>'
                                            );
                                            $('.showDate').html('<h1>' + getMonth + ' 月份的紀錄' + '</h1>');
                                            //在圖表下面秀出當月有幾筆的資料
                                            $('.showDayMessage').append(
                                                '<tr class="active searchDay">' + '<th>' + getYear + '/' + getMonth +
                                                '/' + getDate + '</th>' + '<th>' + data.data.rows[i].Miles + ' mile ' + '</th>' + '<th>' +
                                                data.data.rows[i].Cal + ' kcal ' + '</th>' + '<th>' + data.data.rows[i].Watt + ' w ' + '</th>' + '</tr>'
                                            );
                                            //把當月的總資料丟到一個array裡
                                            let getdEncoding = data.data.rows[i];
                                            getdEncodingArr[i] = getdEncoding;
                                            $('.searchDay').removeClass('searchDay').addClass('searchDay' + i);

                                        } // for in 結束
                                        //抓出使用者點哪一筆的日紀錄
                                        for (let i in getdEncodingArr) {
                                            let getDateForMune = data.data.rows[i].StartTime;
                                            let getMonth = getDateForMune.slice(5, 7);
                                            let getDate = getDateForMune.slice(8, 10);
                                            $('.searchDay' + i).on('click', function() {
                                                $('#mycanvasDay').hide();
                                                $('.monthMune ul').hide();
                                                $('.showDayMessage').hide();
                                                $('.showTextMune').hide();
                                                $('.showDate').html('<h1>' + '</h1>' + '<span>' + getMonth + '月' + getDate + '號' + '</span>' +
                                                    '<span>' + '詳細的運動資料。' + '</span>');
                                                $('.showDayMessage2').append(
                                                    '<tr>' + '<th class="active">' + '</th>' + '<th class="active">' + 'TOTAL' + '</th>' + '</tr>' +
                                                    '<tr>' + '<td>' + 'DIS' + '</td>' + '<td>' + getdEncodingArr[i].Miles + ' km' + '</td>' + '</tr>' +
                                                    '<tr>' + '<td>' + 'TIME' + '</td>' + '<td>' + getdEncodingArr[i].SportsTime + '</td>' + '</tr>' +
                                                    '<tr>' + '<td>' + 'CALORIES' + '</td>' + '<td>' + getdEncodingArr[i].Cal + ' kcal' + '</td>' + '</tr>'
                                                );
                                                $('.showDayMessage3').append(
                                                    '<tr>' + '<th class="active">' + 'AVG' + '</th>' + '<th class="active">' + '</th>' + '<th class="active">' + 'MAX' + '</th>' + '</tr>' +
                                                    '<tr>' + '<td>' + getdEncodingArr[i].Watt + '</td>' + '<th>' + 'WATT' + '</th>' + '<td>' + getdEncodingArr[i].MaxWatt + '</td>' + '</tr>' +
                                                    '<tr>' + '<td>' + getdEncodingArr[i].AR + '</td>' + '<th>' + 'RPM' + '</th>' + '<td>' + getdEncodingArr[i].MaxR + '</td>' + '</tr>' +
                                                    '<tr>' + '<td>' + getdEncodingArr[i].AH + '</td>' + '<th>' + 'HR' + '</th>' + '<td>' + getdEncodingArr[i].MaxH + '</td>' + '</tr>'
                                                );
                                            });
                                        }
                                        let chartdata = {
                                            labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10",
                                                "11", "12", "13", "14", "15", "16", "17", "18", "19", "20",
                                                "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"
                                            ],
                                            datasets: [{
                                                label: 'Mile',
                                                backgroundColor: 'rgba(200,200,200,0.75)',
                                                borderColor: 'rgba(200,200,200,0.75)',
                                                hoverBackgroundColor: 'rgba(200,200,200,1)',
                                                hoverBorderColor: 'rgba(200,200,200,1)',
                                                animationEasing: "easeOutQuart",
                                                data: [getDayMile_1(), getDayMile_2(), getDayMile_3(), getDayMile_4(),
                                                    getDayMile_5(), getDayMile_6(), getDayMile_7(), getDayMile_8(),
                                                    getDayMile_9(), getDayMile_10(), getDayMile_11(), getDayMile_12(),
                                                    getDayMile_13(), getDayMile_14(), getDayMile_15(), getDayMile_16(),
                                                    getDayMile_17(), getDayMile_18(), getDayMile_19(), getDayMile_20(),
                                                    getDayMile_21(), getDayMile_22(), getDayMile_23(), getDayMile_24(),
                                                    getDayMile_25(), getDayMile_26(), getDayMile_27(), getDayMile_28(),
                                                    getDayMile_29(), getDayMile_30(), getDayMile_31()
                                                ]
                                            }]
                                        };
                                        let canvas = document.getElementById("mycanvasDay");
                                        let ctx = canvas.getContext("2d");
                                        let myNewChart = new Chart(ctx, {
                                            type: 'bar',
                                            data: chartdata
                                        });

                                    } else if (data.data.event == 'empty') {
                                        $('#myList').html('目前無任何一筆運動資訊');
                                    }
                                }).fail(function(xhr) {
                                    console.log('十月份錯誤');
                                });
                                break;
                            case '十一月':
                                $.ajax({
                                    type: 'POST',
                                    url: 'http://54.214.111.32:9004/RtInfoSum/DateuClientID/GET/2017-11-01/2017-11-31/' + uClientID,
                                    dataType: 'json',
                                    data: {
                                        username: jsonObj.data.UserName,
                                        password: jsonObj.data.UserPassword,
                                        dEncoding: jsonObj.data.dEncoding
                                    },
                                    contentType: 'application/x-www-form-urlencoded; charset=utf-8',
                                    xhrFields: {
                                        withCredentials: true
                                    },
                                    crossDomain: true,
                                }).done(function(data) {
                                    console.log(data);
                                    $('#mycanvas').hide();
                                    if (!data.data.event) {
                                        console.log(data);

                                        let getdEncodingArr = [];
                                        for (let i in data.data.rows) {
                                            let getAllMonth = uJsonObj.data.rows[i].StartTime;
                                            getAllMonthStr = getAllMonth.slice(8, 10);
                                            switch (getAllMonthStr) {
                                                case '01':
                                                    dayMiel_1 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '02':
                                                    dayMiel_2 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '03':
                                                    dayMiel_3 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '04':
                                                    dayMiel_4 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '05':
                                                    dayMiel_5 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '06':
                                                    dayMiel_6 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '07':
                                                    dayMiel_7 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '08':
                                                    dayMiel_8 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '09':
                                                    dayMiel_9 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '10':
                                                    dayMiel_10 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '11':
                                                    dayMiel_11 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '12':
                                                    dayMiel_12 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '13':
                                                    dayMiel_13 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '14':
                                                    dayMiel_14 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '15':
                                                    dayMiel_15 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '16':
                                                    dayMiel_16 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '17':
                                                    dayMiel_17 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '18':
                                                    dayMiel_18 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '19':
                                                    dayMiel_19 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '20':
                                                    dayMiel_20 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '21':
                                                    dayMiel_21 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '22':
                                                    dayMiel_22 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '23':
                                                    dayMiel_23 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '24':
                                                    dayMiel_24 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '25':
                                                    dayMiel_25 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '26':
                                                    dayMiel_26 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '27':
                                                    dayMiel_27 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '28':
                                                    dayMiel_28 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '29':
                                                    dayMiel_29 += parseInt(adata.data.rows[i].Miles);
                                                    break;
                                                case '30':
                                                    dayMiel_30 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '31':
                                                    dayMiel_31 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                default:
                                                    console.log('error');
                                                    break;
                                            } //switch 結束
                                            let getDateForMune = data.data.rows[i].StartTime;
                                            let getYear = getDateForMune.slice(0, 4);
                                            let getMonth = getDateForMune.slice(5, 7);
                                            let getDate = getDateForMune.slice(8, 10);
                                            $('.showTextMune').html(
                                                '<p>' + getMonth + '月份共有 ' + data.data.rows.length + ' 筆運動資料。' + '</p>'
                                            );
                                            $('.showDate').html('<h1>' + getMonth + ' 月份的紀錄' + '</h1>');
                                            //在圖表下面秀出當月有幾筆的資料
                                            $('.showDayMessage').append(
                                                '<tr class="active searchDay">' + '<th>' + getYear + '/' + getMonth +
                                                '/' + getDate + '</th>' + '<th>' + data.data.rows[i].Miles + ' mile ' + '</th>' + '<th>' +
                                                data.data.rows[i].Cal + ' kcal ' + '</th>' + '<th>' + data.data.rows[i].Watt + ' w ' + '</th>' + '</tr>'
                                            );
                                            //把當月的總資料丟到一個array裡
                                            let getdEncoding = data.data.rows[i];
                                            getdEncodingArr[i] = getdEncoding;
                                            $('.searchDay').removeClass('searchDay').addClass('searchDay' + i);

                                        } // for in 結束

                                        //抓出使用者點哪一筆的日紀錄
                                        for (let i in getdEncodingArr) {
                                            let getDateForMune = data.data.rows[i].StartTime;
                                            let getMonth = getDateForMune.slice(5, 7);
                                            let getDate = getDateForMune.slice(8, 10);
                                            $('.searchDay' + i).on('click', function() {
                                                $('#mycanvasDay').hide();
                                                $('.monthMune ul').hide();
                                                $('.showDayMessage').hide();
                                                $('.showTextMune').hide();
                                                $('.showDate').html('<h1>' + '</h1>' + '<span>' + getMonth + '月' + getDate + '號' + '</span>' +
                                                    '<span>' + '詳細的運動資料。' + '</span>');
                                                $('.showDayMessage2').append(
                                                    '<tr>' + '<th class="active">' + '</th>' + '<th class="active">' + 'TOTAL' + '</th>' + '</tr>' +
                                                    '<tr>' + '<td>' + 'DIS' + '</td>' + '<td>' + getdEncodingArr[i].Miles + ' km' + '</td>' + '</tr>' +
                                                    '<tr>' + '<td>' + 'TIME' + '</td>' + '<td>' + getdEncodingArr[i].SportsTime + '</td>' + '</tr>' +
                                                    '<tr>' + '<td>' + 'CALORIES' + '</td>' + '<td>' + getdEncodingArr[i].Cal + ' kcal' + '</td>' + '</tr>'
                                                );
                                                $('.showDayMessage3').append(
                                                    '<tr>' + '<th class="active">' + 'AVG' + '</th>' + '<th class="active">' + '</th>' + '<th class="active">' + 'MAX' + '</th>' + '</tr>' +
                                                    '<tr>' + '<td>' + getdEncodingArr[i].Watt + '</td>' + '<th>' + 'WATT' + '</th>' + '<td>' + getdEncodingArr[i].MaxWatt + '</td>' + '</tr>' +
                                                    '<tr>' + '<td>' + getdEncodingArr[i].AR + '</td>' + '<th>' + 'RPM' + '</th>' + '<td>' + getdEncodingArr[i].MaxR + '</td>' + '</tr>' +
                                                    '<tr>' + '<td>' + getdEncodingArr[i].AH + '</td>' + '<th>' + 'HR' + '</th>' + '<td>' + getdEncodingArr[i].MaxH + '</td>' + '</tr>'
                                                );
                                            });
                                        }

                                        let chartdata = {
                                            labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10",
                                                "11", "12", "13", "14", "15", "16", "17", "18", "19", "20",
                                                "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"
                                            ],
                                            datasets: [{
                                                label: 'Mile',
                                                backgroundColor: 'rgba(200,200,200,0.75)',
                                                borderColor: 'rgba(200,200,200,0.75)',
                                                hoverBackgroundColor: 'rgba(200,200,200,1)',
                                                hoverBorderColor: 'rgba(200,200,200,1)',
                                                animationEasing: "easeOutQuart",
                                                data: [getDayMile_1(), getDayMile_2(), getDayMile_3(), getDayMile_4(),
                                                    getDayMile_5(), getDayMile_6(), getDayMile_7(), getDayMile_8(),
                                                    getDayMile_9(), getDayMile_10(), getDayMile_11(), getDayMile_12(),
                                                    getDayMile_13(), getDayMile_14(), getDayMile_15(), getDayMile_16(),
                                                    getDayMile_17(), getDayMile_18(), getDayMile_19(), getDayMile_20(),
                                                    getDayMile_21(), getDayMile_22(), getDayMile_23(), getDayMile_24(),
                                                    getDayMile_25(), getDayMile_26(), getDayMile_27(), getDayMile_28(),
                                                    getDayMile_29(), getDayMile_30(), getDayMile_31()
                                                ]
                                            }]
                                        };
                                        let canvas = document.getElementById("mycanvasDay");
                                        let ctx = canvas.getContext("2d");
                                        let myNewChart = new Chart(ctx, {
                                            type: 'bar',
                                            data: chartdata
                                        });

                                    } else if (data.data.event == 'empty') {
                                        $('#myList').html('目前無任何一筆運動資訊');
                                    }
                                }).fail(function(xhr) {
                                    console.log('十一月份錯誤');
                                });
                                break;
                            case '十二月':
                                $.ajax({
                                    type: 'POST',
                                    url: 'http://54.214.111.32:9004/RtInfoSum/DateuClientID/GET/2017-12-01/2017-12-31/' + uClientID,
                                    dataType: 'json',
                                    data: {
                                        username: jsonObj.data.UserName,
                                        password: jsonObj.data.UserPassword,
                                        dEncoding: jsonObj.data.dEncoding
                                    },
                                    contentType: 'application/x-www-form-urlencoded; charset=utf-8',
                                    xhrFields: {
                                        withCredentials: true
                                    },
                                    crossDomain: true,
                                }).done(function(data) {
                                    console.log(data);
                                    $('#mycanvas').hide();
                                    if (!data.data.event) {
                                        console.log(data);

                                        let getdEncodingArr = [];
                                        for (let i in data.data.rows) {
                                            let getAllMonth = uJsonObj.data.rows[i].StartTime;
                                            getAllMonthStr = getAllMonth.slice(8, 10);
                                            switch (getAllMonthStr) {
                                                case '01':
                                                    dayMiel_1 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '02':
                                                    dayMiel_2 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '03':
                                                    dayMiel_3 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '04':
                                                    dayMiel_4 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '05':
                                                    dayMiel_5 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '06':
                                                    dayMiel_6 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '07':
                                                    dayMiel_7 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '08':
                                                    dayMiel_8 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '09':
                                                    dayMiel_9 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '10':
                                                    dayMiel_10 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '11':
                                                    dayMiel_11 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '12':
                                                    dayMiel_12 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '13':
                                                    dayMiel_13 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '14':
                                                    dayMiel_14 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '15':
                                                    dayMiel_15 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '16':
                                                    dayMiel_16 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '17':
                                                    dayMiel_17 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '18':
                                                    dayMiel_18 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '19':
                                                    dayMiel_19 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '20':
                                                    dayMiel_20 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '21':
                                                    dayMiel_21 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '22':
                                                    dayMiel_22 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '23':
                                                    dayMiel_23 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '24':
                                                    dayMiel_24 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '25':
                                                    dayMiel_25 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '26':
                                                    dayMiel_26 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '27':
                                                    dayMiel_27 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '28':
                                                    dayMiel_28 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '29':
                                                    dayMiel_29 += parseInt(adata.data.rows[i].Miles);
                                                    break;
                                                case '30':
                                                    dayMiel_30 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                case '31':
                                                    dayMiel_31 += parseInt(data.data.rows[i].Miles);
                                                    break;
                                                default:
                                                    console.log('error');
                                                    break;
                                            } //switch 結束
                                            let getDateForMune = data.data.rows[i].StartTime;
                                            let getYear = getDateForMune.slice(0, 4);
                                            let getMonth = getDateForMune.slice(5, 7);
                                            let getDate = getDateForMune.slice(8, 10);
                                            $('.showTextMune').html(
                                                '<p>' + getMonth + '月份共有 ' + data.data.rows.length + ' 筆運動資料。' + '</p>'
                                            );
                                            $('.showDate').html('<h1>' + getMonth + ' 月份的紀錄' + '</h1>');
                                            //在圖表下面秀出當月有幾筆的資料
                                            $('.showDayMessage').append(
                                                '<tr class="active searchDay">' + '<th>' + getYear + '/' + getMonth +
                                                '/' + getDate + '</th>' + '<th>' + data.data.rows[i].Miles + ' mile ' + '</th>' + '<th>' +
                                                data.data.rows[i].Cal + ' kcal ' + '</th>' + '<th>' + data.data.rows[i].Watt + ' w ' + '</th>' + '</tr>'
                                            );
                                            //把當月的總資料丟到一個array裡
                                            let getdEncoding = data.data.rows[i];
                                            getdEncodingArr[i] = getdEncoding;
                                            $('.searchDay').removeClass('searchDay').addClass('searchDay' + i);

                                        } // for in 結束

                                        //抓出使用者點哪一筆的日紀錄
                                        for (let i in getdEncodingArr) {
                                            let getDateForMune = data.data.rows[i].StartTime;
                                            let getMonth = getDateForMune.slice(5, 7);
                                            let getDate = getDateForMune.slice(8, 10);
                                            $('.searchDay' + i).on('click', function() {
                                                $('#mycanvasDay').hide();
                                                $('.monthMune ul').hide();
                                                $('.showDayMessage').hide();
                                                $('.showTextMune').hide();
                                                $('.showDate').html('<h1>' + '</h1>' + '<span>' + getMonth + '月' + getDate + '號' + '</span>' +
                                                    '<span>' + '詳細的運動資料。' + '</span>');
                                                $('.showDayMessage2').append(
                                                    '<tr>' + '<th class="active">' + '</th>' + '<th class="active">' + 'TOTAL' + '</th>' + '</tr>' +
                                                    '<tr>' + '<td>' + 'DIS' + '</td>' + '<td>' + getdEncodingArr[i].Miles + ' km' + '</td>' + '</tr>' +
                                                    '<tr>' + '<td>' + 'TIME' + '</td>' + '<td>' + getdEncodingArr[i].SportsTime + '</td>' + '</tr>' +
                                                    '<tr>' + '<td>' + 'CALORIES' + '</td>' + '<td>' + getdEncodingArr[i].Cal + ' kcal' + '</td>' + '</tr>'
                                                );
                                                $('.showDayMessage3').append(
                                                    '<tr>' + '<th class="active">' + 'AVG' + '</th>' + '<th class="active">' + '</th>' + '<th class="active">' + 'MAX' + '</th>' + '</tr>' +
                                                    '<tr>' + '<td>' + getdEncodingArr[i].Watt + '</td>' + '<th>' + 'WATT' + '</th>' + '<td>' + getdEncodingArr[i].MaxWatt + '</td>' + '</tr>' +
                                                    '<tr>' + '<td>' + getdEncodingArr[i].AR + '</td>' + '<th>' + 'RPM' + '</th>' + '<td>' + getdEncodingArr[i].MaxR + '</td>' + '</tr>' +
                                                    '<tr>' + '<td>' + getdEncodingArr[i].AH + '</td>' + '<th>' + 'HR' + '</th>' + '<td>' + getdEncodingArr[i].MaxH + '</td>' + '</tr>'
                                                );
                                            });
                                        }

                                        let chartdata = {
                                            labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10",
                                                "11", "12", "13", "14", "15", "16", "17", "18", "19", "20",
                                                "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"
                                            ],
                                            datasets: [{
                                                label: 'Mile',
                                                backgroundColor: 'rgba(200,200,200,0.75)',
                                                borderColor: 'rgba(200,200,200,0.75)',
                                                hoverBackgroundColor: 'rgba(200,200,200,1)',
                                                hoverBorderColor: 'rgba(200,200,200,1)',
                                                animationEasing: "easeOutQuart",
                                                data: [getDayMile_1(), getDayMile_2(), getDayMile_3(), getDayMile_4(),
                                                    getDayMile_5(), getDayMile_6(), getDayMile_7(), getDayMile_8(),
                                                    getDayMile_9(), getDayMile_10(), getDayMile_11(), getDayMile_12(),
                                                    getDayMile_13(), getDayMile_14(), getDayMile_15(), getDayMile_16(),
                                                    getDayMile_17(), getDayMile_18(), getDayMile_19(), getDayMile_20(),
                                                    getDayMile_21(), getDayMile_22(), getDayMile_23(), getDayMile_24(),
                                                    getDayMile_25(), getDayMile_26(), getDayMile_27(), getDayMile_28(),
                                                    getDayMile_29(), getDayMile_30(), getDayMile_31()
                                                ]
                                            }]
                                        };
                                        let canvas = document.getElementById("mycanvasDay");
                                        let ctx = canvas.getContext("2d");
                                        let myNewChart = new Chart(ctx, {
                                            type: 'bar',
                                            data: chartdata
                                        });

                                    } else if (data.data.event == 'empty') {
                                        $('#myList').html('目前無任何一筆運動資訊');
                                    }
                                }).fail(function(xhr) {
                                    console.log('十二月份錯誤');
                                });
                                break;

                            default:
                                console.log('error');
                                break;
                        } //switch 結束
                    }; //點擊監聽事件結束

                    // }); //document.ready 結束
                } //內圈的 if 結束
                else if (uJsonObj.data.event == 'empty') {
                    $('#myList').html('目前無任何一筆運動資訊');
                } // else if 結束
            }) //.done 結束
            .fail(function(xhr) {
                console.log(xhr.status);
            }); //fail 結束
        return false;
    } //外圈的if 結束
    else {
        window.location.href = '../index.html';
    } //else 結束
});

/*
=======================================================
跳轉個人基本資料就秀出資料
=======================================================
*/
let showProfile = function() {
    //先檢查是否有 cookie ，如果沒有就跳回登入頁面
    if ($.cookie('logCookie')) {
        let jsonObj = JSON.parse($.cookie('logCookie'));
        if (jsonObj.result === 'true') {
            $('.showProfile').append(
                '<p>' + '姓名： ' + jsonObj.data.UserName + '</p>' +
                '<p>' + '性別： ' + jsonObj.data.uSex + '</p>' +
                '<p>' + '年齡： ' + jsonObj.data.uAge + '</p>' +
                '<p>' + '身高： ' + jsonObj.data.uHeight + '</p>' +
                '<p>' + '體重： ' + jsonObj.data.uWeight + '</p>'
            );
        }
    } else {
        window.location.href = '../index.html';
    }
};

/*
=======================================================
登出
=======================================================
*/
$(function() {
    $('.logOut').on('click', function() {
        $.removeCookie('logCookie', {
            expires: -1,
            path: '/'
        });
        console.log($.cookie('logCookie'));
        console.log($.removeCookie('logCookie'));
    });
});