var anEntrance= [
	"bounceIn",
	"bounceInUp",
	"bounceInDown",
	"bounceInLeft",
	"bounceInRight",
	"rotateIn",
	"rollIn"
];

var anExit= [
	"bounceOut",
	"bounceOutUp",
	"bounceOutDown",
	"bounceOutLeft",
	"bounceOutRight",
	"rotateOut",
	"rollOut"
];

function OpenWebSocket() {
	websocket = new WebSocket("ws://" + location.host + "/websocket");
	websocket.onmessage = function (message) {
		//console.log("receiving: " + message.data);
		obj = JSON.parse(message.data);
		//console.log("cmd=: " + obj.cmd);
		//console.log("image=: " + obj.image);

		if (obj.cmd=="slide") {
			inIndex=Math.floor((Math.random()*anEntrance.length));
			outIndex=Math.floor((Math.random()*anExit.length));
			
			$('#banner').addClass('animated ' + anExit[outIndex]);
			//console.log(anEntrance[inIndex]);
			//console.log(anExit[outIndex]);
			var wait = window.setTimeout( function(){
					$('#banner').removeClass()
					$('#banner_img').attr('src',obj.image);
					//console.log("receiving: " + obj.image);
					
					$('#banner').addClass('animated ' + anEntrance[inIndex]);
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

		if (obj.cmd=="wallrefresh") {
			console.log(obj.data.length);
			obj.data.forEach(function(entry) {
				console.log(entry.item);
				console.log(entry.perc);
			});
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

	// Controlla a intervalli regolari se la connessione 
	// Winsocket e' attiva
	setInterval(function(){
		if (websocket.readyState > 1) {
			console.log("is closed");
			websocket=OpenWebSocket();
		} else {
			console.log("is open");
		}			
	},3000);

});	
