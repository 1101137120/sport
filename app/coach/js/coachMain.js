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
    // console.log($.cookie("coachCookie"));
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
        // console.log("取得個人資訊：", data);
        getProfileName = {
          name: data.data.detail[0].uCName
        };
        var getProfile = "";
        getProfile += "<h1>教練個人資訊</h1>";
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
          username: coachCookie.userName,
          token: coachCookie.token
        },
        contentType: "application/x-www-form-urlencoded; charset=utf-8"
      }).done(function(dataIP) {
        console.log(dataIP);
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
// 目前沒用到， 20170918
function dedup(arr) {
  var hashTable = {};
  return arr.filter(function(el) {
    // console.log(el[4]);
    var key = JSON.stringify(el[4]);
    var match = Boolean(hashTable[key]);
    return match ? false : (hashTable[key] = true);
  });
}

$(function() {
  // 右下角的推播，當有使用者進來時會推播，三秒後消失， use notyf library
  var notyf = new Notyf({ delay: 3000 });
  $('[data-toggle="tooltip"]').tooltip();
  userLogOut();
  checkCookie();
  showProfile();
  var socket = io("http://35.167.221.25:3005");
  var socketID;
  var objCookie = JSON.parse($.cookie("coachCookie"));
  var getAllData = [];
  var chartName;
  // var getProfileName;
  var getAllChart = [];
  var readerAllChart;
  var getReaderChart = [];
  var dataOfWhosHereArr = [];
  var createRoom = [];
  var userRanking = [];
  var kickUserList = [];
  $("#serialNum").on("hidden.bs.modal", function() {
    $("#serialNumber").val("");
    $("#serialName").val("");
    $('#serialNumForm :input[type="submit"]').prop("disabled", true);
  });
  $('#serialNumForm :input[type="submit"]').prop("disabled", true);
  $("#serialNumForm").on("focus input", function() {
    if ($("#serialNumber").val() !== "" && $("#serialName").val() !== "") {
      $('#serialNumForm :input[type="submit"]').prop("disabled", false);
    } else {
      $('#serialNumForm :input[type="submit"]').prop("disabled", true);
    }
  });
  var sendMsg = document.getElementById("sendMsg");
  socket.on("onWhosHere", function(data) {
    console.log("onWhosHere :", data);
  });
  socket.on("onDuringCount", function(data) {
    console.log(data);
  });
  // 一些資訊都會由 sys callback function 來呈現每個運動員是否在房間， WhosHere 所丟回來的資料也會在這呈現
  socket.on("sys", function(data) {
    console.log("sys ", data);
    // socket.emit("DuringCount", {
    //   token: objCookie.token,
    //   username: objCookie.userName,
    //   roomID: getRoomNum.serialNum
    // });

    // 抓出誰進來房間
    var NewArray = new Array();
    var NewArray = data.split("加入了房间");
    socketID = NewArray[1];
    socketName = NewArray[0];
    /**
    這個 if else 是讓教練用網頁開房間時他自己不會呈現在畫面上，但他如果想和學員一起運動的話，由 app 進來房間是會在畫面上呈現的. 
    作法是開房者和進來的學員如果 username 是同一個的話，先到 else ，然後加到 array ，而教練用 app 登入時再判斷 array 的長度
    
     */
    if (socketName === objCookie.userName && createRoom.length >= 1) {
      /**
       * 這個是在檔住教練反覆的開啟房間
       * 作法是網頁版的教練帳號反覆開房時 socketID 都會一樣，所以就用 socketID 來檔
       * 這樣就不會檔到 app 教練帳號了
       */
      if (createRoom[0].id === socketID) {
        return;
      }
      getAllData.push({
        name: socketName,
        id: socketID
      });
      console.log(getAllData.length);
      $(".titleText span").text(getAllData.length);

      // notyf.confirm(socketName + " 加入了房間");
      var userDataChart = "";
      // userDataChart +=
      //   "<div id='A" +
      //   socketID +
      //   "' class='col-md-4 text-center' style='padding-top:40px'>";
      userDataChart +=
        '<div id="A' +
        socketID +
        '" class="A' +
        socketName.split("@")[0] +
        ' col-md-4 text-center" style=padding-top:40px>';
      // userDataChart +=
      //   "<div id=A" +
      //   socketID +
      //   " class='col-md-4 text-center' style=padding-top:40px>";
      userDataChart += "<div id=a" + socketID + " class='col-md-5'></div>";
      userDataChart += "<div id=aa" + socketID + " class='col-md-5'></div>";
      userDataChart +=
        "<div id=b" + socketID + " style='display:inline-block'></div>";
      userDataChart +=
        "<div id=c" + socketID + " style='display:inline-block'></div>";
      userDataChart +=
        "<div id=dd" + socketID + " style='display:inline-block'></div>";
      userDataChart +=
        "<div id=g" + socketID + " style='display:inline-block'></div>";
      userDataChart +=
        "<div id=e" +
        socketID +
        " class='text-center' style='line-height:1.8em;'>會員名稱： " +
        socketName +
        "</div>";
      userDataChart +=
        "<div id=f" +
        socketID +
        " class=" +
        socketName.split("@")[0] +
        ">運動時間：0</div>";
      userDataChart += '<div class="notificationBtn">';
      userDataChart +=
        '<select id="msg' +
        socketID +
        '" name="msg' +
        socketID +
        '" class="custom-select">';
      userDataChart += "<option selected value='Start'>請選擇推播</option>";
      userDataChart += '<option value="請提高速度">請提高速度</option>';
      userDataChart += '<option value="請下降速度">請下降速度</option>';
      // userDataChart += '<option value="kick">踢人</option>';
      userDataChart += "</select>";
      userDataChart +=
        '<button id="kickUser' +
        socketID +
        "." +
        socketName.split("@")[0] +
        '"type="submit" class="btn btn-danger kickUser" value="kick">踢人</button>';
      userDataChart += "</div>";
      $(".showChart").append(userDataChart);
      kickUserList.forEach(function(data, index) {
        if (data === socketName.split("@")[0]) {
          console.log(data, socketName);
          console.log(socketID);
          var kick = "kick";
          $(".A" + socketName.split("@")[0]).remove();
          $(".titleText span").text(--getAllData.length);
          $("#whoInRoom tbody td").append("");
          socket.emit("PrivateCall", {
            token: objCookie.token,
            username: objCookie.userName,
            roomID: getRoomNum.serialNum,
            socketID: socketID,
            pmsg: kick
          });
        }
      });
      /**
     * 本來是以 socket 回傳的 whosHere 來判斷是否渲染到畫面，而現在多了一個教練可以踢人，所以要改變做法
     * 改變為以 dom 綁定的 className 來判斷使用者是否被封鎖，因為目前只做單純的踢人而沒有存進資料庫，被踢的人想再加入就隱藏而不渲染畫面，其實人有在裡面
     * 上面的 forEach 的 if 裡面會跑黑名單的 list ，有掃到的話就會把 dom 的 className remover 就不會渲染畫面，沒有在黑名單的 list 就不會 remove ，進而渲染畫面
     */
      if ($("div").hasClass("A" + socketName.split("@")[0])) {
        notyf.confirm(socketName + " 加入了房間");
        /**
     *  抓 user 進來房間時的時間，然後渲染到畫面
     */
        var d = new Date();
        var getHour = d.getHours();
        var getMin = d.getMinutes();
        var getSec = d.getSeconds();

        console.log(
          (getHour < 10 ? "0" : "") +
            getHour +
            ":" +
            (getMin < 10 ? "0" : "") +
            getMin +
            ":" +
            getSec
        );
        var whoInRoom = "";
        whoInRoom += "<tr id='who" + socketID + "'>";
        whoInRoom += "<td>" + socketName + "</td>";
        whoInRoom +=
          "<td>" +
          (getHour < 10 ? "0" : "") +
          getHour +
          ":" +
          (getMin < 10 ? "0" : "") +
          getMin +
          ":" +
          getSec +
          "</td>";
        whoInRoom += "</tr>";
        $("#whoInRoom tbody").append(whoInRoom);
        console.log(getAllData.length);
        $(".titleText span").text(getAllData.length);
      }
      /**
     * 這邊是教練有選項讓他可以告知學員是否該上升或下降速度， 裡面的 socket PrivateCall 可以推播到每位學員的手機畫面
     */
      $("#msg" + socketID).change(function(e) {
        e.preventDefault();
        var thisID = this.id.split("msg")[1];
        var $searchMsg = $('select[name="msg' + thisID + '"]');
        // console.log($searchMsg);
        // console.log($searchMsg.val());
        // console.log(thisID);
        socket.emit("PrivateCall", {
          token: objCookie.token,
          username: objCookie.userName,
          roomID: getRoomNum.serialNum,
          socketID: thisID,
          pmsg: $searchMsg.val()
        });
      });
      $(".kickUser").on("click", function() {
        var thisID = this.id.split("kickUser")[1].split(".")[0];
        var thisName = this.id.split(".")[1];
        var $kickUserMsg = $(".kickUser").val();
        console.log(thisID);
        console.log($kickUserMsg);
        kickUserList.push(thisName);
        socket.emit("PrivateCall", {
          token: objCookie.token,
          username: objCookie.userName,
          roomID: getRoomNum.serialNum,
          socketID: thisID,
          pmsg: $kickUserMsg
        });
        console.log(kickUserList);
      });
      let chartS = c3.generate({
        bindto: "#a" + socketID,
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
          pattern: ["#60B044", "#F97600", "#FF0000"],
          threshold: {
            values: [30, 50, 70]
          }
        },
        size: {
          height: 80
        }
      });
      let chartSPM = c3.generate({
        bindto: "#aa" + socketID,
        data: {
          columns: [["SPM", 0]],
          type: "gauge"
        },
        gauge: {
          label: {
            format: function(value, ratio) {
              return value;
            }
          },
          min: 0,
          max: 1000,
          units: "SPM",
          width: 30
        },
        color: {
          pattern: ["#60B044", "#F97600", "#FF0000"],
          threshold: {
            values: [30, 50, 70]
          }
        },
        size: {
          height: 80
        }
      });
      let chartT = c3.generate({
        bindto: "#b" + socketID,
        data: {
          columns: [["Distance", 0]],
          type: "bar",
          colors: {
            Distance: "#000"
          }
        },
        bar: {
          width: {
            ratio: 0.9
          }
        },
        size: {
          width: 80,
          height: 200
        },
        axis: {
          y: {
            max: 200
          }
        }
      });
      let chartR = c3.generate({
        bindto: "#c" + socketID,
        data: {
          columns: [["Resistance", 0]],
          type: "bar",
          colors: {
            Resistance: "#646464"
          }
        },
        bar: {
          width: {
            ratio: 0.9
          }
        },
        size: {
          width: 80,
          height: 200
        },
        axis: {
          y: {
            max: 200
          }
        }
      });
      let chartCal = c3.generate({
        bindto: "#dd" + socketID,
        data: {
          columns: [["Calories", 0]],
          type: "bar",
          colors: {
            Calories: "blue"
          }
        },
        bar: {
          width: {
            ratio: 0.9
          }
        },
        size: {
          width: 80,
          height: 200
        },
        axis: {
          y: {
            max: 500
          }
        }
      });
      let chartHR = c3.generate({
        bindto: "#g" + socketID,
        data: {
          columns: [["Heartbeat", 0]],
          type: "bar",
          colors: {
            Heartbeat: "red"
          }
        },
        bar: {
          width: {
            ratio: 0.9
          }
        },
        size: {
          width: 80,
          height: 200
        },
        axis: {
          y: {
            max: 200
          }
        }
      });
      getAllChart.push([
        chartS,
        chartSPM,
        chartT,
        chartR,
        chartCal,
        chartHR,
        { name: socketName },
        { id: socketID }
      ]);
      return;
      // 由這個來檔住教練第一次進來時不會渲染畫面，然後把它的 socketID 加到 array ，然後由上面的 if 去判斷它的長度
    } else if (socketName === objCookie.userName) {
      createRoom.push({ id: socketID });
      return;
    }
    /**
     * 如果有人離開房間時會觸發這個 if ，然後在找相對應的 socketID 後，將該 socketID 刪除，畫面也會一同的刪掉
     */
    if (socketName.length >= 60) {
      console.log(socketName);
      var undefinedId = socketName.slice(29, 49);
      console.log(undefinedId);
      getAllData.forEach(function(leaveData, index) {
        if (undefinedId === leaveData.id) {
          // 運動員離開 app 後就踢除
          getAllData.splice(index, 1);
          getAllChart.splice(index, 1);
          console.log(leaveData.name);
          notyf.alert(leaveData.name + " 離開了房間");
          console.log(leaveData.id);
          $("#who" + leaveData.id).remove(); // 位於學員資訊裡面的渲染
          $(".showChart #A" + leaveData.id).remove(); // 位於主畫面 chart 的渲染
          $(".titleText span").text(getAllData.length);
          // 這兩個是把離開房間的徹底的刪掉
          delete leaveData.name;
          delete leaveData.id;
        }
      });
      return;
    } else if (socketName.length > 40) {
      // console.log("hi");
      // var dataOfWhosHere = data.split("whosHere...")[1];
      // var getDataOfWhosHere = dataOfWhosHere.split("id = ");
      // console.log(getDataOfWhosHere);
      // dataOfWhosHereArr.push({
      //   name: getDataOfWhosHere[0],
      //   id: getDataOfWhosHere[1]
      // });
      // console.log(dataOfWhosHereArr);
      return;
    }
    /**
     * 將進來房間的使用者加到 array
     */
    getAllData.push({
      name: socketName,
      id: socketID
    });

    // getAllChart = dedup(getAllData);
    // console.log(getAllChart);
    /**
     * 加到 array 後同時渲染畫面
     */
    var userDataChart = "";
    // userDataChart +=
    //   "<div id='A" +
    //   socketID +
    //   "' class='col-md-4 text-center' style='padding-top:40px'>";
    userDataChart +=
      '<div id="A' +
      socketID +
      '" class="A' +
      socketName.split("@")[0] +
      ' col-md-4 text-center" style=padding-top:40px>';
    // userDataChart +=
    //   "<div id=A" +
    //   socketID +
    //   " class='col-md-4 text-center' style=padding-top:40px>";
    userDataChart += "<div id=a" + socketID + " class='col-md-5'></div>";
    userDataChart += "<div id=aa" + socketID + " class='col-md-5'></div>";
    userDataChart +=
      "<div id=b" + socketID + " style='display:inline-block'></div>";
    userDataChart +=
      "<div id=c" + socketID + " style='display:inline-block'></div>";
    userDataChart +=
      "<div id=dd" + socketID + " style='display:inline-block'></div>";
    userDataChart +=
      "<div id=g" + socketID + " style='display:inline-block'></div>";
    userDataChart +=
      "<div id=e" +
      socketID +
      " class='text-center' style='line-height:1.8em;'>會員名稱： " +
      socketName +
      "</div>";
    userDataChart +=
      "<div id=f" +
      socketID +
      " class=" +
      socketName.split("@")[0] +
      ">運動時間：0</div>";
    userDataChart += '<div class="notificationBtn">';
    userDataChart +=
      '<select id="msg' +
      socketID +
      '" name="msg' +
      socketID +
      '" class="custom-select">';
    userDataChart += "<option selected value='Start'>請選擇推播</option>";
    userDataChart += '<option value="請提高速度">請提高速度</option>';
    userDataChart += '<option value="請下降速度">請下降速度</option>';
    // userDataChart += '<option value="kick">踢人</option>';
    userDataChart += "</select>";
    userDataChart +=
      '<button id="kickUser' +
      socketID +
      "." +
      socketName.split("@")[0] +
      '"type="submit" class="btn btn-danger kickUser" value="kick">踢人</button>';
    userDataChart += "</div>";
    $(".showChart").append(userDataChart);
    console.log(kickUserList);
    kickUserList.forEach(function(data, index) {
      if (data === socketName.split("@")[0]) {
        var kick = "kick";
        $(".A" + socketName.split("@")[0]).remove();
        $(".titleText span").text(--getAllData.length);
        $("#whoInRoom tbody td").append("");
        socket.emit("PrivateCall", {
          token: objCookie.token,
          username: objCookie.userName,
          roomID: getRoomNum.serialNum,
          socketID: socketID,
          pmsg: kick
        });
      }
    });
    /**
     * 本來是以 socket 回傳的 whosHere 來判斷是否渲染到畫面，而現在多了一個教練可以踢人，所以要改變做法
     * 改變為以 dom 綁定的 className 來判斷使用者是否被封鎖，因為目前只做單純的踢人而沒有存進資料庫，被踢的人想再加入就隱藏而不渲染畫面，其實人有在裡面
     * 上面的 forEach 的 if 裡面會跑黑名單的 list ，有掃到的話就會把 dom 的 className remover 就不會渲染畫面，沒有在黑名單的 list 就不會 remove ，進而渲染畫面
     */
    if ($("div").hasClass("A" + socketName.split("@")[0])) {
      notyf.confirm(socketName + " 加入了房間");
      /**
     *  抓 user 進來房間時的時間，然後渲染到畫面
     */
      var d = new Date();
      var getHour = d.getHours();
      var getMin = d.getMinutes();
      var getSec = d.getSeconds();

      console.log(
        (getHour < 10 ? "0" : "") +
          getHour +
          ":" +
          (getMin < 10 ? "0" : "") +
          getMin +
          ":" +
          getSec
      );
      var whoInRoom = "";
      whoInRoom += "<tr id='who" + socketID + "'>";
      whoInRoom += "<td>" + socketName + "</td>";
      whoInRoom +=
        "<td>" +
        (getHour < 10 ? "0" : "") +
        getHour +
        ":" +
        (getMin < 10 ? "0" : "") +
        getMin +
        ":" +
        getSec +
        "</td>";
      whoInRoom += "</tr>";
      $("#whoInRoom tbody").append(whoInRoom);
      console.log(getAllData.length);
      $(".titleText span").text(getAllData.length);
    }
    /**
     * 這邊是教練有選項讓他可以告知學員是否該上升或下降速度， 裡面的 socket PrivateCall 可以推播到每位學員的手機畫面
     */
    $("#msg" + socketID).change(function(e) {
      e.preventDefault();
      var thisID = this.id.split("msg")[1];
      var $searchMsg = $('select[name="msg' + thisID + '"]');
      // console.log($searchMsg);
      // console.log($searchMsg.val());
      // console.log(thisID);
      socket.emit("PrivateCall", {
        token: objCookie.token,
        username: objCookie.userName,
        roomID: getRoomNum.serialNum,
        socketID: thisID,
        pmsg: $searchMsg.val()
      });
    });
    $(".kickUser").on("click", function() {
      var thisID = this.id.split("kickUser")[1].split(".")[0];
      var thisName = this.id.split(".")[1];
      var $kickUserMsg = $(".kickUser").val();
      console.log(thisID);
      console.log($kickUserMsg);
      kickUserList.push(thisName);
      socket.emit("PrivateCall", {
        token: objCookie.token,
        username: objCookie.userName,
        roomID: getRoomNum.serialNum,
        socketID: thisID,
        pmsg: $kickUserMsg
      });
      console.log(kickUserList);
    });
    /**
     * 再來就是把每位進來房間的學員，用 c3.js chart library 渲染所需要的數據 chart
     * 作法是抓每位 user 的 socketID ，前面加上 abcd，因該 library 要綁 id ，故 socketID 前面加上 abcd 才不會重複
     */
    let chartS = c3.generate({
      bindto: "#a" + socketID,
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
        pattern: ["#60B044", "#F97600", "#FF0000"],
        threshold: {
          values: [30, 50, 70]
        }
      },
      size: {
        height: 80
      }
    });
    let chartSPM = c3.generate({
      bindto: "#aa" + socketID,
      data: {
        columns: [["SPM", 0]],
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
        units: "SPM",
        width: 30
      },
      color: {
        pattern: ["#60B044", "#F97600", "#FF0000"],
        threshold: {
          values: [30, 50, 70]
        }
      },
      size: {
        height: 80
      }
    });
    let chartT = c3.generate({
      bindto: "#b" + socketID,
      data: {
        columns: [["Distance", 0]],
        type: "bar",
        colors: {
          Distance: "#000"
        }
      },
      bar: {
        width: {
          ratio: 0.9
        }
      },
      size: {
        width: 80,
        height: 200
      },
      axis: {
        y: {
          max: 150
        }
      }
    });
    let chartR = c3.generate({
      bindto: "#c" + socketID,
      data: {
        columns: [["Resistance", 0]],
        type: "bar",
        colors: {
          Resistance: "#646464"
        }
      },
      bar: {
        width: {
          ratio: 0.9
        }
      },
      size: {
        width: 80,
        height: 200
      },
      axis: {
        y: {
          max: 30
        }
      }
    });
    let chartCal = c3.generate({
      bindto: "#dd" + socketID,
      data: {
        columns: [["Calories", 0]],
        type: "bar",
        colors: {
          Calories: "blue"
        }
      },
      bar: {
        width: {
          ratio: 0.9
        }
      },
      size: {
        width: 80,
        height: 200
      },
      axis: {
        y: {
          max: 500
        }
      }
    });
    let chartHR = c3.generate({
      bindto: "#g" + socketID,
      data: {
        columns: [["Heartbeat", 0]],
        type: "bar",
        colors: {
          Heartbeat: "red"
        }
      },
      bar: {
        width: {
          ratio: 0.9
        }
      },
      size: {
        width: 80,
        height: 200
      },
      axis: {
        y: {
          max: 200
        }
      }
    });
    /**
     * 綁定完推到 getAllChart array
     */
    getAllChart.push([
      chartS,
      chartSPM,
      chartT,
      chartR,
      chartCal,
      chartHR,
      { name: socketName },
      { id: socketID }
    ]);
    console.log(getAllChart);
  });
  socket.on("onPrivateCall", function(data) {
    console.log(data);
  });
  $(".modal").on("shown.bs.modal", function() {
    $("#serialName").focus();
  });
  /**
     * 有 connect 表示和 socket 連線成功
     */
  socket.on("connect", function(data) {
    console.log("connect");
    /**
     * 這個 submit 是教練輪入課程代碼時要傳給 socket
     */
    $("#serialNumForm").submit(function(e) {
      e.preventDefault();
      kickUserList.length = 0; // 清除黑名單的 list
      $(".modal").modal("hide");
      $(".modal").on("hidden.bs.modal", function() {
        $("#serialNumber").val("");
      });
      var roomNum = $("#serialNumber").val();
      var roomName = $("#serialName").val();
      getRoomNum = { serialNum: roomNum, serialName: roomName };
      console.log(getRoomNum);
      socket.emit("join", {
        token: objCookie.token,
        username: objCookie.userName,
        roomID: getRoomNum.serialNum
      });
      var titleText = "";
      titleText += '<table class="table transitionForTable tableStyle">';
      titleText += "<tr>";
      titleText += "<th>教練： " + getProfileName.name + "</th>";
      titleText += "<th>名稱： " + getRoomNum.serialName + "</th>";
      titleText += "<th>代碼： " + getRoomNum.serialNum + "</th>";
      titleText += "<th>人數： <span>" + getAllData.length + "</span></th>";
      titleText += "</tr>";
      titleText += "</table>";
      $(".titleText").html(titleText);
      $(".showChart").html("");
      return false;
    });
  });
  socket.on("disconnect", function(data) {
    console.log("disconnect", data);
  });
  socket.on("onSTDuring", function(data) {
    console.log("onSTDuring", data);
    socket.emit("WhosHere", {
      token: objCookie.token,
      username: data.username,
      roomID: getRoomNum.serialNum
    });
    getAllChart.forEach(function(readerData, index) {
      // console.log(
      //   readerData[4].name,
      //   readerData[1].internal.data.targets[0].values[0].value
      // );
      if (data.username == readerData[6].name) {
        readerData[0].load({
          columns: [["Speed", data.speed]]
        });
        readerData[1].load({
          columns: [["SPM", data.spm]]
        });
        readerData[2].load({
          columns: [["Distance", data.dist]]
        });
        readerData[3].load({
          columns: [["Resistance", data.r]]
        });
        readerData[4].load({
          columns: [["Calories", data.cal]]
        });
        readerData[5].load({
          columns: [["Heartbeat", data.hr]]
        });
        $("." + readerData[6].name.split("@")[0]).text("運動時間： " + data.time);
        // userRanking.push(data.dist);
        // userRanking.sort();
        // console.log(userRanking);
        // console.log(data.username, data.dist);
      }
      $(".userRanking").html(readerData[6].name + " " + data.dist);
    });
    //這邊可以處理所有人的資料 看要去弄排名還是什麼...如果這筆資料要另外再傳給其他的client event也可以提出
  });
  socket.on("onStartSport", function(data) {
    console.log("onStartSport", data);
    //這邊可以處理所有人的資料 看要去弄排名還是什麼...如果這筆資料要另外再傳給其他的client event也可以提出
  });

  /**
   * 教練要結束課程時要傳給 server 的，不用帶什麼參數
   */
  $("#LeaveDisconnect").on("click", function() {
    socket.emit("LeaveDisconnect");
  });
  /**
   *  教練開始課程的監聽事件
   */
  $("#startSport").submit(function() {
    // console.log("submit pressed", $("#serialNumber").val());
    // console.log(objCookie);
    // console.log(getRoomNum.serialNum);
    // console.log(getRoomNum);
    socket.emit("StartSport", {
      token: objCookie.token,
      username: objCookie.userName,
      roomID: getRoomNum.serialNum
    });
    // console.log("id : ", socketID);
    return false;
  });
});
