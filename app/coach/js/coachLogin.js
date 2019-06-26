function checkCookie() {
  if ($.cookie("coachCookie")) {
    window.location.href = "coachMode/mode.html"; // 3/20 0916成功跳轉
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
function userLogin(cb) {
  var $userNameLogin = $("#userLogInName").val();
  var $passwordLogin = $("#userLogInPassword").val();
  $.ajax({
    type: "POST",
    url: url + "login2Server",
    dataType: "json",
    data: {
      username: $userNameLogin,
      password: $passwordLogin
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
      errorMsg += "請檢查您的電子郵件和密碼。</div>";
      $(".errorMsg").html(errorMsg);
      $("#login").on("hidden.bs.modal", function() {
        $("#userLogInName").val("");
        $("#userLogInPassword").val("");
        $(".errorMsg").html("");
      });
    } else {
      loginData = {
        userName: $userNameLogin,
        token: data.data.token
      };
      cb(null, loginData);
    }
  });
}
// 取得 user 的個人資料，當 user 登入後會先抓一次 profileGet api ，如果個人資料有 null 時會再導入 profileSet
// api ，讓 user 去設定個人資料 反之直接登入
function getProfile() {
  userLogin(function(err, loginData) {
    console.log(loginData);
    $.ajax({
      type: "POST",
      url: url + "api/profileGet",
      dataType: "json",
      data: {
        username: loginData.userName,
        token: loginData.token
      }
    }).done(function(data) {
      console.log(data);
      loginData = {
        uClientID: data.data.detail[0].uClientID,
        userName: loginData.userName,
        token: loginData.token
      };
      console.log(loginData);
      $.cookie("coachCookie", JSON.stringify(loginData), {
        expires: 1,
        path: "/"
      });
      console.log($.cookie("coachCookie"));
      console.log(data.data.detail[0].uBirthD);
      //取得個人資料後判斷是否有基本資料，如果有 null 就進到 if 裡設定個人資料
      if (
        data.data.detail[0].uSex === null ||
        data.data.detail[0].uHeight === null ||
        data.data.detail[0].uWeight === null ||
        data.data.detail[0].uCName === null ||
        data.data.detail[0].uBirthD === null
      ) {
        $("#login").modal("hide");
        $("#information").modal("show");
        //  此 function 是讓 user 設定個人資料時無法關閉視窗
        $("#information").modal({
          keyboard: false,
          backdrop: "static"
        });
      } else {
        window.location.href = "coachMode/mode.html";
      }
    });
    //profileGet api 後有 null 時的輸入個人資料表單的傳送 submit button
    $("#informationForm").on("submit", function(e) {
      var userSex = $("input[type='radio'][name='uSex']:checked").val();
      var username = loginData.userName;
      var token = loginData.token;
      $.ajax({
        type: "POST",
        url: url + "api/profileSet",
        dataType: "json",
        data: {
          uCName: $("#uCName").val(),
          username: username,
          uAge: $("#uAge").val(),
          uHeight: $("#uHeight").val(),
          uWeight: $("#uWeight").val(),
          uBirthD: $("#uBirthday").val(),
          uSex: userSex,
          token: token
        },
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        crossDomain: true,
        xhrFields: {
          withCredentials: true
        },
        beforeSend: function() {
          $("#informationBtn").button("loading");
        },
        complete: function() {
          $("#informationBtn").button("reset");
        }
      })
        .done(function(data) {
          console.log(data);
          if (data.result === "true") {
            window.location.href = "coachMode/mode.html";
            //因 api 的年齡格式長度為 2 ，故加個判定
          } else if (
            data.result === "false" &&
            data.data.error.code === "ER_DATA_TOO_LONG"
          ) {
            var errorMsg = "";
            errorMsg += "年齡輸入錯誤 ex：30";
            $(".errorMsg").html(errorMsg);
          }
        })
        .fail(function(xhr) {
          alert("error");
          console.log(xhr.responseText);
        });
      return false;
    });
  });
}
// 傳送登入表單的 submit button ， user 按下後執行 getProfile function
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

//這裡單純 ajax 註冊，完成後去信箱收信
function userSignUp(cb) {
  var $userNameSignUp = $("#username").val();
  var $passwordSignUp = $("#password").val();
  var $userN = $("#userN").val();
  var $userDate = $("#userDate").val();
  $.ajax({
    type: "POST",
    url: url + "signupTemp",
    dataType: "json",
    data: {
      username: $userNameSignUp,
      password: $passwordSignUp,
      uCName: $userN,
      uBirthD: $userDate
    },
    beforeSend: function() {
      $("#signUpBtn").button("loading");
    },
    complete: function() {
      $("#signUpBtn").button("reset");
    },
    contentType: "application/x-www-form-urlencoded; charset=utf-8",
    crossDomain: true,
    xhrFields: {
      withCredentials: true
    }
  }).done(function(data) {
    console.log(data);
    var signUpMsg = "";
    if (data.result === "success" && data.method === "email send") {
      signUpMsg += '<div class="alert alert-success" role="alert">';
      signUpMsg += "成功,前往信箱開啟帳戶</div>";
      $(".signUpDone").html(signUpMsg);
      $(".signUpMsg").html("");
      cb(null, data);
      $("#signup").on("hidden.bs.modal", function() {
        $("#username").val("");
        $("#password").val("");
        $(".signUpDone").html("");
      });
    } else if (
      data.result === "false" &&
      data.data.event === "userName already used"
    ) {
      signUpMsg += "此帳號已被使用";
      $(".signUpMsg").html(signUpMsg);
      $(".signUpDone").html("");
    } else {
      cb(null, data);
    }
  });
}

$("#userSignUpForm").on("focus input", function() {
  if (
    $("#username").val() !== "" &&
    $("#password").val() !== "" &&
    $("#repassword").val() !== "" &&
    $("#userN").val() !== "" &&
    $("#userDate").val() !== ""
  ) {
    $('#userSignUpForm :input[type="submit"]').prop("disabled", false);
    if ($("#password").val() !== $("#repassword").val()) {
      var msgPW = "";
      msgPW += '<div class="alert alert-danger" role="alert">';
      msgPW += "密碼重複輸入錯誤。</div>";
      $(".signUpDone").html(msgPW);
      $("input[name='repassword']").css({
        borderColor: "red"
      });
      $('#userSignUpForm :input[type="submit"]').prop("disabled", true);
    } else {
      $(".signUpDone").html("");
      $("input[name='repassword']").css({
        borderColor: "#276f33"
      });
    }
  } else {
    $(".signUpMsg").html("");
    $(".signUpDone").html("");
    $('#userSignUpForm :input[type="submit"]').prop("disabled", true);
  }
});
$("#userSignUpForm").submit(function() {
  userSignUp(function(err, data) {
    console.log(data);
  });
  return false;
});
/**
 * 當註冊視窗關掉後把 user 輸入的值刪掉
 */
$("#signup").on("hidden.bs.modal", function() {
  $("#username").val("");
  $("#password").val("");
  $("#repassword").val("");
  $("#userN").val("");
  $("#userDate").val("");
  $(".signUpDone").html("");
  $("input[name='repassword']").css({
    borderColor: "#ccc"
  });
  $('#userSignUpForm :input[type="submit"]').prop("disabled", true);
});
/**
 * 忘記密碼的 modal
 */
//當 user 輸入完整的 email 時， button 打開
$("#forgetPWForm").on("focus input", function() {
  if ($("#forgetUserName").val() !== "") {
    $('#forgetPWForm :input[type="submit"]').prop("disabled", false);
  } else {
    $('#forgetPWForm :input[type="submit"]').prop("disabled", true);
    $("#errorText").html("");
  }
});

$("#forgetPWForm").submit(function() {
  var $forgetPW = $("#forgetUserName").val();
  $.ajax({
    type: "POST",
    url: url + "reSendAccSetting",
    data: {
      username: $forgetPW
    },
    beforeSend: function() {
      $(".showLoader").html('<div class="cp-spinner cp-round"></div>');
      $("#forgetBtn").button("loading");
    },
    complete: function() {
      $(".showLoader").html("");
      $("#forgetBtn").button("reset");
    },
    timeout: 5000,
    error: function() {
      $(".showLoader").html("");
      var errorText = "";
      errorText += '<div class="alert alert-danger" role="alert">';
      errorText += "請檢查您的電子郵件。</div>";
      $("#errorText").html(errorText);
    }
  }).done(function(data) {
    console.log(data);
    if (data.result === "success") {
      var doneText = "";
      doneText += '<div class="alert alert-success" role="alert">';
      doneText += "成功,請至您的電子郵件開通帳戶。</div>";
      $("#doneText").html(doneText);
    }
  });
  return false;
});
$("#forgetPW").on("hidden.bs.modal", function() {
  $("#forgetUserName").val("");
  $("#doneText").html("");
  $("#errorText").html("");
  $('#forgetPWForm :input[type="submit"]').prop("disabled", true);
});
/*
============================================================================
註冊頁面
============================================================================
*/
$(function() {
  $('#userSignUpForm :input[type="submit"]').prop("disabled", true);
  $('#userLogInForm :input[type="submit"]').prop("disabled", true);
  $('#informationForm :input[type="submit"]').prop("disabled", true);
  $('#forgetPWForm :input[type="submit"]').prop("disabled", true);
});
