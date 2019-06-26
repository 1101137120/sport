function getMessage() {
    var search = document.location.search;
    if (search === '?event=tokenFail') {
        var msg = '';
        msg += '<h1>Account verification failed</h1>';
        msg += '<h2>Cause：Unknown, please notify the administrator</h2>';
        msg += '<p><span id="count">5</span> seconds will automatically turn off</p>';
        $('#app').html(msg);
    } else if (search === '?event=vertificationError') {
        var msg = '';
        msg += '<h1>Account verification failed</h1>';
        msg += '<h2>Cause： Database query error, please notify the administrator</h2>';
        msg += '<p><span id="count">5</span> seconds will automatically turn off</p>';
        $('#app').html(msg);
    } else if (search === '?event=usernameDup') {
        var msg = '';
        msg += '<h1>Account verification failed</h1>';
        msg += '<h2>Cause：This account has been activated, do not repeat the verification</h2>';
        msg += '<p><span id="count">5</span> seconds will automatically turn off</p>';
        $('#app').html(msg);
    } else if (search === '?event=insertError') {
        var msg = '';
        msg += '<h1>Account verification failed</h1>';
        msg += '<h2>Cause：Insert account error, please notify the administrator</h2>';
        msg += '<p><span id="count">5</span> seconds will automatically turn off</p>';
        $('#app').html(msg);
    }
}
getMessage();

function closeWindow() {
    var count = document.getElementById('count');
    var tick = parseInt(count.innerHTML);
    var timer = setInterval(function() {
        if (tick) {
            count.innerHTML = --tick
        } else {
            clearInterval(timer);
            window.close();
        }
    }, 1000)
}

$('#resetPW').submit(function() {
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
            url: 'http://34.216.81.49:9004/pcReset',
            data: {
                username: arrData.username,
                token: arrData.token,
                password: $password
            }
        })
        .done(function(data, textStatus, xhr) {
            console.log(data);
            console.log(xhr.status)
            setTimeout(function() {
                window.location.href = 'http://www.ihoin.com/done.html'
            }, 1000);
        }).fail(function(xhr) {
            console.log(xhr.status);
            setTimeout(function() {
                window.location.href = 'http://www.ihoin.com/done.html'
            }, 1000);
        })
    return false;
})