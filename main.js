var minutes = $('#minutes').text();
var secs = $('#secs').text();
var start = $('#start');
start.on('click', function(){
    start.attr('disable', 'true');
    console.log(minutes, secs)
    alert(minutes + secs)

})