$(document).ready(function() {
	var wsCommand = new WebSocket("ws://" + location.host + "/websocket");
	console.log("Ci sono");

	function changeSlide(image) {
		$("#slide").attr("src", image);
	}
	
	// Receiving a message from the server
	wsCommand.onmessage = function (message) {
		console.log("receiving: " + message.data);
	};


	$("#tasto1").click(function(){
		wsCommand.send('{"cmd":"slide","slide":"/slides/img001.jpg"}');	
	});	

	$("#tasto2").click(function(){
		wsCommand.send('{"cmd":"slide","slide":"/slides/img002.jpg"}');	
	});	
});	
