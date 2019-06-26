/*jshint esversion: 6 */
/*jshint loopfunc: true */

// 取得 user 的 cookie
function getCookie() {
  const userData = JSON.parse($.cookie("logCookie"));
  return userData;
}
/*
=======================================================
進入畫面自動取得年紀錄
=======================================================
*/
var url = "http://54.214.111.32:9004/";
//取得整年份的運動資料
function getAllData(cb) {
  var showCookie = getCookie();
  $.ajax({
    type: "POST",
    url:
      url + "api/rtInfoSum/" + showCookie.uClientID + "/2017-01-01/2017-12-31",
    dataType: "json",
    data: {
      username: showCookie.userName,
      token: showCookie.token
    },
    contentType: "application/x-www-form-urlencoded; charset=utf-8",
    crossDomain: true,
    xhrFields: {
      withCredentials: true
    }
  }).done(function(data) {
    console.log(data);
    cb(null, data);
  });
}

//取得每個月份的所有運動資料
function getAllSportData() {
  var showCookie = getCookie();
  getAllData(function(err, data) {
    if (err) {
      console.log(err);
    }
    console.log(data);
    let janData = {
      mile: 0,
      data: []
    };
    let febData = {
      mile: 0,
      data: []
    };
    let marData = {
      mile: 0,
      data: []
    };
    let aprData = {
      mile: 0,
      data: []
    };
    let mayData = {
      mile: 0,
      data: []
    };
    let junData = {
      mile: 0,
      data: []
    };
    let julData = {
      mile: 0,
      data: []
    };
    let augData = {
      mile: 0,
      data: []
    };
    let sepData = {
      mile: 0,
      data: []
    };
    let octData = {
      mile: 0,
      data: []
    };
    let novData = {
      mile: 0,
      data: []
    };
    let decData = {
      mile: 0,
      data: []
    };
    for (var i in data.data.rows) {
      switch (data.data.rows[i].StartTime.slice(5, 7)) {
        case "01":
          janData.data.push(data.data.rows[i]);
          janData.mile += parseInt(data.data.rows[i].distT);
          break;
        case "02":
          febData.data.push(data.data.rows[i]);
          febData.mile += parseInt(data.data.rows[i].distT);
          break;
        case "03":
          marData.data.push(data.data.rows[i]);
          marData.mile += parseInt(data.data.rows[i].distT);
          break;
        case "04":
          aprData.data.push(data.data.rows[i]);
          aprData.mile += parseInt(data.data.rows[i].distT);
          break;
        case "05":
          mayData.data.push(data.data.rows[i]);
          mayData.mile += parseInt(data.data.rows[i].distT);
          break;
        case "06":
          junData.data.push(data.data.rows[i]);
          junData.mile += parseInt(data.data.rows[i].distT);
          break;
        case "07":
          julData.data.push(data.data.rows[i]);
          julData.mile += parseInt(data.data.rows[i].distT);
          break;
        case "08":
          augData.data.push(data.data.rows[i]);
          augData.mile += parseInt(data.data.rows[i].distT);
          break;
        case "09":
          sepData.data.push(data.data.rows[i]);
          sepData.mile += parseInt(data.data.rows[i].distT);
          break;
        case "10":
          octData.data.push(data.data.rows[i]);
          octData.mile += parseInt(data.data.rows[i].distT);
          break;
        case "11":
          novData.data.push(data.data.rows[i]);
          novData.mile += parseInt(data.data.rows[i].distT);
          break;
        case "12":
          decData.data.push(data.data.rows[i]);
          decData.mile += parseInt(data.data.rows[i].distT);
          break;
      }
    }
    const allMonthData = {
      janData,
      febData,
      marData,
      aprData,
      mayData,
      junData,
      julData,
      augData,
      sepData,
      octData,
      novData,
      decData
    };
    const getMonthMileTotal = [
      janData.mile,
      febData.mile,
      marData.mile,
      aprData.mile,
      mayData.mile,
      junData.mile,
      julData.mile,
      augData.mile,
      sepData.mile,
      octData.mile,
      novData.mile,
      decData.mile
    ];
    console.log(getMonthMileTotal);
    console.log(allMonthData);
    let chartdata = {
      labels: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
      ],
      datasets: [
        {
          label: "Mile",
          backgroundColor: "#6b767e",
          borderColor: "#fff",
          hoverBackgroundColor: "#405463",
          hoverBorderColor: "#405463",
          animationEasing: "easeOutQuart",
          data: getMonthMileTotal
        }
      ]
    }; //chartdata 結束

    $(".showYear").append("<h1>2017</h1>");
    var showTab = "";
    showTab += '<li class="active">';
    showTab +=
      '<a href="#home" data-toggle="tab"><i class="fa fa-line-chart" aria-hidden="true"></i></a>';
    showTab += "</li>";
    showTab += "<li>";
    showTab +=
      '<li><a href="#profile" data-toggle="tab"><i class="fa fa-list-ul" aria-hidden="true"></i></a>';
    showTab += "</li>";
    $(".nav-tabs").html(showTab);
    let canvas = document.getElementById("mycanvas");
    let ctx = canvas.getContext("2d");
    let myNewChart = new Chart(ctx, {
      type: "bar",
      data: chartdata,
      options: {
        scales: {
          yAxes: [
            {
              gridLines: {
                color: "#646464"
              }
            }
          ],
          xAxes: [
            {
              gridLines: {
                color: "#646464"
              }
            }
          ]
        }
      }
    });
    // 因 20170822 開會決定更改流程一進到畫面就 show 出全部的資料和最新一筆的詳細資料
    var getDate = new Date().getMonth() + 1;
    console.log(getDate);
    switch (getDate) {
      case 8:
        setMonthData(augData);
        break;
      case 9:
        setMonthData(sepData);
        break;
    }
    // 結束
    canvas.onclick = function(evt) {
      let activePoints = myNewChart.getElementsAtEvent(evt);
      let chartData = activePoints[0]["_chart"].config.data;
      let idx = activePoints[0]["_index"];
      let label = chartData.labels[idx];
      let value = chartData.datasets[0].data[idx];
      $(".monthMune ul").html("");
      $(".showDayMessage").html("");
      $(".showTextMune").html("");
      $("#mycanvasDay").show();
      $(".monthMune ul").show();
      $(".showDayMessage").show();
      $(".showTextMune").show();
      // 監聽 user 點柱狀圖裡的哪個月份後進入 switch ，然後再進入 setMonthData function 帶月份參數得到運動資料
      switch (label) {
        case "Jan":
          $(".showDayMessage2").html("");
          $(".showDayMessage3").html("");
          $(".showDay").html("");
          setMonthData(janData);
          break;
        case "Jul":
          $(".showDayMessage2").html("");
          $(".showDayMessage3").html("");
          $(".showDay").html("");
          setMonthData(julData);
          break;
        case "Aug":
          $(".showDayMessage2").html("");
          $(".showDayMessage3").html("");
          $(".showDay").html("");
          setMonthData(augData);
          break;
        case "Sep":
          $(".showDayMessage2").html("");
          $(".showDayMessage3").html("");
          $(".showDay").html("");
          setMonthData(sepData);
        default:
          console.log("no");
          break;
      } // outside switch
    };
  });
}
// 這個 function 是抓 user 點哪個月份資料
function setMonthData(month) {
  var showCookie = getCookie();
  // console.log('該月有幾筆運動資料： ',month.data.length);
  let day1 = 0;
  let day2 = 0;
  let day3 = 0;
  let day4 = 0;
  let day5 = 0;
  let day6 = 0;
  let day7 = 0;
  let day8 = 0;
  let day9 = 0;
  let day10 = 0;
  let day11 = 0;
  let day12 = 0;
  let day13 = 0;
  let day14 = 0;
  let day15 = 0;
  let day16 = 0;
  let day17 = 0;
  let day18 = 0;
  let day19 = 0;
  let day20 = 0;
  let day21 = 0;
  let day22 = 0;
  let day23 = 0;
  let day24 = 0;
  let day25 = 0;
  let day26 = 0;
  let day27 = 0;
  let day28 = 0;
  let day29 = 0;
  let day30 = 0;
  let day31 = 0;
  let getdEncodingArr = [];
  // 判斷這個月有沒有運動資料
  if (month.data.length === 0) {
    console.log(month);
    $(".showMonth").html("No sports information");
    $("#mycanvasDay").hide();
    $(".mouseOver .row").css({ overflow: "hidden", height: "0px" });
    return;
  }
  for (var i in month.data) {
    var monthDoubleDay = month.data[i].StartTime.slice(8, 10);
    switch (monthDoubleDay) {
      case "01":
        day1 += parseInt(month.data[i].distT);
        break;
      case "02":
        day2 += parseInt(month.data[i].distT);
        break;
      case "03":
        day3 += parseInt(month.data[i].distT);
        break;
      case "04":
        day4 += parseInt(month.data[i].distT);
        break;
      case "05":
        day5 += parseInt(month.data[i].distT);
        break;
      case "06":
        day6 += parseInt(month.data[i].distT);
        break;
      case "07":
        day7 += parseInt(month.data[i].distT);
        break;
      case "08":
        day8 += parseInt(month.data[i].distT);
        break;
      case "09":
        day9 += parseInt(month.data[i].distT);
        break;
      case "10":
        day10 += parseInt(month.data[i].distT);
        break;
      case "11":
        day11 += parseInt(month.data[i].distT);
        break;
      case "12":
        day12 += parseInt(month.data[i].distT);
        break;
      case "13":
        day13 += parseInt(month.data[i].distT);
        break;
      case "14":
        day14 += parseInt(month.data[i].distT);
        break;
      case "15":
        day15 += parseInt(month.data[i].distT);
        break;
      case "16":
        day16 += parseInt(month.data[i].distT);
        break;
      case "17":
        day17 += parseInt(month.data[i].distT);
        break;
      case "18":
        day18 += parseInt(month.data[i].distT);
        break;
      case "19":
        day19 += parseInt(month.data[i].distT);
        break;
      case "20":
        day20 += parseInt(month.data[i].distT);
        break;
      case "21":
        day21 += parseInt(month.data[i].distT);
        break;
      case "22":
        day22 += parseInt(month.data[i].distT);
        break;
      case "23":
        day23 += parseInt(month.data[i].distT);
        break;
      case "24":
        day24 += parseInt(month.data[i].distT);
        break;
      case "25":
        day25 += parseInt(month.data[i].distT);
        break;
      case "26":
        day26 += parseInt(month.data[i].distT);
        break;
      case "27":
        day27 += parseInt(month.data[i].distT);
        break;
      case "28":
        day28 += parseInt(month.data[i].distT);
        break;
      case "29":
        day29 += parseInt(month.data[i].distT);
        break;
      case "30":
        day30 += parseInt(month.data[i].distT);
        break;
      case "31":
        day31 += parseInt(month.data[i].distT);
        break;
    } // inside switch
    let getAllDay = month.data[i].StartTime;
    let getYear = getAllDay.slice(0, 4);
    let getMonth = getAllDay.slice(5, 7);
    let getDate = getAllDay.slice(8, 10);
    $(".mouseOver .row").css({ overflow: "scroll", height: "400px" });
    $(".showTextMune").html(
      "<p>There are " +
        month.data.length +
        " sport information data of " +
        getMonth +
        "</p>"
    );
    $(".showMonth").html("<h1>Records of " + getMonth + "</h1>");
    $(".showDayMessage").append(
      '<tr class="active searchDay"><th>' +
        getYear +
        "/" +
        getMonth +
        "/" +
        getDate +
        "</th><th>" +
        month.data[i].distT +
        ' <span class="font">mile</span> </th><th>' +
        month.data[i].calT +
        ' <span class="font">kcal</span> </th><th>' +
        month.data[i].wattT +
        ' <span class="font">w</span> </th></tr>'
    );
    let getdEncoding = month.data[i];
    getdEncodingArr[i] = getdEncoding;
    // console.log("該月共有幾筆的詳細資料： ", getdEncodingArr);
    $(".searchDay").removeClass("searchDay").addClass("searchDay" + i);
  } // for
  console.log("月份的所有運動資訊", getdEncodingArr);
  /**
 * 進到畫面就秀出所有的運動資料，且最新一筆的詳細資料
 */
  //20170822 修改流程，讓 user 進來後就顯示全部的資料和最新一筆的詳細資訊
  var getLastData = getdEncodingArr.length - 1;
  console.log(getdEncodingArr[getLastData]);
  function formatSeconds(value) {
    var theSecond = parseInt(getdEncodingArr[getLastData].sTimeT / 2 % 60);
    var theMinute = parseInt(getdEncodingArr[getLastData].sTimeT / 2 / 60 % 60);
    var theHour = parseInt(getdEncodingArr[getLastData].sTimeT / 2 / 60 / 60);
    var result = "" + parseInt(theSecond) + " s";
    if (theMinute > 0) {
      result = "" + parseInt(theMinute) + " m " + result;
    }
    if (theHour > 0) {
      result = "" + parseInt(theHour) + " h " + result;
    }
    return result;
  }
  $(".showDay").html(
    "<p>Detailed sport information on " +
      getdEncodingArr[getLastData].StartTime.slice(8, 10) +
      "th of " +
      getdEncodingArr[getLastData].StartTime.slice(5, 7) +
      "</p>"
  );
  $(".showDayMessage2").html(
    '<tr><th class="active"></th><th class="active"><span class="font">TOTAL</span></' +
      'th></tr><tr><td><span class="font">DISTANCE</span></td><td>' +
      getdEncodingArr[getLastData].distT +
      ' <span class="font">km</span></td></tr><tr><td><span class="font">TIME</span></t' +
      "d><td>" +
      formatSeconds(getdEncodingArr[getLastData].sTimeT) +
      '</td></tr><tr><td><span class="font">CALORIES</span></td><td>' +
      getdEncodingArr[getLastData].calT +
      ' <span class="font">kcal</span></td></tr>'
  );
  $(".showDayMessage3").html(
    '<tr><th class="active"><span class="font">AVG</span></th><th class="active"></th' +
      '><th class="active"><span class="font">MAX</span></th></tr><tr><td>' +
      getdEncodingArr[getLastData].wattAvg +
      '</td><th><span class="font">WATT</span></th><td>' +
      getdEncodingArr[getLastData].wattMax +
      "</td></tr><tr><td>" +
      getdEncodingArr[getLastData].rpmAvg +
      '</td><th><span class="font">RPM</span></th><td>' +
      getdEncodingArr[getLastData].rpmMax +
      "</td></tr><tr><td>" +
      getdEncodingArr[getLastData].speedAvg +
      '</td><th><span class="font">SPEED</span></th><td>' +
      getdEncodingArr[getLastData].speedMax +
      "</td></tr><tr><td>" +
      getdEncodingArr[getLastData].hrAvg +
      '</td><th><span class="font">HR</span></th><td>' +
      getdEncodingArr[getLastData].hrMax +
      "</td></tr>"
  );
  $(".showRound").html("");
  $.ajax({
    type: "POST",
    url: url + "api/rtInfo/GET",
    data: {
      username: showCookie.userName,
      token: showCookie.token,
      SportsInfoID: getdEncodingArr[getLastData].SportsInfoID
    }
  }).done(function(sportInfoData) {
    console.log("取得該筆 id 的每秒運動資料： ", sportInfoData);
    var getInfoData = [];

    sportInfoData.data.rows.forEach(function(data, index) {
      getInfoData.push([
        index,
        parseInt(data.rtHR),
        parseInt(data.rtWatt),
        parseInt(data.rtSpeed)
      ]);
    });
    var g = new Dygraph(document.getElementById("graphdiv"), getInfoData, {
      labels: ["秒", "Heart rate", "Watt", "Speed"],
      showRangeSelector: true, // 圖表下面的選取範圍
      rangeSelectorPlotFillColor: "#646464", // 選取範圍的顏色
      legend: "always", // 狀態一直存在 ex： 心跳、轉速
      animatedZooms: true,
      colors: ["#ff0079", "#01aeae", "#cbcb00"]
    });
  });

  //結束
  //抓出使用者點哪一筆的日紀錄
  for (let i in getdEncodingArr) {
    let getDateForMune = month.data[i].StartTime;
    let getMonth = getDateForMune.slice(5, 7);
    let getDate = getDateForMune.slice(8, 10);
    // 運算詳細資料裡的運動時間
    function formatSeconds(value) {
      var theSecond = parseInt(getdEncodingArr[i].sTimeT / 2 % 60);
      var theMinute = parseInt(getdEncodingArr[i].sTimeT / 2 / 60 % 60);
      var theHour = parseInt(getdEncodingArr[i].sTimeT / 2 / 60 / 60);
      var result = "" + parseInt(theSecond) + " s";
      if (theMinute > 0) {
        result = "" + parseInt(theMinute) + " m " + result;
      }
      if (theHour > 0) {
        result = "" + parseInt(theHour) + " h " + result;
      }
      return result;
    }
    $(".searchDay" + i).on("click", function() {
      $(".showDay").html(
        "<p>Detailed sport information on " +
          getDate +
          "th of " +
          getMonth +
          "</p>"
      );
      $(".showDayMessage2").html("");
      $(".showDayMessage3").html("");
      $("#graphdiv").html("");
      $(".showAnimated").hide().fadeIn(300);
      var showDayMsg = "";
      showDayMsg +=
        '<tr><th class="active"></th><th class="active"><span class="font">TOTAL</span></th></tr>';
      showDayMsg +=
        '<tr><td><span class="font">DISTANCE</span></td><td>' +
        getdEncodingArr[i].distT +
        ' <span class="font">km</span></td></tr>';
      showDayMsg +=
        '<tr><td><span class="font">TIME</span></td><td>' +
        formatSeconds(getdEncodingArr[i].sTimeT) +
        "</td></tr>";
      showDayMsg +=
        '<tr><td><span class="font">CALORIES</span></td><td>' +
        getdEncodingArr[i].calT +
        ' <span class="font">kcal</span></td></tr>';
      $(".showDayMessage2").html(showDayMsg);
      var showDayMsgOfRight = "";
      showDayMsgOfRight +=
        '<tr><th class="active"><span class="font">AVG</span></th><th class="active"></th><th class="active"><span class="font">MAX</span></th></tr>';
      showDayMsgOfRight +=
        "<tr><td>" +
        getdEncodingArr[i].wattAvg +
        '</td><th><span class="font">WATT</span></th>';
      showDayMsgOfRight += "<td>" + getdEncodingArr[i].wattMax + "</td></tr>";
      showDayMsgOfRight +=
        "<tr><td>" +
        getdEncodingArr[i].rpmAvg +
        '</td><th><span class="font">RPM</span></th><td>' +
        getdEncodingArr[i].rpmMax +
        "</td></tr>";
      showDayMsgOfRight +=
        "<tr><td>" +
        getdEncodingArr[i].speedAvg +
        '</td><th><span class="font">SPEED</span></th><td>' +
        getdEncodingArr[i].speedMax +
        "</td></tr>";
      showDayMsgOfRight +=
        "<tr><td>" +
        getdEncodingArr[i].hrAvg +
        '</td><th><span class="font">HR</span></th><td>' +
        getdEncodingArr[i].hrMax +
        '</td></tr>"';
      $(".showDayMessage3").html(showDayMsgOfRight);
      console.log("點選跑出sportID", getdEncodingArr[i].SportsInfoID);
      $.ajax({
        type: "POST",
        url: url + "api/rtInfo/GET",
        data: {
          username: showCookie.userName,
          token: showCookie.token,
          SportsInfoID: getdEncodingArr[i].SportsInfoID
        },
        beforeSend: function() {
          $(".showRound").html('<div class="cp-spinner cp-round"></div>');
        },
        complete: function() {
          $(".showRound").html("");
        }
      }).done(function(sportInfoData) {
        console.log("取得該筆 id 的每秒運動資料： ", sportInfoData);
        var getInfoData = [];

        sportInfoData.data.rows.forEach(function(data, index) {
          getInfoData.push([
            index,
            parseInt(data.rtHR),
            parseInt(data.rtWatt),
            parseInt(data.rtSpeed)
          ]);
        });
        var g = new Dygraph(document.getElementById("graphdiv"), getInfoData, {
          labels: ["s", "Heart rate", "Watt", "Speed"],
          showRangeSelector: true, // 圖表下面的選取範圍
          rangeSelectorPlotFillColor: "#646464", // 選取範圍的顏色
          legend: "always", // 狀態一直存在 ex： 心跳、轉速
          animatedZooms: true,
          colors: ["#ff0079", "#01aeae", "#cbcb00"]
        });
        // 因為使用 bootstrap tab 的關係會導致 dygraph 這個 library 不知道 div 的寬度多少，會出現 bug (圖無法顯示)
        // 所以用這個 resize() 補救
        $(document).on("shown.bs.tab", 'a[data-toggle="tab"]', function(e) {
          g.resize(); // resize dygraph
        });
      });
    });
  }
  let chart = {
    labels: [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "11",
      "12",
      "13",
      "14",
      "15",
      "16",
      "17",
      "18",
      "19",
      "20",
      "21",
      "22",
      "23",
      "24",
      "25",
      "26",
      "27",
      "28",
      "29",
      "30",
      "31"
    ],
    datasets: [
      {
        label: "Mile",
        backgroundColor: "#6b767e",
        borderColor: "#fff",
        hoverBackgroundColor: "#405463",
        hoverBorderColor: "#405463",
        animationEasing: "easeOutQuart",
        data: [
          day1,
          day2,
          day3,
          day4,
          day5,
          day6,
          day7,
          day8,
          day9,
          day10,
          day11,
          day12,
          day13,
          day14,
          day15,
          day16,
          day17,
          day18,
          day19,
          day20,
          day21,
          day22,
          day23,
          day24,
          day25,
          day26,
          day27,
          day28,
          day29,
          day30,
          day31
        ]
      }
    ]
  };
  $(".showMonthOfDay").html('<canvas id="mycanvasDay"></canvas>');
  let canvas = document.getElementById("mycanvasDay");
  let ctx = canvas.getContext("2d");
  let myNewChartJul = new Chart(ctx, {
    type: "bar",
    data: chart,
    options: {
      scales: {
        yAxes: [
          {
            gridLines: {
              color: "#646464"
            }
          }
        ],
        xAxes: [
          {
            gridLines: {
              color: "#646464"
            }
          }
        ]
      }
    }
  });
}
// user 查看個人資料的 method
function showProfile() {
  //先檢查是否有 cookie ，如果沒有就跳回登入頁面
  if ($.cookie("logCookie")) {
    let jsonObj = JSON.parse($.cookie("logCookie"));
    console.log(jsonObj);
    if (jsonObj.token) {
      $.ajax({
        type: "POST",
        url: "http://54.214.111.32:9004/api/profileGet",
        dataType: "json",
        data: {
          token: jsonObj.token,
          username: jsonObj.userName
        },
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        xhrFields: {
          withCredentials: true
        },
        crossDomain: true
      }).done(function(data) {
        console.log(data);
        var getProfile = "";
        getProfile += "<p>Name： " + data.data.detail[0].uCName + "</p>";
        getProfile += "<p>Sex： " + data.data.detail[0].uSex + "</p>";
        getProfile += "<p>Birthday： " + data.data.detail[0].uBirthD + "</p>";
        getProfile += "<p>Height： " + data.data.detail[0].uHeight + "</p>";
        getProfile += "<p>Weight： " + data.data.detail[0].uWeight + "</p>";
        $(".showProfile").append(getProfile);
      });
    }
  } else {
    window.location.href = "../index.html";
  }
}

// 會員登出 function
function userLogOut() {
  $(".logOut").on("click", function() {
    $.removeCookie("logCookie", {
      expires: -1,
      path: "/"
    });
    console.log($.cookie("logCookie"));
    console.log($.removeCookie("logCookie"));
  });
}

$(function() {
  userLogOut();
  showProfile();
  getAllSportData();
  console.log($.cookie("logCookie"));
  if ($.cookie("logCookie") === "undefined") {
    var stateObj = { test: "123" };
    history.pushState(stateObj, "new Page", "bar.html");
    window.location.href = "../index.html";
  }
});
