
function OpenWebSocket() {
	var websocket = new WebSocket("ws://" + location.host + "/websocket");
	
	websocket.onmessage=function(message) {
		obj = JSON.parse(message.data);
		if (obj.cmd=="clearpoll") {
			$("#poll_button_div").html("");
			$("#poll_button_div").trigger('create');
			$.mobile.changePage("#poll", "pop");
		}	

		if (obj.cmd=="addpoll") {
			prev_html=$("#poll_button_div").html();
			html="<button class='poll_button'>" + obj.text + "</button>";
			$("#poll_button_div").html(prev_html+html);
		}

		if (obj.cmd=="showpoll") {
			$("#poll_button_div").trigger('create');
			
			$.mobile.changePage("#poll", "pop");
			
			$(".poll_button").click(function() {
				console.log($(this).text());
				websocket.send('{"cmd":"poll","text":"' + $(this).text() + '"}');
			});
		}	
	}
	return websocket;
}	

$(document).ready(function() {
	websocket=OpenWebSocket();

	// Controlla a intervalli regolari se la connessione 
	// Winsocket e' attiva
	setInterval(function(){
		if (websocket.readyState > 1) {
			websocket=OpenWebSocket();
			console.log("Riapro")

		} else {
		}			
	},3000);
});
