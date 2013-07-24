function OpenWebSocket() {
	websocket = new WebSocket("ws://" + location.host + "/websocket");
	websocket.onmessage = function (message) {
		console.log("receiving: " + message.data);
		obj = JSON.parse(message.data);

		if (obj.cmd=="slide") {
			$('#banner').addClass('animated bounceOutRight');
			var wait = window.setTimeout( function(){
					$('#banner').removeClass()
					$('#banner_img').attr('src',obj.slide);
					$('#banner').addClass('animated bounceInLeft');
					var wait = window.setTimeout( function(){
						$('#banner').removeClass()},
						1300
					);
				},
				1300
			);
		}

		if (obj.cmd=="titolo_1") {
			$('#titolo_1').removeClass();
			$("#titolo_1").html("<span id='tlt_titolo_1' data-in-effect='fadeInLeftBig'>" + obj.text + "</span>");
			$('#tlt_titolo_1').textillate();
		}
		if (obj.cmd=="titolo_2") {
			$('#titolo_2').removeClass();
			$("#titolo_2").html("<span id='tlt_titolo_2' data-in-effect='fadeInLeftBig'>" + obj.text + "</span>");
			$('#tlt_titolo_2').textillate();
		}
		if (obj.cmd=="titolo_3") {
			$('#titolo_3').removeClass();
			$("#titolo_3").html("<span id='tlt_titolo_3' data-in-effect='fadeInLeftBig'>" + obj.text + "</span>");
			$('#tlt_titolo_3').textillate();
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

$(document).ready(function() {
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
