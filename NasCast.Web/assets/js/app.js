var socket = io.connect(window.location.protocol + '//' + window.location.host);

var queue = [];
var processQueue = function() {
	// handle queued events
};

var connected = false;
socket.on('connected', function (data) {
	connected = true;
	processQueue();
});