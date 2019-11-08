
var start-btn = $('#start');
var stop-btn = $('#stop')

start-btn.on('click', function(){
	var minutes = $('#minutes').text();
	var secs = $('#secs').text();
    start.attr('disable', 'true');

    var interval = setInterval(startTimer(minutes, secs), 1000);

})

startTimer(minutes, secs) {

	

	if (secs > 0) {
		secs--

	}
}