// Open a websocket with the server
var websocket = new WebSocket("ws://" + location.host + "/websocket");

websocket.onmessage = function (message) {
	console.log("receiving: " + message.data);
	obj = JSON.parse(message.data);
	
	if (obj.cmd=="poll") {
		$( ".poll_voice" ).each(function(index) {
			if ($(this).val()==obj.text) {
				counter=$(this).next().text();
				counter++;
				$(this).next().text(counter);
			}
		});
	}	
}

function ShowSlidesThumbnail(slide_div,slide_array) {
	var contents="";
	
	for (var i= 0; i < slide_array.length; i++) {
		contents+="<img class='slide' src='/slides_thumb/" + slide_array[i][0] + "' title='" + slide_array[i][0] + "'/>";
		contents+="<br/>";
		contents+="<input type='text' size='80' value=\"" + slide_array[i][1] + "\"/>";
		contents+="<br/>";
		contents+="<input type='text' size='80' value=\"" + slide_array[i][2] + "\"/>";
		contents+="<br/>";
	}
	
	$(slide_div).html(contents);
}


$(document).ready(function() {
	slideSet=[sfondi,artisti];
	slideSet_index=0;
	slide_index=0;
	
	$("#tabs").tabs();
	ShowSlidesThumbnail("#artisti",artisti);
	ShowSlidesThumbnail("#sfondi",sfondi);
	ShowSlidesThumbnail("#veneziano",veneziano);
	ShowSlidesThumbnail("#gallucci",gallucci);
	ShowSlidesThumbnail("#segre",segre);
	ShowSlidesThumbnail("#casularo_damiani",casularo_damiani);

	$(".slide").click(function() {
		titolo_1=$(this).next().next().val();
		titolo_2=$(this).next().next().next().next().val();
		websocket.send('{"cmd":"titolo_1","text":"' + titolo_1 + '"}');
		websocket.send('{"cmd":"titolo_2","text":"' + titolo_2 + '"}');
		websocket.send('{"cmd":"slide","image":"' + '/slides/' + $(this).attr("title") + '"}');
	});

	$("#poll").click(function() {
		websocket.send('{"cmd":"clearpoll"}');
		
		$( ".poll_voice" ).each(function(index) {
			//console.log(index + ": " + $(this).val() );
			websocket.send('{"cmd":"addpoll","text":"' + $(this).val() + '"}');
			$(this).next().text("0");
		});
		
		websocket.send('{"cmd":"showpoll"}');
	});
	
	
	myInterval=setInterval(function() {
		if ($("#presentation").is(':checked')) {
			console.log('{"cmd":"slide","image":"' + '/slides/' + slideSet[slideSet_index][slide_index][0] + '"}');
			websocket.send('{"cmd":"titolo_1","text":"' + slideSet[slideSet_index][slide_index][1] + '"}');
			websocket.send('{"cmd":"titolo_2","text":"' + slideSet[slideSet_index][slide_index][2] + '"}');
			websocket.send('{"cmd":"slide","image":"' + '/slides/' + slideSet[slideSet_index][slide_index][0] + '"}');
			
			slide_index++;
			if (slide_index==slideSet[slideSet_index].length) {
				slide_index=0;
				slideSet_index++;
				if (slideSet_index==slideSet.length) {
					slideSet_index=0;
				}
			}
			
		} else {
			console.log("Not Checked");
			slide_index=0;
			slideSet_index=0;
		}

	},10000);
	
	
});	
