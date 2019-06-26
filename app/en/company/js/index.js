function checkCookie() {
  if ($.cookie("cpDataCookie")) {
    window.location.href = "list/index.html"; // 3/20 0916成功跳轉
  }
}
/*
============================================================================
檢查是否有cookie，如果沒有就跳回首頁
============================================================================
*/

/*
============================================================================
登入頁面
============================================================================
*/
var url = "http://54.214.111.32:9004/";
//使用 userlogin 取得登入資料，這裡單純 ajax 登入後取得 userName token 資料
function userLogin() {
  var $userNameLogin = $("#userLogInName").val();
  var $passwordLogin = $("#userLogInPassword").val();
  $.ajax({
    type: "POST",
    url: url + "cpLogin",
    dataType: "json",
    data: {
      cpAcc: $userNameLogin,
      cpPassword: $passwordLogin
    },
    contentType: "application/x-www-form-urlencoded; charset=utf-8",
    crossDomain: true,
    xhrFields: {
      withCredentials: true
    },
    beforeSend: function() {
      $("#logInBtn").button("loading");
    },
    complete: function() {
      $("#logInBtn").button("reset");
    }
  }).done(function(data) {
    console.log(data);
    var errorMsg = "";
    if (data.result === "false") {
      errorMsg += '<div class="alert alert-danger" role="alert">';
      errorMsg += "Please check your account and password.</div>";
      $(".errorMsg").html(errorMsg);
      $("#login").on("hidden.bs.modal", function() {
        $("#userLogInName").val("");
        $("#userLogInPassword").val("");
        $(".errorMsg").html("");
      });
    } else {
      loginData = {
        userName: $userNameLogin,
        cpPassword: $passwordLogin,
        token: data.data.token
      };
      $.cookie("cpDataCookie", JSON.stringify(loginData), {
        expires: 1,
        path: "/"
      });
      console.log($.cookie("cpDataCookie"));
      window.location.href = "list/index.html";
    }
  });
}
// 取得 user 的個人資料，當 user 登入後會先抓一次 profileGet api ，如果個人資料有 null 時會再導入 profileSet
// api ，讓 user 去設定個人資料 反之直接登入
function getProfile() {
  userLogin(function(err, loginData) {
    console.log(loginData);

    /*
        $
            .ajax({
                type: 'POST',
                url: url + 'api/profileGet',
                dataType: 'json',
                data: {
                    username: loginData.userName,
                    token: loginData.token
                }
            })
            .done(function (data) {
                console.log(data);
                loginData = {
                    uClientID: data.data.detail[0].uClientID,
                    userName: loginData.userName,
                    token: loginData.token
                };
                console.log(loginData);
                $.cookie('logCookie', JSON.stringify(loginData), {
                    expires: 7,
                    path: '/'
                });
                console.log($.cookie('logCookie'));
                //取得個人資料後判斷是否有基本資料，如果沒有就進到 if 裡設定個人資料
                if (data.data.detail[0].uAge === null && data.data.detail[0].uHeight === null && data.data.detail[0].uWeight === null) {
                    $("#login").modal('hide');
                    $('#information').modal('show');
                } else {
                    window.location.href = 'member/index.html';
                }
            })
        //profileGet api 後有 null 時的輸入個人資料表單
        $('#informationForm').on('submit', function () {
            var userSex = $("input[type='radio'][name='uSex']:checked").val();
            var username = loginData.userName;
            var token = loginData.token;
            //讓使用者輸入他的個人資料
            $.ajax({
                type: 'POST',
                url: url + 'api/profileSet',
                dataType: 'json',
                data: {
                    username: username,
                    uAge: $('#uAge').val(),
                    uHeight: $('#uHeight').val(),
                    uWeight: $('#uWeight').val(),
                    uSex: userSex,
                    token: token
                },
                    contentType: 'application/x-www-form-urlencoded; charset=utf-8',
                    crossDomain: true,
                    xhrFields: {
                        withCredentials: true
                    }
                })
                .done(function (data) {
                    console.log(data);
                    if (data.result === 'true') {
                        window.location.href = 'member/index.html';
                        //因 api 的年齡格式長度為 2 ，故加個判定
                    } else if (data.result === 'false' && data.data.error.code === 'ER_DATA_TOO_LONG') {
                        var errorMsg = '';
                        errorMsg += '年齡輸入錯誤 ex：30'
                        $('.errorMsg').html(errorMsg);
                    }
                })
                .fail(function (xhr) {
                    alert('error');
                    console.log(xhr.responseText);
                })
            return false;
        })
        */
  });
}

$("#userLogInForm").submit(function() {
  getProfile();
  return false;
});
// user 輸入完整的帳號密碼後，登入的 button 才可以按
$("#userLogInForm").on("focus input", function() {
  if (
    $("#userLogInName").val() !== "" &&
    $("#userLogInPassword").val() !== ""
  ) {
    $('#userLogInForm :input[type="submit"]').prop("disabled", false);
  } else {
    $('#userLogInForm :input[type="submit"]').prop("disabled", true);
    $(".errorMsg").html("");
  }
});
// user 輸入完整的個人資料後開啟 button 按鈕
$("#informationForm").on("focus input", function() {
  if (
    $("#uAge").val() !== "" &&
    $("#uHeight").val() !== "" &&
    $("#uWeight").val() !== ""
  ) {
    $('#informationForm :input[type="submit"]').prop("disabled", false);
    //因 api 的年齡格式長度為 2 ，故加個判定
    if ($("#uAge").val().length <= 2 || $("#uAge").val() === "") {
      $(".errorMsg").html("");
    }
  } else {
    $('#informationForm :input[type="submit"]').prop("disabled", true);
  }
});
/*
============================================================================
登入頁面
============================================================================
*/
/*
============================================================================
註冊頁面
============================================================================
*/

//這裡單純 ajax 註冊
function userSignUp(cb) {
  var $userNameSignUp = $("#username").val();
  var $passwordSignUp = $("#password").val();
  var $cpName = $("#cpName").val();
  var $taxID = $("#taxID").val();
  var $cpType = $("#cpType").val();
  var $others = $("#others").val();
  $.ajax({
    type: "POST",
    url: url + "cpDataSet",
    dataType: "json",
    data: {
      cpAcc: $userNameSignUp,
      cpPassword: $passwordSignUp,
      cpName: $cpName,
      taxID: $taxID,
      cpType: $cpType,
      others: $others
    },
    contentType: "application/x-www-form-urlencoded; charset=utf-8",
    crossDomain: true,
    xhrFields: {
      withCredentials: true
    }
  }).done(function(data) {
    console.log(data);
    var signUpMsg = "";
    if (data.result === "true" && data.data.event === "cpDataSet success") {
      signUpMsg += "Done";
      $(".signUpDone").html(signUpMsg);
      $(".signUpMsg").html("");
      $(".taxIdMsg").html("");
      cb(null, data);
      $("#signup").on("hidden.bs.modal", function() {
        $("#username").val("");
        $("#password").val("");
        $(".signUpDone").html("");
      });
    } else if (
      data.result === "false" &&
      data.data.event === "cpDataSet fail"
    ) {
      if ($taxID.length !== 8) {
        signUpMsg += "Please enter eight numbers";
        $(".taxIdMsg").html(signUpMsg);
      } else {
        signUpMsg += "This account has been used";
        $(".signUpMsg").html(signUpMsg);
        $(".signUpDone").html("");
        $(".taxIdMsg").html("");
      }
    } else {
      cb(null, data);
    }
  });
}

$("#userSignUpForm").on("focus input", function() {
  if ($("#username").val() === "") {
    $(".signUpMsg").html("");
    $(".signUpDone").html("");
    $('#userSignUpForm :input[type="submit"]').prop("disabled", true);
  } else {
    $('#userSignUpForm :input[type="submit"]').prop("disabled", false);
  }
});
$("#userSignUpForm").submit(function() {
  userSignUp(function(err, data) {
    console.log(data);
  });
  return false;
});
/*
============================================================================
註冊頁面
============================================================================
*/
$(function() {
  checkCookie();
  $('#userSignUpForm :input[type="submit"]').prop("disabled", true);
  $('#userLogInForm :input[type="submit"]').prop("disabled", true);
  $('#informationForm :input[type="submit"]').prop("disabled", true);
  var socket = io.connect("http://35.167.221.25:3005");
  socket.on("onEvent1", function(data) {
    console.log(data);
    socket.emit("TestEcho", { my: "data" });
  });
  socket.on("onTestEcho", function(data) {
    console.log(data.data.my);
  });
});
