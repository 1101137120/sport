var url = "http://54.214.111.32:9004";

// 廠商登出 function
function userLogOut() {
  $(".logOut").on("click", function() {
    $.removeCookie("cpDataCookie", {
      expires: -1,
      path: "/"
    });
    console.log($.cookie("cpDataCookie"));
    console.log($.removeCookie("cpDataCookie"));
  });
}

// 取得公司所有裝置的 function
// 因為要把型號、廠商a、廠商b做分類，所以抓到資料後用 searchArr function 帶 data 參數出去
function getAllCpDeviceData() {
  getCpProfile(function(err, data) {
    if (err) {
      console.log(err);
    }
    console.log("公司資訊： ", data);
    var shortData = data.data.detail[0];
    var cpDataCookie = JSON.parse($.cookie("cpDataCookie"));
    console.log("Cookie： ", cpDataCookie);
    $.ajax({
      type: "POST",
      url: url + "/api/cpDeviceDataGet",
      data: {
        username: shortData.cpAcc,
        cpAee: shortData.cpAcc,
        cpName: shortData.cpName,
        token: cpDataCookie.token
      },
      beforeSend: function() {
        $(".showLoader").html('<div class="cp-spinner cp-round"></div>');
      }
    }).done(function(data) {
      console.log("所有裝置： ", data);
      searchArr(data);
    });
  });
}

// 這個 function 要把所有的裝置分類相同的廠商、型號出來
// 有加入一個 footable library
//再來用 /api/cpDeviceStatusGet api 取得裝置的異常狀態
function searchArr(data) {
  if (data.data.error === "undefined not in list" && data.result === "false") {
    $("table thead").html("");
    $(".showLoader").remove();
    $(".showStatusText").html("<h1>There is currently no device</h1>");
    return;
  }
  var columns = "";
  columns += "<thead>";
  columns += "<tr>";
  columns += "<th>Brand</th>";
  columns += '<th data-type="number">Numbering</th>';
  columns += "<th>Model</th>";
  columns += '<th data-type="number">Device serial number</th>';
  columns += "<th>Device status</th>";
  columns += "</tr>";
  columns += "</thead>";
  getCpProfile(function(err, profileData) {
    var shortData = profileData.data.detail[0];
    var cpDataCookie = JSON.parse($.cookie("cpDataCookie"));
    var getsDeviceID = { contents: [] }; // for ajax data
    var getID = []; // for search
    // 這邊是把有異常狀態的 sDeviceID 抓出來做比對，讓詳細的 button 可以顯示紅色
    data.data.detail.forEach(function(data, index) {
      getsDeviceID.contents.push({ sDeviceID: data.sDeviceID });
      getID.push(data.sDeviceID);
    });
    $.ajax({
      type: "POST",
      url: url + "/api/cpDeviceStatusGet",
      data: {
        username: shortData.cpAcc,
        cpAcc: shortData.cpAcc,
        token: cpDataCookie.token,
        sDeviceID: JSON.stringify(getsDeviceID),
        dataNum: getsDeviceID.contents.length
      },
      complete: function() {
        $(".showLoader").remove();
      }
    }).done(function(statusData) {
      console.log("有異常的裝置： ", statusData);
      var getStatussDeviceID = {
        sDeviceID: [],
        data: []
      };
      statusData.data.detail.forEach(function(data, index) {
        getStatussDeviceID.sDeviceID.push(data.sDeviceID);
        getStatussDeviceID.data.push(data);
      });
      var result = [];
      for (var i in getStatussDeviceID.sDeviceID) {
        if (getStatussDeviceID.sDeviceID.indexOf(getID[i]) != -1) {
          result.push(getID[i]);
        }
      }
      console.log("比對完有異常的 sDeviceID ： ", result);
      $(".showStatusText").html("<h1>Vendor all devices</h1>");
      $(".tableList").footable({
        columns: $("table").html(columns),
        row: data.data.detail.forEach(function(data, index) {
          var row = "";
          row +=
            "<tr><td>" +
            data.sBrands +
            "</td><td>" +
            parseInt(data.sSEID) +
            "</td><td>" +
            data.sModels +
            "</td><td>" +
            data.sDeviceID +
            "</td>";
          row +=
            '<td id="' +
            data.sDeviceID +
            '" class="dataList' +
            index +
            '">' +
            '<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#' +
            data.sDeviceID +
            '">Detailed</button></td>';
          /*
        row += '<td id="status" class="statusList">' + 
        '<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#status' + status + '">異常</button></td></tr>';
        */
          $("#showTableData table").append(row);
        }),
        on: {
          // footable 的點擊監聽事件，看 user 點哪個就跑出該 sDeviceID 的資料，也同時抓時有異常的裝置
          showAllData: data.data.detail.forEach(function(data, index) {
            $(".dataList" + index).on("click", function() {
              if (data.sEnableDate === null) {
                data.sEnableDate = "無";
              }
              var modal = "";
              var $thisId = this.id;
              var sSEID = data.sSEID;
              $(".firstModal").attr("id", $thisId);
              modal += '<table class="table">';
              modal += "<tr>";
              modal += "<th>Brand</th>";
              modal += "<th>Model</th>";
              modal += "<th>Manufacturer</th>";
              modal += "<th>Manufacturer</th>";
              modal += "<th>Numbering</th>";
              modal += "<th>Enable date</th>";
              modal += "<th>Equipment type</th>";
              modal += "</tr>";
              modal += "<tr>";
              modal += "<td>" + data.sBrands + "</td>";
              modal += "<td>" + data.sModels + "</td>";
              modal += "<td>" + data.sManufacterA + "</td>";
              modal += "<td>" + data.sManufacterB + "</td>";
              modal += "<td>" + data.sSEID + "</td>";
              modal += "<td>" + data.sEnableDate.slice(0, 10) + "</td>";
              modal += "<td>" + data.sActivity + "</td>";
              modal += "</tr>";
              modal += "</table>";
              $(".modal-body").html(modal);
              $(".modal-title").html("<h4>Details</h4>");
              // 這邊是讓有異常裝置的 button 可以按，反之不能按
              // 每按一次就抓一次 ajax , 這邊要改，因效能不好
              var modalFooterBtn = "";
              modalFooterBtn +=
                '<a data-dismiss="modal" data-toggle="modal" href="#statusData" id="statusDataBtn" class="btn btn-danger">Error</a>';
              $(".modal-footer span").html(modalFooterBtn);
              $.ajax({
                type: "POST",
                url: url + "/api/cpDeviceStatusGet",
                data: {
                  username: shortData.cpAcc,
                  cpAcc: shortData.cpAcc,
                  token: cpDataCookie.token,
                  sDeviceID: JSON.stringify({
                    contents: [{ sDeviceID: parseInt($thisId) }]
                  }),
                  dataNum: 1
                }
              }).done(function(data) {
                console.log(data);
                if (
                  data.result === "false" &&
                  data.data.error === "not in list"
                ) {
                  $("#statusDataBtn").addClass("disabled");
                  $(".modal-footer span").css({
                    cursor: "not-allowed"
                  });
                  return;
                }
                var modal = "";
                modal += '<table class="table">';
                modal += "<tr>";
                modal += "<th>Numbering</th>";
                modal += "<th>Date</th>";
                modal += "<th>Time</th>";
                modal += "<th>Abnormal state</th>";
                modal += "</tr>";
                data.data.detail.forEach(function(data, index) {
                  modal += "<tr>";
                  modal += "<td>" + sSEID + "</td>";
                  modal += "<td>" + data.rtDate + "</td>";
                  modal += "<td>" + data.rtTime + "</td>";
                  modal += '<td id="errorStatus">' + data.repaireNo + "</td>";
                  modal += "</tr>";
                });
                modal += "</table>";
                $("#statusData .modal-body").html(modal);
                $("#statusData .modal-title").html("<h4>Abnormal state</h4>");
                $("#statusData .modal-footer span").html(
                  '<a class="btn btn-primary" data-dismiss="modal" data-toggle="modal" href="#' +
                    $thisId +
                    '"">Back detailed information</a>'
                );
              });
            });
          })
        }
      });
      // 上面比對完的結果用 for in 去抓有異常的 sDeviceID ，如果有就讓 button 變紅色
      for (var i in result) {
        $("#" + result[i] + " button")
          .removeClass("btn-primary")
          .addClass("btn-danger");
      }
    });
  });
  $("table").trigger("footable_initialize");
}

//==============================================觀看公司資訊的相關 function=====================================

// 抓取公司資訊的 api ，抓到後用 callback function 把資料帶出來處理
function getCpProfile(cb) {
  var cpDataCookie = JSON.parse($.cookie("cpDataCookie"));
  $.ajax({
    type: "POST",
    url: url + "/api/cpDataGet",
    data: {
      username: cpDataCookie.userName,
      cpAcc: cpDataCookie.userName,
      cpPassword: cpDataCookie.cpPassword,
      token: cpDataCookie.token
    }
  }).done(function(data) {
    cb(null, data);
  });
}

// 當 user 看公司資訊時，去抓 getCpProfile 帶 callback function 的 data 進去印出相關資料
function showCpProfile() {
  if ($.cookie("cpDataCookie")) {
    getCpProfile(function(err, data) {
      if (err) {
        console.log(err);
      }
      console.log("公司資訊： ", data);
      var shortData = data.data.detail[0];
      var showProfile = "";
      if (shortData.others === null) {
        shortData.others = "無";
        showProfile += "<p>Company Name： " + shortData.cpName + "</p>";
        showProfile += "<p>Company Type: " + shortData.cpType + "</p>";
        showProfile += "<p>Uniform numbers: " + shortData.taxID + "</p>";
        showProfile += "<p>Others： " + shortData.others + "</p>";
        $(".showProfile").append(showProfile);
      } else {
        showProfile += "<p>Company Name： " + shortData.cpName + "</p>";
        showProfile += "<p>Company Type: " + shortData.cpType + "</p>";
        showProfile += "<p>Uniform numbers: " + shortData.taxID + "</p>";
        showProfile += "<p>Others： " + shortData.others + "</p>";
        $(".showProfile").append(showProfile);
      }
    });
  } else {
    window.location.href = "../index.html";
  }
}
//==============================================觀看公司資訊的相關 function=====================================
$(function() {
  userLogOut();
  getAllCpDeviceData();
});
