
var $startBtn = $('#start');
var $stopBtn = $('#stop');
var $resetBtn = $('#reset')
var $minutes = $('#minutes')
var $secs = $('#secs')
var $fullPomodoro = $('#fullPomodoro');
var $pomodoroPart = $('#pomodoroPart');

//count the pomodor done
var pomodoro = 0;

//count fullPomodoro
var fullPomodoro = 0

//keep track of the time
var timeLeft = 0;

//save the full work time
var workTime = 0;

//for interval id
var interval = 0;

//check the first click so you can save you full time work
var firstClick = true;

//check if it's break time or not
var breakTime = false;

var $chart = $('#chart');

//it invokes startTimer function when click the start button
$startBtn.on('click', function(){
	startTimer();

})

//calculate the time in secone to be easy to manipulate
function timeInSecs(minutes, secs) {
	return parseInt(minutes) * 60 + parseInt(secs);
}


//it minimize the time left and it displays the current time
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
		stopTimer();
		setTimeout(startTimer, 6000)
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

//it invokes the stop timer function when it invokes
$stopBtn.on('click', function() {
    stopTimer();
})

//it reset all the vriables when reset button clicked
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

//it disable the stop button, clear the interval so stop the timer and display the start button
function stopTimer() {
    $stopBtn.attr('disabled', 'true');
	clearInterval(interval)
	$startBtn.removeAttr('disabled');
}


//it takes the minutes and seconds from the input..
//and disable the start button
//it save the work time and it use set interval to call display function
function startTimer() {
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
		firstClick = false;
    }
    timeLeft = timeInSecs(minutes, secs);

    interval = setInterval(display, 1000);

}