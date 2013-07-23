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

$(document).ready(function() {

	$("#text_in").click(function() {
		$("#titolo").html("<span id='tlt_titolo' data-in-effect='fadeInLeftBig'>Leonardo Gallucci</span>");
		$('#tlt_titolo').textillate();
		$("#contenuto").html("<span id='tlt_contenuto' data-in-effect='fadeInLeftBig'>Sonorità Ladispolesi e altri componimenti in musica dal medioevo ad oggi.</span>");
		$('#tlt_contenuto').textillate();

		$('#titolo').removeClass('animated bounceOutLeft');
		$('#contenuto').removeClass('animated bounceOutRight');

		$('#artista').removeClass('animated bounceOutRight');
		$('#artista').addClass('animated bounceInRight');
		$('#artista').html("<img src='/slides/gallucci_in_piedi.png' />");

		
	});	

	$("#text_out").click(function() {
		$('#titolo').addClass('animated bounceOutLeft');
		$('#contenuto').addClass('animated bounceOutRight');
		$('#artista').removeClass('animated bounceInRight');
		$('#artista').addClass('animated bounceOutRight');
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
