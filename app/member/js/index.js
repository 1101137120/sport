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
var getHref = location.href.pathname;
//console.log(getHref);
var url = "http://54.214.111.32:9004/";
//取得整年份的運動資料
var getD = new Date();
var getY = getD.getFullYear();
var urlSearch = location.search.split("=")[1];
//console.log(urlSearch);
if (urlSearch === undefined) {
  //console.log("hi");
  urlSearch = getY;
}
function getAllData(cb) {
  var showCookie = getCookie();
  $.ajax({
    type: "POST",
    url:
      url +
      "api/rtInfoSum/" +
      showCookie.uClientID +
      "/" +
      urlSearch +
      "-01-01/" +
      urlSearch +
      "-12-31",
    dataType: "json",
    data: {
      username: showCookie.userName,
      token: showCookie.token
    },
    contentType: "application/x-www-form-urlencoded; charset=utf-8",
    crossDomain: true,
    xhrFields: {
      withCredentials: true
    },
    beforeSend: function() {
      $(".spinner").show();
    },
    complete: function() {
      $(".spinner").remove();
    }
  }).done(function(data) {
    //console.log(data);
    cb(null, data);
  });
}
//取得每個月份的所有運動資料
function getAllSportData() {
  var showCookie = getCookie();
  getAllData(function(err, data) {
    if (err) {
      // console.log(err);
    }
    // console.log(data);
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
    const allMonthData = [
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
    ];
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
    // console.log(getMonthMileTotal);
    // console.log(allMonthData);
    let chartdata = {
      labels: [
        "一月",
        "二月",
        "三月",
        "四月",
        "五月",
        "六月",
        "七月",
        "八月",
        "九月",
        "十月",
        "十一月",
        "十二月"
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

    $(".showYear").append(
      "<h1>年紀錄 <small class='changeYear'><i class='fa fa-arrow-circle-o-left' aria-hidden='true'></i> " +
        urlSearch +
        " <i class='fa fa-arrow-circle-o-right' aria-hidden='true'></small></h1>"
    );
    $(".fa-arrow-circle-o-left").on("click", function() {
      $(".changeYear").html(
        "<i class='fa fa-arrow-circle-o-left' aria-hidden='true'></i> " +
          --urlSearch +
          " <i class='fa fa-arrow-circle-o-right' aria-hidden='true'>"
      );
      location.href = "index.html?year=" + urlSearch;
    });
    $(".fa-arrow-circle-o-right").on("click", function() {
      $(".changeYear").html(
        "<i class='fa fa-arrow-circle-o-left' aria-hidden='true'></i> " +
          ++urlSearch +
          " <i class='fa fa-arrow-circle-o-right' aria-hidden='true'>"
      );
      location.href = "index.html?year=" + urlSearch;
    });
    var showTab = "";
    showTab += '<li class="active">';
    showTab +=
      '<a href="#home" data-toggle="tab"><i class="fa fa-line-chart" aria-hidden="true"></i> 圖示</a>';
    showTab += "</li>";
    showTab += "<li>";
    showTab +=
      '<li><a href="#profile" data-toggle="tab"><i class="fa fa-list-ul" aria-hidden="true"></i> 例表</a>';
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
    var arr = [];
    // console.log(getDate);
    // console.log(allMonthData.sepData[0]);
    allMonthData.forEach(function(data, index) {
      if (data.mile > 1) {
        arr.push(data);
        if (arr.length > 1) {
          arr.shift();
        }
      }
      // switch (data > 1) {
      //   case 8:
      //     setMonthData(augData);
      //     break;
      //   case 9:
      //     setMonthData(sepData);
      //     break;
      //   case 10:
      //     setMonthData(octData);
      //     break;
      //   case 11:
      //     setMonthData(novData);
      //     break;
      //   case 12:
      //     setMonthData(decData);
      //     break;
      // }
    });
    setMonthData(arr[0]);
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
      $("#graphdiv").html("");
      // 監聽 user 點柱狀圖裡的哪個月份後進入 switch ，然後再進入 setMonthData function 帶月份跟資料兩個參數得到運動資料
      switch (label) {
        case "一月":
          $(".showDayMessage2").html("");
          $(".showDayMessage3").html("");
          $(".showDay").html("");
          setMonthData(janData);
          break;
        case "二月":
          $(".showDayMessage2").html("");
          $(".showDayMessage3").html("");
          $(".showDay").html("");
          setMonthData(febData);
          break;
        case "三月":
          $(".showDayMessage2").html("");
          $(".showDayMessage3").html("");
          $(".showDay").html("");
          setMonthData(marData);
          break;
        case "四月":
          $(".showDayMessage2").html("");
          $(".showDayMessage3").html("");
          $(".showDay").html("");
          setMonthData(aprData);
          break;
        case "五月":
          $(".showDayMessage2").html("");
          $(".showDayMessage3").html("");
          $(".showDay").html("");
          setMonthData(mayData);
          break;
        case "六月":
          $(".showDayMessage2").html("");
          $(".showDayMessage3").html("");
          $(".showDay").html("");
          setMonthData(junData);
          break;
        case "七月":
          $(".showDayMessage2").html("");
          $(".showDayMessage3").html("");
          $(".showDay").html("");
          setMonthData(julData);
          break;
        case "八月":
          $(".showDayMessage2").html("");
          $(".showDayMessage3").html("");
          $(".showDay").html("");
          setMonthData(augData);
          break;
        case "九月":
          $(".showDayMessage2").html("");
          $(".showDayMessage3").html("");
          $(".showDay").html("");
          setMonthData(sepData);
          break;
        case "十月":
          $(".showDayMessage2").html("");
          $(".showDayMessage3").html("");
          $(".showDay").html("");
          setMonthData(octData);
          break;
        case "十一月":
          $(".showDayMessage2").html("");
          $(".showDayMessage3").html("");
          $(".showDay").html("");
          setMonthData(novData);
          break;
        case "十二月":
          $(".showDayMessage2").html("");
          $(".showDayMessage3").html("");
          $(".showDay").html("");
          setMonthData(decData);
          break;
        default:
          //console.log("no");
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
  // 20171103 修改架構 - 讓 ui 的使用者點選每日記錄日期由大到小
  // let sortDate = "";
  // sortDate = getdEncodingArr.sort(function(a, b) {
  //   return b.StartTime > a.StartTime ? 1 : -1;
  // });
  // 判斷這個月有沒有運動資料
  if (month === undefined || month.data.length === 0) {
    // console.log(month);
    $(".showMonth").html("沒有運動資料");
    $("#mycanvasDay").hide();
    $("#graphdiv").hide();
    $(".nav-tabs").hide();
    $(".mouseOver .row").css({ overflow: "hidden", height: "0px" });
    return;
  }
  let sortDateForTable = month.data.sort(function(a, b) {
    return b.StartTime > a.StartTime ? 1 : -1;
  });
  // console.log(sortDateForTable);
  for (var i in sortDateForTable) {
    // console.log(sortDate[i]);
    var monthDoubleDay = sortDateForTable[i].StartTime.slice(8, 10);
    //console.log(monthDoubleDay);
    switch (monthDoubleDay) {
      case "01":
        day1 += parseInt(sortDateForTable[i].distT);
        break;
      case "02":
        day2 += parseInt(sortDateForTable[i].distT);
        break;
      case "03":
        day3 += parseInt(sortDateForTable[i].distT);
        break;
      case "04":
        day4 += parseInt(sortDateForTable[i].distT);
        break;
      case "05":
        day5 += parseInt(sortDateForTable[i].distT);
        break;
      case "06":
        day6 += parseInt(sortDateForTable[i].distT);
        break;
      case "07":
        day7 += parseInt(sortDateForTable[i].distT);
        break;
      case "08":
        day8 += parseInt(sortDateForTable[i].distT);
        break;
      case "09":
        day9 += parseInt(sortDateForTable[i].distT);
        break;
      case "10":
        day10 += parseInt(sortDateForTable[i].distT);
        break;
      case "11":
        day11 += parseInt(sortDateForTable[i].distT);
        break;
      case "12":
        day12 += parseInt(sortDateForTable[i].distT);
        break;
      case "13":
        day13 += parseInt(sortDateForTable[i].distT);
        break;
      case "14":
        day14 += parseInt(sortDateForTable[i].distT);
        break;
      case "15":
        day15 += parseInt(sortDateForTable[i].distT);
        break;
      case "16":
        day16 += parseInt(sortDateForTable[i].distT);
        break;
      case "17":
        day17 += parseInt(sortDateForTable[i].distT);
        break;
      case "18":
        day18 += parseInt(sortDateForTable[i].distT);
        break;
      case "19":
        day19 += parseInt(sortDateForTable[i].distT);
        break;
      case "20":
        day20 += parseInt(sortDateForTable[i].distT);
        break;
      case "21":
        day21 += parseInt(sortDateForTable[i].distT);
        break;
      case "22":
        day22 += parseInt(sortDateForTable[i].distT);
        break;
      case "23":
        day23 += parseInt(sortDateForTable[i].distT);
        break;
      case "24":
        day24 += parseInt(sortDateForTable[i].distT);
        break;
      case "25":
        day25 += parseInt(sortDateForTable[i].distT);
        break;
      case "26":
        day26 += parseInt(sortDateForTable[i].distT);
        break;
      case "27":
        day27 += parseInt(sortDateForTable[i].distT);
        break;
      case "28":
        day28 += parseInt(sortDateForTable[i].distT);
        break;
      case "29":
        day29 += parseInt(sortDateForTable[i].distT);
        break;
      case "30":
        day30 += parseInt(sortDateForTable[i].distT);
        break;
      case "31":
        day31 += parseInt(sortDateForTable[i].distT);
        break;
    } // inside switch
    let getAllDay = sortDateForTable[i].StartTime;
    let getYear = getAllDay.slice(0, 4);
    let getMonth = getAllDay.slice(5, 7);
    let getDate = getAllDay.slice(8, 10);
    let getHoursAndMinAndSec = getAllDay.slice(11);
    let getdEncoding = sortDateForTable[i];
    getdEncodingArr[i] = getdEncoding;
    function getSportTime() {
      var theSecond = parseInt(getdEncodingArr[i].sTimeT % 60);
      var theMinute = parseInt((getdEncodingArr[i].sTimeT / 60) % 60);
      var theHour = parseInt(getdEncodingArr[i].sTimeT / 60 / 60);
      var result = "" + parseInt(theSecond) + " 秒";
      if (theMinute > 0) {
        result = "" + parseInt(theMinute) + " 分 " + result;
      }
      if (theHour > 0) {
        result = "" + parseInt(theHour) + " 小時 " + result;
      }
      return result;
    }

    $(".mouseOver .row").css({ overflow: "scroll", height: "400px" });
    $(".showTextMune").html(
      "<p>" +
        getMonth +
        "月份共有 " +
        sortDateForTable.length +
        " 筆運動資料</p>"
    );
    $(".showMonth").html("<h1>" + getMonth + " 月份的紀錄</h1>");
    $(".showDayMessage").append(
      '<tr class="active searchDay"><th>' +
        getYear +
        "/" +
        getMonth +
        "/" +
        getDate +
        " " +
        getHoursAndMinAndSec +
        "</th><th>" +
        sortDateForTable[i].distT +
        ' <span class="font">mile</span> </th><th>' +
        sortDateForTable[i].calT +
        ' <span class="font">kcal</span> </th><th>' +
        getSportTime() +
        " </th></tr>"
    );
    // console.log("該月共有幾筆的詳細資料： ", getdEncodingArr);
    $(".searchDay")
      .removeClass("searchDay")
      .addClass("searchDay" + i);
  } // for
  //console.log("月份的所有運動資訊", getdEncodingArr);
  /**
   * 進到畫面就秀出所有的運動資料，且最新一筆的詳細資料
   */
  //20170822 修改流程，讓 user 進來後就顯示全部的資料和最新一筆的詳細資訊
  $("#graphdiv").show();
  $(".nav-tabs").show();
  // var i = getdEncodingArr.length;
  // console.log("最新一筆的詳細資訊", getdEncodingArr[i]);
  function formatSeconds() {
    var theSecond = parseInt(getdEncodingArr[0].sTimeT % 60);
    var theMinute = parseInt((getdEncodingArr[0].sTimeT / 60) % 60);
    var theHour = parseInt(getdEncodingArr[0].sTimeT / 60 / 60);
    var result = "" + parseInt(theSecond) + " 秒";
    if (theMinute > 0) {
      result = "" + parseInt(theMinute) + " 分 " + result;
    }
    if (theHour > 0) {
      result = "" + parseInt(theHour) + " 小時 " + result;
    }
    return result;
  }
  $(".showDay").html(
    "<p>" +
      getdEncodingArr[0].StartTime.slice(5, 7) +
      "月" +
      getdEncodingArr[0].StartTime.slice(8, 10) +
      "號詳細的運動資料</p>"
  );
  $(".showDayMessage2").html(
    '<tr><th class="active"></th><th class="active"><span class="font">TOTAL</span></' +
      'th></tr><tr><td><span class="font">DISTANCE</span></td><td>' +
      getdEncodingArr[0].distT +
      ' <span class="font">km</span></td></tr><tr><td><span class="font">TIME</span></t' +
      "d><td>" +
      formatSeconds() +
      '</td></tr><tr><td><span class="font">CALORIES</span></td><td>' +
      getdEncodingArr[0].calT +
      ' <span class="font">kcal</span></td></tr>'
  );
  $(".showDayMessage3").html(
    '<tr><th class="active"><span class="font">AVG</span></th><th class="active"></th' +
      '><th class="active"><span class="font">MAX</span></th></tr><tr><td>' +
      getdEncodingArr[0].wattAvg +
      '</td><th><span class="font">WATT</span></th><td>' +
      getdEncodingArr[0].wattMax +
      "</td></tr><tr><td>" +
      getdEncodingArr[0].rpmAvg +
      '</td><th><span class="font">RPM</span></th><td>' +
      getdEncodingArr[0].rpmMax +
      "</td></tr><tr><td>" +
      getdEncodingArr[0].speedAvg +
      '</td><th><span class="font">SPEED</span></th><td>' +
      getdEncodingArr[0].speedMax +
      "</td></tr><tr><td>" +
      getdEncodingArr[0].hrAvg +
      '</td><th><span class="font">HR</span></th><td>' +
      getdEncodingArr[0].hrMax +
      "</td></tr>"
  );
  $(".showRound").html("");
  $.ajax({
    type: "POST",
    url: url + "api/rtInfo/GET",
    data: {
      username: showCookie.userName,
      token: showCookie.token,
      SportsInfoID: getdEncodingArr[0].SportsInfoID
    },
    beforeSend: function() {
      $(".showRound").html('<div class="cp-spinner cp-round"></div>');
    },
    complete: function() {
      $(".showRound").html("");
    }
  }).done(function(sportInfoData) {
    //console.log("取得該筆 id 的每秒運動資料： ", sportInfoData);
    var getInfoData = [];
    if (sportInfoData.data.event === "empty") {
      $(".showRound").html("");
      getInfoData.push([0, 0, 0, 0]);
      var g = new Dygraph(document.getElementById("graphdiv"), getInfoData, {
        labels: ["秒", "心跳", "瓦特", "速度"],
        showRangeSelector: true, // 圖表下面的選取範圍
        rangeSelectorPlotFillColor: "#000", // 選取範圍的顏色
        // legend: "always", // 狀態一直存在 ex： 心跳、轉速
        animatedZooms: true,
        // logscale: true,
        highlightSeriesBackgroundAlpha: 0.4,
        highlightSeriesBackgroundColor: "#fff",
        highlightSeriesOpts: {
          strokeWidth: 2
        },
        axes: {
          y: {
            drawAxis: true
          }
        },
        colors: ["#ff0079", "#01aeae", "#cbcb00"]
      });
      $(document).on("shown.bs.tab", 'a[data-toggle="tab"]', function(e) {
        g.resize(); // resize dygraph
      });
    }
    sportInfoData.data.rows.forEach(function(data, index) {
      getInfoData.push([
        index,
        parseInt(data.rtHR),
        parseInt(data.rtWatt),
        parseInt(data.rtSpeed)
      ]);
    });
    var g = new Dygraph(document.getElementById("graphdiv"), getInfoData, {
      labels: ["秒", "心跳", "瓦特", "速度"],
      showRangeSelector: true, // 圖表下面的選取範圍
      rangeSelectorPlotFillColor: "#000", // 選取範圍的顏色
      // legend: "always", // 狀態一直存在 ex： 心跳、轉速
      animatedZooms: true,
      // logscale: true,
      highlightSeriesBackgroundAlpha: 0.4,
      highlightSeriesBackgroundColor: "#fff",
      highlightSeriesOpts: {
        strokeWidth: 2
      },
      axes: {
        y: {
          drawAxis: true
        }
      },
      colors: ["#ff0079", "#01aeae", "#cbcb00"]
    });
    $(document).on("shown.bs.tab", 'a[data-toggle="tab"]', function(e) {
      g.resize(); // resize dygraph
    });
  });

  //結束
  //抓出使用者點哪一筆的日紀錄

  // 20171103 修改架構 - 讓 ui 的使用者點選每日記錄日期由大到小
  let sortDate = "";
  sortDate = getdEncodingArr.sort(function(a, b) {
    return b.StartTime > a.StartTime ? 1 : -1;
  });
  for (let i in sortDate) {
    let getDateForMune = sortDateForTable[i].StartTime;
    let getMonth = getDateForMune.slice(5, 7);
    let getDate = getDateForMune.slice(8, 10);
    // 運算詳細資料裡的運動時間
    function formatSeconds(value) {
      var theSecond = parseInt(sortDate[i].sTimeT % 60);
      var theMinute = parseInt((sortDate[i].sTimeT / 60) % 60);
      var theHour = parseInt(sortDate[i].sTimeT / 60 / 60);
      var result = "" + parseInt(theSecond) + " 秒";
      if (theMinute > 0) {
        result = "" + parseInt(theMinute) + " 分 " + result;
      }
      if (theHour > 0) {
        result = "" + parseInt(theHour) + " 小時 " + result;
      }
      return result;
    }
    $(".searchDay" + i).on("click", function() {
      /**
       * 因 ie 無法使用 let 新語法關係，而改成看使用者點擊哪一個 className 來判斷
       * 做法是 .searchDay 這個 className 後面都有加上 i ，所以用 slice() 來取 className 的 i 來判斷使用者點擊哪一筆的資料
       */
      let $thisClassName = this.className.slice(16);
      $(".showDay").html(
        "<p>" + getMonth + "月" + getDate + "號詳細的運動資料</p>"
      );
      $(".showDayMessage2").html("");
      $(".showDayMessage3").html("");
      $("#graphdiv").html("");
      $(".showAnimated")
        .hide()
        .fadeIn(300);
      var showDayMsg = "";
      showDayMsg +=
        '<tr><th class="active"></th><th class="active"><span class="font">TOTAL</span></th></tr>';
      showDayMsg +=
        '<tr><td><span class="font">DISTANCE</span></td><td>' +
        getdEncodingArr[$thisClassName].distT +
        ' <span class="font">km</span></td></tr>';
      showDayMsg +=
        '<tr><td><span class="font">TIME</span></td><td>' +
        formatSeconds(getdEncodingArr[$thisClassName].sTimeT) +
        "</td></tr>";
      showDayMsg +=
        '<tr><td><span class="font">CALORIES</span></td><td>' +
        getdEncodingArr[$thisClassName].calT +
        ' <span class="font">kcal</span></td></tr>';
      $(".showDayMessage2").html(showDayMsg);
      var showDayMsgOfRight = "";
      showDayMsgOfRight +=
        '<tr><th class="active"><span class="font">AVG</span></th><th class="active"></th><th class="active"><span class="font">MAX</span></th></tr>';
      showDayMsgOfRight +=
        "<tr><td>" +
        getdEncodingArr[$thisClassName].wattAvg +
        '</td><th><span class="font">WATT</span></th>';
      showDayMsgOfRight +=
        "<td>" + getdEncodingArr[$thisClassName].wattMax + "</td></tr>";
      showDayMsgOfRight +=
        "<tr><td>" +
        getdEncodingArr[$thisClassName].rpmAvg +
        '</td><th><span class="font">RPM</span></th><td>' +
        getdEncodingArr[$thisClassName].rpmMax +
        "</td></tr>";
      showDayMsgOfRight +=
        "<tr><td>" +
        getdEncodingArr[$thisClassName].speedAvg +
        '</td><th><span class="font">SPEED</span></th><td>' +
        getdEncodingArr[$thisClassName].speedMax +
        "</td></tr>";
      showDayMsgOfRight +=
        "<tr><td>" +
        getdEncodingArr[$thisClassName].hrAvg +
        '</td><th><span class="font">HR</span></th><td>' +
        getdEncodingArr[$thisClassName].hrMax +
        '</td></tr>"';
      $(".showDayMessage3").html(showDayMsgOfRight);
      //console.log("點選跑出sportID",getdEncodingArr[$thisClassName].SportsInfoID);
      $.ajax({
        type: "POST",
        url: url + "api/rtInfo/GET",
        data: {
          username: showCookie.userName,
          token: showCookie.token,
          SportsInfoID: getdEncodingArr[$thisClassName].SportsInfoID
        },
        beforeSend: function() {
          $(".showRound").html('<div class="cp-spinner cp-round"></div>');
        },
        complete: function() {
          $(".showRound").html("");
        }
      }).done(function(sportInfoData) {
        //console.log("取得該筆 id 的每秒運動資料： ", sportInfoData);
        var getInfoData = [];
        if (sportInfoData.data.event === "empty") {
          $(".showRound").html("");
          getInfoData.push([0, 0, 0, 0]);
          var g = new Dygraph(
            document.getElementById("graphdiv"),
            getInfoData,
            {
              labels: ["秒", "心跳", "瓦特", "速度"],
              showRangeSelector: true, // 圖表下面的選取範圍
              rangeSelectorPlotFillColor: "#000", // 選取範圍的顏色
              // legend: "always", // 狀態一直存在 ex： 心跳、轉速
              animatedZooms: true,
              // logscale: true,
              highlightSeriesBackgroundAlpha: 0.4,
              highlightSeriesBackgroundColor: "#fff",
              highlightSeriesOpts: {
                strokeWidth: 2
              },
              axes: {
                y: {
                  drawAxis: true
                }
              },
              colors: ["#ff0079", "#01aeae", "#cbcb00"]
            }
          );
          $(document).on("shown.bs.tab", 'a[data-toggle="tab"]', function(e) {
            g.resize(); // resize dygraph
          });
        }

        sportInfoData.data.rows.forEach(function(data, index) {
          getInfoData.push([
            index,
            parseInt(data.rtHR),
            parseInt(data.rtWatt),
            parseInt(data.rtSpeed)
          ]);
        });
        var g = new Dygraph(document.getElementById("graphdiv"), getInfoData, {
          labels: ["秒", "心跳", "瓦特", "速度"],
          showRangeSelector: true, // 圖表下面的選取範圍
          rangeSelectorPlotFillColor: "#000", // 選取範圍的顏色
          // legend: "always", // 狀態一直存在 ex： 心跳、轉速
          animatedZooms: true,
          // logscale: true,
          highlightSeriesBackgroundAlpha: 0.4,
          highlightSeriesBackgroundColor: "#fff",
          highlightSeriesOpts: {
            strokeWidth: 2
          },
          axes: {
            y: {
              drawAxis: true
            }
          },
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
    // console.log(jsonObj);
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
        // console.log(data);
        var getProfile = "";
        getProfile += "<h1>個人基本資料</h1>";
        getProfile += "<p>姓名： " + data.data.detail[0].uCName + "</p>";
        getProfile += "<p>性別： " + data.data.detail[0].uSex + "</p>";
        getProfile += "<p>生日： " + data.data.detail[0].uBirthD + "</p>";
        getProfile += "<p>身高： " + data.data.detail[0].uHeight + "</p>";
        getProfile += "<p>體重： " + data.data.detail[0].uWeight + "</p>";
        $(".showProfile").append(getProfile);
      });
      $.ajax({
        type: "POST",
        url: "http://54.214.111.32:9004/api/profileGetIp",
        dataType: "json",
        data: {
          username: jsonObj.userName,
          token: jsonObj.token
        },
        contentType: "application/x-www-form-urlencoded; charset=utf-8"
      }).done(function(dataIP) {
        // console.log(dataIP);
        var dataColumns = "";
        dataColumns += "<thead>";
        dataColumns += "<tr>";
        dataColumns += "<th data-type='date'>登入日期</th>";
        dataColumns += "<th>IP 位置</th>";
        dataColumns += "</tr>";
        dataColumns += "</thead>";
        $(".tableListForProfile").footable({
          columns: $(".tableListForProfile").html(dataColumns),
          row: dataIP.data.detail.forEach(function(value) {
            var dataRow = "";
            var date = value.dateTime.split("T");
            var time = date[1].split(".000Z")[0];
            dataRow += "<tr><td>" + date[0] + "</td>";
            dataRow += "<td>" + value.conreadd.split("::ffff:")[1] + "</td>";
            dataRow += "</tr>";
            $(".showDataForIP table").append(dataRow);
          })
        });
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
  });
}

$(function() {
  userLogOut();
  showProfile();
  getAllSportData();
  // console.log($.cookie("logCookie"));
  if ($.cookie("logCookie") === "undefined") {
    var stateObj = { test: "123" };
    history.pushState(stateObj, "new Page", "bar.html");
    window.location.href = "../index.html";
  }
});
