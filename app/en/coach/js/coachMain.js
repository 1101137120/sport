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
  c3.generate({
    bindto: "#aDist1",
    data: {
      columns: [["Distance", 130]],
      type: "bar"
    },
    bar: {
      width: {
        ratio: 0.5
      },
      width: 30
    },
    size: {
      width: 100,
      height: 200
    },
    axis: {
      y: {
        show: true,
        max: 1000,
        padding: {
          top: 100,
          bottom: 100
        }
      },
      x: {
        show: false
      }
    }
  });
  c3.generate({
    bindto: "#fSpeed1",
    data: {
      columns: [["data", 22]],
      type: "gauge"
    },
    gauge: {
      label: {
        format: function(value, ratio) {
          return value;
        }
      },
      min: 0,
      max: 200,
      units: "Speed",
      width: 10
    },
    color: {
      pattern: ["#FF0000", "#F97600", "#F6C600", "#60B044"],
      threshold: {
        values: [50, 100, 150, 200]
      }
    },
    size: {
      height: 80
    }
  });
  */
  userLogOut();
  checkCookie();
  showProfile();
  var token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiYW5keTM3NTJAZ21haWwuY29tIiwiaWF0IjoxNTAzMDM4MTU0LCJleHAiOjE1MDMxMjQ1NTR9.Dp2QJAGJabOnL4ydkJPmNeiv1MNogksi9S-fQLRhKew";
  var username = "andy3752@gmail.com";

  var socket = io("http://35.167.221.25:3005");
  var socketID;
  var objCookie = JSON.parse($.cookie("coachCookie"));
  var getRoomNum = {};
  var allUserData = { username: [], userID: [] };
  var getAllData = [];
  socket.on("onEvent1", function(data) {
    console.log(data);
  });
  socket.on("onTestEcho", function(data) {
    console.log(data);
  });
  socket.on("sys", function(data) {
    console.log("sys ", data);
    console.log(data);
    var NewArray = new Array();
    var NewArray = data.split("加入了房间");
    socketID = NewArray[1];
    socketName = NewArray[0];
    getAllData.push({ name: socketName, id: socketID });
    console.log(getAllData);
    getAllData.forEach(function(data, index) {
      if (data.id === undefined) {
        console.log("hi");
      }
    });
    if (socketID === undefined) {
      console.log(socketID);
      return;
    } else {
      var notyf = new Notyf({
        delay: 5000
      });
      var msg = "";
      $(".whoInRoom").append("<p>" + socketName + "</p>");
      // Display an alert notification
      notyf.confirm(socketName + " 加入了房間");
      console.log("Name ", socketName);
      console.log("id : ", socketID);
    }
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
    var getData = { name: [], data: [] };
    allUserData.username.forEach(function(userData, index) {
      console.log(userData);
      if (userData === data.username) {
        getData.name.push(data.username);
        getData.data.push(data);
      }
    });
    console.log(getData);
    getData.name.forEach(function(nameData) {
      $("#arrUser").append(nameData);
      console.log(nameData);
    });
    for (var key in data) {
      switch (key) {
        case "speed":
          c3.generate({
            bindto: "#fSpeed",
            data: {
              columns: [["data", data[key]]],
              type: "gauge"
            },
            gauge: {
              label: {
                format: function(value, ratio) {
                  return value;
                }
              },
              min: 0,
              max: 50,
              units: "Speed",
              width: 20
            },
            color: {
              pattern: ["#FF0000", "#F97600", "#F6C600", "#60B044"],
              threshold: {
                values: [50, 100, 150, 200]
              }
            },
            size: {
              height: 80
            }
          });
          break;
        case "dist":
          c3.generate({
            bindto: "#aDist",
            data: {
              columns: [["Distance", data[key]]],
              type: "bar"
            },
            bar: {
              width: 30
            },
            size: {
              width: 100,
              height: 200
            },
            axis: {
              y: {
                show: true,
                max: 1000
              },
              x: {
                show: false
              }
            }
          });
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
          if (parseInt($(".heart span").text()) < 9) {
            $(".heart span").css({
              "padding-left": "10px"
            });
          } else if (parseInt($(".heart span").text()) < 100) {
            $(".heart span").css({
              "padding-left": "5px"
            });
          } else if (parseInt($(".heart span").text()) >= 100) {
            $(".heart span").css({
              "padding-left": "0"
            });
          }
          var test = parseInt($(".heart span").text());
          console.log(test);
          break;
      }
    }
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
