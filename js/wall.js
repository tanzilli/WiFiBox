$(document).ready(function() {
	var wsCommand = new WebSocket("ws://" + location.host + "/websocket");

	function changeSlide(image) {
		$("#slide").attr("src", image);
	}
	
	// Receiving a message from the server
	wsCommand.onmessage = function (message) {
		//console.log("receiving: " + message.data);
		obj = JSON.parse(message.data);

		if (obj.cmd=="slide") {
			changeSlide(obj.slide);
		}

		if (obj.cmd=="pos") {
			console.log(" ");
			console.log("Ricevuto:",obj.x,obj.y);
			console.log("Dimensioni immagine",$("#slide").width(),$("#slide").height());
			kx=$("#slide").width()/100*obj.x;
			ky=$("#slide").height()/100*obj.y;
			console.log("Posizione x,y:",kx,ky);
			
			$("#target").css("left",kx-$("#target").width()/2);
			$("#target").css("top",ky-$("#target").height()/2);
			$("#target").fadeIn(400).fadeOut(1500);
		}
	};
	
	wsCommand.onopen = function() 	{
		console.log("opened"); 
	};

	wsCommand.onclose = function() 	{
		console.log("disconnected"); 
	};

	
});	
