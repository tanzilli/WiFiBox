function OpenWebSocket() {
	websocket = new WebSocket("ws://" + location.host + "/websocket");
	websocket.onmessage = function (message) {
		console.log("receiving: " + message.data);
		obj = JSON.parse(message.data);

		if (obj.cmd=="slide") {
			changeSlide(obj.slide);
		}
	};
	
	websocket.onopen = function() 	{
		console.log("opened"); 
	};
	websocket.onclose = function() 	{
		console.log("disconnected"); 
	};
	return websocket;
}

function changeSlide(image) {
	$("#slide").attr("src", image);	
}

$(document).ready(function() {
	$("#sergio").click(function() {
		$('.tlt').textillate();
		console.log("hai");
	});	

	
	websocket=OpenWebSocket();

	setInterval(function(){
		if (websocket.readyState > 1) {
			console.log("is closed");
			websocket=OpenWebSocket();
		} else {
			console.log("is open");
		}			
	},3000);

});	
