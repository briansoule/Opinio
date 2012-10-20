// Avoid `console` errors in browsers that lack a console.
if (!(window.console && console.log)) {
    (function() {
        var noop = function() {};
        var methods = ['assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error', 'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log', 'markTimeline', 'profile', 'profileEnd', 'markTimeline', 'table', 'time', 'timeEnd', 'timeStamp', 'trace', 'warn'];
        var length = methods.length;
        var console = window.console = {};
        while (length--) {
            console[methods[length]] = noop;
        }
    }());
}

$('#add-button').click(function(){
	$('#hidden-field').fadeIn(1000);
	$('#add-button').animate({
    'margin-top' : '93px'
  });
});

// Place any jQuery/helper plugins in here.

Data = {};
Data.yes_percentage = 45;
Data.vote = true;
Data.username = "3565";

// Enable pusher logging - don't include this in production
Pusher.log = function(message) {
if (window.console && window.console.log) window.console.log(message);
};

// Flash fallback logging - don't include this in production
WEB_SOCKET_DEBUG = true;

var pusher = new Pusher('af559ff310637b1d44a8');
var channel = pusher.subscribe('opinio');
channel.bind('action_created', function(data) {
	alert(data.yes_percentage);
	if (data.yes_percentage) {Data.yes_percentage = data.yes_percentage;}
	if (data.vote) {Data.vote = data.vote;}
	if (data.trues) {Data.trues = data.trues;}
	if (data.falses) {Data.falses = data.falses;}
	if (data.username) {Data.username = data.username;
		if (Data.yes_percentage > 0) {
			update();
		}
	}
});
	
	

function update(){
  $('#left-count').animate({
    width: (1 - Data.yes_percentage) * 100 + '%'
  }, 5000, function() {
    // Animation complete.
  });
  
  $('#no-count span').text(Data.falses);
  $('#yes-count span').text(Data.trues);
}