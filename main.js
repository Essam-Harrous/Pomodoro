
var $startBtn = $('#start');
var $stopBtn = $('#stop');
var $resetBtn = $('#reset')
var $minutes = $('#minutes')
var $secs = $('#secs')
var pomodoro = 0;
var timeLeft = 0;
var workTime = 0;
var breakTime = 0;
var interva = 0;
var firstClick = true;

$startBtn.on('click', function(){
	$stopBtn.removeAttr('disabled')
	var minutes = $minutes.val();
	var secs = $secs.val();
	if (/[e.+-]/.test(minutes) || /[e.+-]/.test(secs) || '' === secs || '' === minutes) {
		alert("don't do it again HIRs")
	}
    $startBtn.attr('disabled', 'true');
    $minutes.attr('disabled', 'true');
    $secs.attr('disabled', 'true');
    if (firstClick) {
	    workTime = timeInSecs(minutes, secs);
    }
    firstClick = false;
    timeLeft = timeInSecs(minutes, secs);

    interval = setInterval(display, 1000);

})

function timeInSecs(minutes, secs) {
	return parseInt(minutes) * 60 + parseInt(secs);
}


function display() {
	timeLeft--;
	if (timeLeft > 0) {
		var currentSecs = timeLeft % 60;
		var currentMin = Math.floor(timeLeft / 60);
		$minutes.val(currentMin < 10? '0' + currentMin: currentMin);
		$secs.val(currentSecs < 10? '0' + currentSecs: currentSecs);
	}else if (timeLeft == 0) {
		pomodoro++;
		$('#alarm')[0].play();
		timeLeft = Math.floor(workTime / 5);
		$minutes.val(currentMin < 10? '0' + currentMin: currentMin);
		$secs.val(currentSecs < 10? '0' + currentSecs: currentSecs);
	}else {
		return
	}
		$minutes.val(currentMin < 10? '0' + currentMin: currentMin);
		$secs.val(currentSecs < 10? '0' + currentSecs: currentSecs);
}

$stopBtn.on('click', function() {
    $stopBtn.attr('disabled', 'true');
	clearInterval(interval)
	$startBtn.removeAttr('disabled');
})

$resetBtn.on('click', function() {
	clearInterval(interval);
	$minutes.val('25');
	$secs.val('00');
	$startBtn.removeAttr('disabled');
    $minutes.removeAttr('disabled');
    $secs.removeAttr('disabled');
	$stopBtn.removeAttr('disabled');
})