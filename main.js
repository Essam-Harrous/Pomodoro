
var $startBtn = $('#start');
var $stopBtn = $('#stop');
var $resetBtn = $('#reset')
var $minutes = $('#minutes')
var $secs = $('#secs')
var $fullPomodoro = $('#fullPomodoro');
var $pomodoroPart = $('#pomodoroPart');
var pomodoro = 0;
var fullPomodoro = 0
var timeLeft = 0;
var workTime = 0;
var interval = 0;
var firstClick = true;
var breakTime = false;

var $chart = $('#chart');

$startBtn.on('click', function(){
	$stopBtn.removeAttr('disabled');
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
		console.log(workTime, 'fsfs');
		firstClick = false;
    }
    timeLeft = timeInSecs(minutes, secs);

    interval = setInterval(display, 1000);

})

function timeInSecs(minutes, secs) {
	return parseInt(minutes) * 60 + parseInt(secs);
}


function display() {
	timeLeft--;
	if (timeLeft === 0) {
		$minutes.val('00');
		$secs.val('00')
		$('#alarm')[0].play();
		$chart.data('easyPieChart').update(0);
		breakTime = !breakTime;
		if (breakTime) {
			pomodoro++;
			if (pomodoro === 4) {
				pomodoro = 0;
				fullPomodoro++;
				$fullPomodoro.text(fullPomodoro);
				timeLeft = (workTime / 5 * 3);
				$chart.data('easyPieChart').update(timeLeft * 100 / (workTime / 5 * 3))
			}else {
				timeLeft = (workTime / 5);
				$chart.data('easyPieChart').update(timeLeft * 100 / (workTime / 5))
			}
			$pomodoroPart.text(pomodoro);
		}else {
			timeLeft = workTime;
		}
	}else {
		if (breakTime && pomodoro == 0) {
			$chart.data('easyPieChart').update(timeLeft * 100 / (workTime / 5 * 3))
		}else if(breakTime) {
			$chart.data('easyPieChart').update(timeLeft * 100 / (workTime / 5))
		}else {
			$chart.data('easyPieChart').update(timeLeft * 100 / workTime)
		}
	}

	var currentSecs = timeLeft % 60;
	var currentMin = Math.floor(timeLeft / 60);
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
	$chart.data('easyPieChart').update(100);
	pomodoro = 0;
	$pomodoroPart.text(0)
	fullPomodoro = 0;
	$fullPomodoro.text(0);
	timeLeft = 0;
	workTime = 0;
	interval = 0;
	firstClick = true;
	breakTime = false;

})