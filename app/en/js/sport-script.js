function getMessage() {
    var search = document.location.search;
    if (search === '?event=tokenFail') {
        var msg = '';
        msg += '<h1>帳號驗證失敗</h1>';
        msg += '<h2>原因：不明，請通知管理員</h2>';
        msg += '<p><span id="count">5</span> 秒後將自動關閉</p>';
        $('#app').html(msg);
    } else if (search === '?event=vertificationError') {
        var msg = '';
        msg += '<h1>帳號驗證失敗</h1>';
        msg += '<h2>原因：資料庫查詢錯誤，請通知管理員</h2>';
        msg += '<p><span id="count">5</span> 秒後將自動關閉</p>';
        $('#app').html(msg);
    } else if (search === '?event=usernameDup') {
        var msg = '';
        msg += '<h1>帳號驗證失敗</h1>';
        msg += '<h2>原因：此帳號已開通，請勿重複驗證</h2>';
        msg += '<p><span id="count">5</span> 秒後將自動關閉</p>';
        $('#app').html(msg);
    } else if (search === '?event=insertError') {
        var msg = '';
        msg += '<h1>帳號驗證失敗</h1>';
        msg += '<h2>原因：新增帳號錯誤，請通知管理員</h2>';
        msg += '<p><span id="count">5</span> 秒後將自動關閉</p>';
        $('#app').html(msg);
    }
}
getMessage();
function closeWindow() {
    var count = document.getElementById('count');
    var tick = parseInt(count.innerHTML);
    var timer = setInterval(function () {
        if (tick) {
            count.innerHTML = --tick
        } else {
            clearInterval(timer);
            window.close();
        }
    }, 1000)
}

$('#resetPW').submit(function () {
        var getUrl = document.location.search;
        console.log(getUrl);
        var arrData = [];
        if (getUrl.indexOf('?') != -1) {
            var getData = getUrl.split('?');
            var showData = getData[1].split('&');
            console.log(showData);
            for (var i = 0; i < showData.length; i++) {
                var dataVal = showData[i].split('=');
                arrData.push(dataVal[0]);
                arrData[dataVal[0]] = dataVal[1];
            }
            console.log(arrData.token);
        }
        var $password = $('#newPassword').val()
        $
            .ajax({
                type: 'POST',
                url: 'http://54.214.111.32:9004/pcReset',
                data: {
                    username: arrData.username,
                    token: arrData.token,
                    password: $password
                }
            })
            .done(function (data, textStatus, xhr) {
                console.log(data);
                console.log(xhr.status)
                setTimeout(function() {
                    window.location.href = 'http://www.ihoin.com/done.html'
                }, 1000);
            }).fail(function(xhr){
                console.log(xhr.status);
                setTimeout(function() {
                    window.location.href = 'http://www.ihoin.com/done.html'
                }, 1000);
            })
        return false;
    })
