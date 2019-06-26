var url = "http://34.216.81.49:9004";
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
        // console.log("Cookie： ", cpDataCookie);
        $.ajax({
            type: "POST",
            url: url + "/api/cpDeviceDataGet",
            data: {
                username: shortData.cpAcc,
                cpAee: shortData.cpAcc,
                cpName: shortData.cpAcc,
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
        $(".showStatusText").html("<h1>目前無裝置</h1>");
        return;
    }
    var columns = "";
    columns += "<thead>";
    columns += "<tr>";
    columns += "<th>品牌</th>";
    columns += '<th data-type="number">總里程</th>';
    columns += "<th>型號</th>";
    columns += '<th data-type="number">裝置序號</th>';
    columns += "<th>裝置狀態</th>";
    columns += "</tr>";
    columns += "</thead>";
    getCpProfile(function(err, profileData) {
        var shortData = profileData.data.detail[0];
        var cpDataCookie = JSON.parse($.cookie("cpDataCookie"));
        var getsDeviceID = {
            contents: []
        }; // for ajax data
        var getID = []; // for search
        // 這邊是把有異常狀態的 sDeviceID 抓出來做比對，讓詳細的 button 可以顯示紅色
        data.data.detail.forEach(function(data, index) {
            getsDeviceID.contents.push({
                sDeviceID: data.sDeviceID
            });
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
            if (
                statusData.data.error === "not in list" &&
                statusData.result === "false"
            ) {
                console.log(getStatussDeviceID);
                console.log(getID);
                var result = [];
                console.log(statusData.data.detail);
                for (var i in getID) {
                    if (getStatussDeviceID.sDeviceID.indexOf(getID[i]) != -1) {
                        result.push(getID[i]);
                    }
                }
                console.log("比對完有異常的 sDeviceID ： ", result);
                $(".showStatusText").html(
                    "<h1>" + cpDataCookie.userName + " 的所有裝置</h1>"
                );
                $(".tableList").footable({
                    columns: $("table").html(columns),
                    row: data.data.detail.forEach(function(data, index) {
                        var row = "";
                        row +=
                            "<tr><td>" +
                            data.sBrands +
                            "</td><td>" +
                            parseInt(data.sTotalVileage) +
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
                            '<button type="button" class="error' +
                            data.sDeviceID +
                            ' btn btn-primary" data-toggle="modal" data-target="#' +
                            data.sDeviceID +
                            '">詳細</button></td>';
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
                                modal += "<th>品牌</th>";
                                modal += "<th>型號</th>";
                                modal += "<th>製造商</th>";
                                modal += "<th>編號</th>";
                                modal += "<th>啟用日期</th>";
                                modal += "<th>器材種類</th>";
                                modal += "</tr>";
                                modal += "<tr>";
                                modal += "<td>" + data.sBrands + "</td>";
                                modal += "<td>" + data.sModels + "</td>";
                                var totalMF = "";
                                console.log("data.ucMFnameA ::" + data.ucMFnameA);
                                if (data.ucMFnameA != "null" && totalMF.indexOf(data.ucMFnameA) == -1) {
                                    if (totalMF != "")
                                        totalMF += " , ";
                                    totalMF = totalMF + data.ucMFnameA;
                                }
                                if (data.ucMFnameB != "null" && totalMF.indexOf(data.ucMFnameB) == -1) {
                                    if (totalMF != "")
                                        totalMF += " , ";
                                    totalMF = totalMF + data.ucMFnameB;
                                }
                                if (data.ucMFnameC != "null" && totalMF.indexOf(data.ucMFnameC) == -1) {
                                    if (totalMF != "")
                                        totalMF += " , ";
                                    totalMF = totalMF + data.ucMFnameC;
                                }
                                if (data.ucMFnameD != "null" && totalMF.indexOf(data.ucMFnameD) == -1) {
                                    if (totalMF != "")
                                        totalMF += " , ";
                                    totalMF = totalMF + data.ucMFnameD;
                                }
                                if (data.ucMFnameE != "null" && totalMF.indexOf(data.ucMFnameE) == -1) {
                                    if (totalMF != "")
                                        totalMF += " , ";
                                    totalMF = totalMF + data.ucMFnameE;
                                }
                                modal += "<td>" + totalMF + "</td>";
                                modal += "<td>" + data.sSEID + "</td>";
                                modal += "<td>" + data.sEnableDate.slice(0, 10) + "</td>";
                                modal += "<td>" + data.sActivity + "</td>";
                                modal += "</tr>";
                                modal += "</table>";
                                $(".modal-body").html(modal);
                                $(".modal-title").html("<h4>詳細資料</h4>");
                                // 上面比對完的結果用 for in 去抓有異常的 sDeviceID ，如果有就讓 button 變紅色
                                for (let i in result) {
                                    $(".error" + result[i])
                                        .removeClass("btn-primary")
                                        .addClass("btn-danger");
                                }
                                // 這邊是讓有異常裝置的 button 可以按，反之不能按
                                // 每按一次就抓一次 ajax , 這邊要改，因效能不好
                                var modalFooterBtn = "";
                                modalFooterBtn +=
                                    '<a data-dismiss="modal" data-toggle="modal" href="#statusData" id="statusDataBtn" class="btn btn-danger">異常</a>';
                                $(".modal-footer span").html(modalFooterBtn);
                                $.ajax({
                                    type: "POST",
                                    url: url + "/api/cpDeviceStatusGet",
                                    data: {
                                        username: shortData.cpAcc,
                                        cpAcc: shortData.cpAcc,
                                        token: cpDataCookie.token,
                                        sDeviceID: JSON.stringify({
                                            contents: [{
                                                sDeviceID: parseInt($thisId)
                                            }]
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
                                    modal += "<th>編號</th>";
                                    modal += "<th>日期</th>";
                                    modal += "<th>時間</th>";
                                    modal += "<th>異常狀態</th>";
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
                                    $("#statusData .modal-title").html("<h4>異常狀態</h4>");
                                    $("#statusData .modal-footer span").html(
                                        '<a class="btn btn-primary" data-dismiss="modal" data-toggle="modal" href="#' +
                                        $thisId +
                                        '"">回詳細資料</a>'
                                    );
                                });
                            });
                        })
                    }
                });
                // 上面比對完的結果用 for in 去抓有異常的 sDeviceID ，如果有就讓 button 變紅色
                for (let i in result) {
                    $(".error" + result[i])
                        .removeClass("btn-primary")
                        .addClass("btn-danger");
                }
                /**
                 * 20171103 發現這個 library 沒辦法讓在第二頁以上的異常 button 顯示紅色，所以用監聽事件去改變它的顏色
                 * 做法是監聽 user 按下去時改變顏色，而會設 setTimeOut 是因為讓 user 點下去時有點延遲，不然會來不及監聽
                 */
                $("a.footable-page-link").on("click", function() {
                    setTimeout(function() {
                        for (let i in result) {
                            $(".error" + result[i])
                                .removeClass("btn-primary")
                                .addClass("btn-danger");
                        }
                    }, 50);
                });
            } else {
                statusData.data.detail.forEach(function(data, index) {
                    getStatussDeviceID.sDeviceID.push(data.sDeviceID);
                    getStatussDeviceID.data.push(data);
                });
                console.log(getStatussDeviceID);
                console.log(getID);
                var result = [];
                console.log(statusData.data.detail);
                for (var i in getID) {
                    if (getStatussDeviceID.sDeviceID.indexOf(getID[i]) != -1) {
                        result.push(getID[i]);
                    }
                }
                console.log("比對完有異常的 sDeviceID ： ", result);
                $(".showStatusText").html(
                    "<h1>" + cpDataCookie.userName + " 的所有裝置</h1>"
                );
                $(".tableList").footable({
                    columns: $("table").html(columns),
                    row: data.data.detail.forEach(function(data, index) {
                        var row = "";
                        row +=
                            "<tr><td>" +
                            data.sBrands +
                            "</td><td>" +
                            parseInt(data.sTotalVileage) +
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
                            '<button type="button" class="error' +
                            data.sDeviceID +
                            ' btn btn-primary" data-toggle="modal" data-target="#' +
                            data.sDeviceID +
                            '">詳細</button></td>';
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
                                modal += "<th>品牌</th>";
                                modal += "<th>型號</th>";
                                modal += "<th>製造商</th>";
                                modal += "<th>編號</th>";
                                modal += "<th>啟用日期</th>";
                                modal += "<th>器材種類</th>";
                                modal += "</tr>";
                                modal += "<tr>";
                                modal += "<td>" + data.sBrands + "</td>";
                                modal += "<td>" + data.sModels + "</td>";
                                var totalMF = "";
                                console.log("data.ucMFnameA ::" + data.ucMFnameA);
                                if (data.ucMFnameA != "null" && totalMF.indexOf(data.ucMFnameA) == -1) {
                                    if (totalMF != "")
                                        totalMF += " , ";
                                    totalMF = totalMF + data.ucMFnameA;
                                }
                                if (data.ucMFnameB != "null" && totalMF.indexOf(data.ucMFnameB) == -1) {
                                    if (totalMF != "")
                                        totalMF += " , ";
                                    totalMF = totalMF + data.ucMFnameB;
                                }
                                if (data.ucMFnameC != "null" && totalMF.indexOf(data.ucMFnameC) == -1) {
                                    if (totalMF != "")
                                        totalMF += " , ";
                                    totalMF = totalMF + data.ucMFnameC;
                                }
                                if (data.ucMFnameD != "null" && totalMF.indexOf(data.ucMFnameD) == -1) {
                                    if (totalMF != "")
                                        totalMF += " , ";
                                    totalMF = totalMF + data.ucMFnameD;
                                }
                                if (data.ucMFnameE != "null" && totalMF.indexOf(data.ucMFnameE) == -1) {
                                    if (totalMF != "")
                                        totalMF += " , ";
                                    totalMF = totalMF + data.ucMFnameE;
                                }
                                modal += "<td>" + totalMF + "</td>";
                                modal += "<td>" + data.sSEID + "</td>";
                                modal += "<td>" + data.sEnableDate.slice(0, 10) + "</td>";
                                modal += "<td>" + data.sActivity + "</td>";
                                modal += "</tr>";
                                modal += "</table>";
                                $(".modal-body").html(modal);
                                $(".modal-title").html("<h4>詳細資料</h4>");
                                // 這邊是讓有異常裝置的 button 可以按，反之不能按
                                // 每按一次就抓一次 ajax , 這邊要改，因效能不好
                                var modalFooterBtn = "";
                                modalFooterBtn +=
                                    '<a data-dismiss="modal" data-toggle="modal" href="#statusData" id="statusDataBtn" class="btn btn-danger">異常</a>';
                                $(".modal-footer span").html(modalFooterBtn);
                                $.ajax({
                                    type: "POST",
                                    url: url + "/api/cpDeviceStatusGet",
                                    data: {
                                        username: shortData.cpAcc,
                                        cpAcc: shortData.cpAcc,
                                        token: cpDataCookie.token,
                                        sDeviceID: JSON.stringify({
                                            contents: [{
                                                sDeviceID: parseInt($thisId)
                                            }]
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
                                    modal += "<th>編號</th>";
                                    modal += "<th>日期</th>";
                                    modal += "<th>時間</th>";
                                    modal += "<th>異常狀態</th>";
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
                                    $("#statusData .modal-title").html("<h4>異常狀態</h4>");
                                    $("#statusData .modal-footer span").html(
                                        '<a class="btn btn-primary" data-dismiss="modal" data-toggle="modal" href="#' +
                                        $thisId +
                                        '"">回詳細資料</a>'
                                    );
                                });
                            });
                        })
                    }
                });
                // 上面比對完的結果用 for in 去抓有異常的 sDeviceID ，如果有就讓 button 變紅色
                for (let i in result) {
                    $(".error" + result[i])
                        .removeClass("btn-primary")
                        .addClass("btn-danger");
                }
                /**
                 * 20171103 發現這個 library 沒辦法讓在第二頁以上的異常 button 顯示紅色，所以用監聽事件去改變它的顏色
                 * 做法是監聽 user 按下去時改變顏色，而會設 setTimeOut 是因為讓 user 點下去時有點延遲，不然會來不及監聽
                 */
                $("a.footable-page-link").on("click", function() {
                    setTimeout(function() {
                        for (let i in result) {
                            $(".error" + result[i])
                                .removeClass("btn-primary")
                                .addClass("btn-danger");
                        }
                    }, 50);
                });
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
    var cpDataCookie = JSON.parse($.cookie("cpDataCookie"));
    // console.log(cpDataCookie);
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
                showProfile += "<h1>公司基本資料</h1>";
                showProfile += "<p>公司名稱： " + shortData.cpName + "</p>";
                showProfile += "<p>公司類別： " + shortData.cpType + "</p>";
                showProfile += "<p>統一編號： " + shortData.taxID + "</p>";
                showProfile += "<p>備註： " + shortData.others + "</p>";
                $(".showProfile").append(showProfile);
            } else {
                showProfile += "<h1>公司基本資料</h1>";
                showProfile += "<p>公司名稱： " + shortData.cpName + "</p>";
                showProfile += "<p>公司類別： " + shortData.cpType + "</p>";
                showProfile += "<p>統一編號： " + shortData.taxID + "</p>";
                showProfile += "<p>備註： " + shortData.others + "</p>";
                $(".showProfile").append(showProfile);
            }
        });
        // $.ajax({
        //   type: "POST",
        //   url: "http://34.216.81.49:9004/api/profileGetIp",
        //   dataType: "json",
        //   data: {
        //     username: cpDataCookie.userName,
        //     token: cpDataCookie.token
        //   },
        //   contentType: "application/x-www-form-urlencoded; charset=utf-8"
        // }).done(function(dataIP) {
        //   console.log(dataIP);
        //   var dataColumns = "";
        //   dataColumns += "<thead>";
        //   dataColumns += "<tr>";
        //   dataColumns += "<th data-type='date'>登入日期</th>";
        //   dataColumns += "<th>IP 位置</th>";
        //   dataColumns += "</tr>";
        //   dataColumns += "</thead>";
        //   $(".tableListForProfile").footable({
        //     columns: $(".tableListForProfile").html(dataColumns),
        //     row: dataIP.data.detail.forEach(function(value) {
        //       var dataRow = "";
        //       var date = value.dateTime.split("T");
        //       var time = date[1].split(".000Z")[0];
        //       dataRow += "<tr><td>" + date[0] + "</td>";
        //       dataRow += "<td>" + value.conreadd.split("::ffff:")[1] + "</td>";
        //       dataRow += "</tr>";
        //       $(".showDataForIP table").append(dataRow);
        //     })
        //   });
        // });
    } else {
        window.location.href = "../index.html";
    }
}
//==============================================觀看公司資訊的相關 function=====================================
$(function() {
    userLogOut();
    getAllCpDeviceData();
});