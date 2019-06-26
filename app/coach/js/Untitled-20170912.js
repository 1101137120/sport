// 教練登出 function
function userLogOut() {
  $(".logOut").on("click", function() {
    $.removeCookie("coachCookie", {
      expires: -1,
      path: "/"
    });
    console.log($.cookie("coachCookie"));
    console.log($.removeCookie("coachCookie"));
  });
}

//以 cookie 來判斷是否可以進到主頁面

function checkCookie() {
  if ($.cookie("coachCookie")) {
    console.log($.cookie("coachCookie"));
  } else {
    window.location.href = "../index.html";
  }
}

// user 查看個人資料的 method
function showProfile() {
  //先檢查是否有 cookie ，如果沒有就跳回登入頁面
  if ($.cookie("coachCookie")) {
    let coachCookie = JSON.parse($.cookie("coachCookie"));
    console.log("取得cookie：", coachCookie);
    if (coachCookie.token) {
      $.ajax({
        type: "POST",
        url: "http://54.214.111.32:9004/api/profileGet",
        dataType: "json",
        data: {
          token: coachCookie.token,
          username: coachCookie.userName
        },
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        xhrFields: {
          withCredentials: true
        },
        crossDomain: true
      }).done(function(data) {
        console.log("取得個人資訊：", data);
        var getProfile = "";
        getProfile += "<p>姓名： " + data.data.detail[0].uCName + "</p>";
        getProfile += "<p>性別： " + data.data.detail[0].uSex + "</p>";
        getProfile += "<p>生日： " + data.data.detail[0].uBirthD + "</p>";
        getProfile += "<p>身高： " + data.data.detail[0].uHeight + "</p>";
        getProfile += "<p>體重： " + data.data.detail[0].uWeight + "</p>";
        $(".showProfile").append(getProfile);
      });
    }
  } else {
    window.location.href = "../index.html";
  }
}

$(function() {
  /*
  function test(className, data) {
    var width = 200,
      height = 200,
      barSpacing = 30,
      barWidth = width / 3 - barSpacing,
      barsHeight = height - 30,
      unit = "";
    var y = d3.scale
      .linear()
      .domain([0, d3.max(data)])
      .range([0, barsHeight]);

    var x = d3.scale
      .ordinal()
      .domain(["Speed", "Mile", "Resistance"])
      .rangeRoundBands([-1, width + 1]);

    var xAxis = d3.svg
      .axis()
      .scale(x)
      .orient("bottom");

    var svg = d3
      .select("." + className)
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    var bar = svg
      .selectAll(".bars")
      .data(data)
      .enter()
      .append("g")
      .attr("class", function(d, i) {
        return "bar bar-" + i.toString();
      })
      .attr("transform", function(d) {
        return (
          "translate(" + barSpacing / 2 + ", -" + (height - barsHeight) + ")"
        );
      });

    bar
      .append("rect")
      .attr("height", function(d) {
        return y(d);
      })
      .attr("y", function(d) {
        return height - y(d);
      })
      .attr("width", barWidth)
      .attr("x", function(d, i) {
        return i * barWidth + i * barSpacing;
      });

    bar
      .append("text")
      .attr("x", function(d, i) {
        return barWidth / 2 + barWidth * i + barSpacing * i;
      })
      .attr("y", function(d) {
        if (y(d3.max(data)) / 10 > y(d)) {
          return height - y(d) - 30;
        } else {
          return height - y(d) / 2;
        }
      })
      .attr("class", function(d) {
        if (y(d3.max(data)) / 10 > y(d)) {
          return "above";
        }
      })
      .attr("text-anchor", "middle")
      .append("tspan")
      .text(function(d) {
        return d;
      })
      .append("tspan")
      .attr("x", function(d, i) {
        return barWidth / 2 + barWidth * i + barSpacing * i;
      })
      .attr("dy", "1em")
      .text(unit);

    svg
      .append("g")
      .attr("class", "x-axis")
      .attr("transform", "translate(0," + barsHeight + ")")
      .call(xAxis);

    svg
      .selectAll("g.tick text")
      .filter(function(d) {
        return d == "YOU";
      })
      .style("font-weight", "bold");
  }
  var data = [12, 42, 12];
  test("showData", data);
  test("showData1", data);
  if ($(".heartIcon span").text() < 10) {
    $(".heartIcon span").css({
      "padding-left": "11px"
    });
  } else if ($(".heartIcon span").text() >= 100) {
    $(".heartIcon span").css({
      "padding-left": "3px"
    });
  }
  */
  var notyf = new Notyf({
    delay: 3000
  });
  $('[data-toggle="tooltip"]').tooltip();
  $(".heart-wrapper").hide();
  userLogOut();
  checkCookie();
  showProfile();
  var socket = io("http://35.167.221.25:3005");
  var socketID;
  var objCookie = JSON.parse($.cookie("coachCookie"));
  var getAllData = [];
  var chartS;
  var chartT;
  var chartSs;
  var chartTt;
  var getAllChart = [];
  socket.on("onEvent1", function(data) {
    console.log(data);
  });
  socket.on("onTestEcho", function(data) {
    console.log(data);
  });
  socket.on("sys", function(data) {
    console.log("sys ", data);
    var NewArray = new Array();
    var NewArray = data.split("加入了房间");
    // var undefinedId = data.slice(29, 49);
    // console.log(undefinedId);
    socketID = NewArray[1];
    socketName = NewArray[0];
    if (socketName.length > 30) {
      console.log(socketName);
      var undefinedId = socketName.slice(29, 49);
      console.log(undefinedId);
      getAllData.forEach(function(leaveData, index) {
        if (undefinedId === leaveData.id) {
          getAllData.splice(index, 1);
          console.log(leaveData.name);
          notyf.alert(leaveData.name + " 離開了房間");
          $(".whoInRoom #" + leaveData.id).remove();
        }
      });
      return;
    }
    getAllData.push({ name: socketName, id: socketID });
    console.log("已加入房間的", getAllData);
    var msg = "";
    $(".whoInRoom").append("<p id=" + socketID + ">" + socketName + "</p>");
    notyf.confirm(socketName + " 加入了房間");
    var userDataChart = "";
    getAllData.forEach(function(userData, index) {
      userDataChart +=
        '<div id="charts" class="col-md-4" style="padding-top:80px">';
      userDataChart += "<div id=a" + userData.id + "></div>";
      userDataChart += "<div id=b" + userData.id + "></div>";
      userDataChart += "</div>";
      console.log(userData.id);
    });
    $(".showChart").html(userDataChart);
    getAllData.forEach(function(userData, index) {
      console.log(userData);
      chartS = c3.generate({
        bindto: "#a" + userData.id,
        data: {
          columns: [["Speed", 0]],
          type: "gauge"
        },
        gauge: {
          label: {
            format: function(value, ratio) {
              return value;
            }
          },
          min: 0,
          max: 100,
          units: "Speed",
          width: 30
        },
        color: {
          pattern: ["#FF0000", "#F97600", "#F6C600", "#60B044"],
          threshold: {
            values: [30, 60, 90, 100]
          }
        },
        size: {
          height: 100
        }
      });
      console.log(chartS);
      chartT = c3.generate({
        bindto: "#b" + userData.id,
        data: {
          columns: [["dist", 0]],
          type: "bar"
        },
        bar: {
          width: 50
        },
        size: {
          width: 100,
          height: 200
        },
        axis: {
          y: {
            max: 200
          }
        }
      });
      console.log(chartT);
    });
    getAllChart.push(chartS, chartT);
  });
  socket.on("connect", function(data) {
    console.log("connect");
    $("#serialNumForm").submit(function(e) {
      e.preventDefault();
      $(".modal").modal("hide");
      $(".modal").on("hidden.bs.modal", function() {
        $("#serialNumber").val("");
      });
      var roomNum = $("#serialNumber").val();
      getRoomNum = {
        serialNum: roomNum
      };
      socket.emit("join", {
        token: objCookie.token,
        username: objCookie.userName,
        roomID: getRoomNum.serialNum
      });
      return false;
    });
  });
  socket.on("disconnect", function(data) {
    console.log("disconnect", data);
  });

  socket.on("onSTDuring", function(data) {
    console.log("onSTDuring", data);
    $(".heart-wrapper").fadeIn(0);
    var userName = "";
    var userTime = "";
    var getData = { name: [], data: [], id: [] };
    getAllData.forEach(function(userData, index) {
      if (userData.name === data.username) {
        getData.name.push(data.username);
        getData.data.push(data);
        getData.id.push(userData.id);
      }
    });
    console.log(getData);
    console.log(chartS);
    console.log(chartT);
    console.log(getAllChart);
    getAllChart.forEach(function(data) {
      var id = data.element.id.slice(1);
      console.log(id);
      if (id === getData.id) {
        getAllChart[2].load({
          columns: [["Speed", getData.data[0].speed]]
        });
        getAllChart[3].load({
          columns: [["dist", getData.data[0].dist]]
        });
      }
    });
    // console.log(getAllChart[2]);
    // console.log(getAllChart[3]);
    // console.log(getAllChart[4]);
    // console.log(getAllChart[5]);
    // console.log(getAllChart[6]);
    // console.log(getAllChart[7]);
    // console.log(getAllChart[8]);
    // console.log(getAllChart[9]);
    // console.log(getAllChart[10]);
    // console.log(getAllChart[11]);

    /*
    for (var key in data) {
      switch (key) {
        case "speed":
          break;
        case "dist":
          break;
        case "r":
          break;
        case "time":
          userTime += "<div>" + data[key] + "</div>";
          $(".userTime").html(userTime);
          break;
        case "username":
          userName += "<div>" + data[key] + "</div>";
          $(".userName").html(userName);
          break;
        case "hr":
          $("#heartNum").text(data[key]);
          if (parseInt($(".heartIcon span").text()) < 9) {
            $(".heartIcon span").css({
              "padding-left": "10px"
            });
          } else if (parseInt($(".heartIcon span").text()) < 100) {
            $(".heartIcon span").css({
              "padding-left": "7px"
            });
          } else if (parseInt($(".heartIcon span").text()) >= 100) {
            $(".heartIcon span").css({
              "padding-left": "2px"
            });
          }
          break;
      }
    }
    */
    // for (var key in data) {
    //   if (key == "speed") {
    //     document.getElementById("Speed").innerHTML = "speed : " + data[key];
    //   } else if (key == "username") {
    //     document.getElementById("Name").innerHTML = data[key];
    //   } else if (key == "dist") {
    //     document.getElementById("Distance").innerHTML =
    //       "distance : " + data[key];
    //   } else if (key == "r") {
    //     document.getElementById("R").innerHTML = "R : " + data[key];
    //   } else if (key == "time") {
    //     document.getElementById("Time").innerHTML = data[key];
    //   } else if (key == "hr") {
    //     document.getElementById("HR").innerHTML = "HR : " + data[key];
    //   }
    // }
    //這邊可以處理所有人的資料 看要去弄排名還是什麼...如果這筆資料要另外再傳給其他的client event也可以提出
  });
  function getUserData(data) {}
  socket.on("onStartSport", function(data) {
    console.log("onStartSport", data);
    //這邊可以處理所有人的資料 看要去弄排名還是什麼...如果這筆資料要另外再傳給其他的client event也可以提出
  });

  socket.on("onPrivateCall", function(data) {
    console.log("onPrivateCall", data);
    //這邊可以處理所有人的資料 看要去弄排名還是什麼...如果這筆資料要另外再傳給其他的client event也可以提出
  });
  socket.on("onWhosHere", function(data) {
    console.log("onWhosHere :", data);
  });
  $("#startSport").submit(function() {
    console.log("submit pressed", $("#serialNumber").val());
    console.log(objCookie);
    console.log(getRoomNum.serialNum);
    console.log(getRoomNum);
    socket.emit("StartSport", {
      token: objCookie.token,
      username: objCookie.userName,
      roomID: getRoomNum.serialNum
    });
    console.log("id : ", socketID);
    return false;
  });
});
