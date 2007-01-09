// Open a websocket with the server
var wsCommand = new WebSocket("ws://" + location.host + "/websocket");

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
		wsCommand.send('{"cmd":"titolo_1","text":"' + titolo_1 + '"}');
		wsCommand.send('{"cmd":"titolo_2","text":"' + titolo_2 + '"}');
		wsCommand.send('{"cmd":"slide","image":"' + '/slides/' + $(this).attr("title") + '"}');
	});

	$("#poll").click(function() {
		wsCommand.send('{"cmd":"poll","text":"Vota il BIS !!"}');
	});
	
	
	myInterval=setInterval(function() {
		if ($("#presentation").is(':checked')) {
			console.log('{"cmd":"slide","image":"' + '/slides/' + slideSet[slideSet_index][slide_index][0] + '"}');
			wsCommand.send('{"cmd":"titolo_1","text":"' + slideSet[slideSet_index][slide_index][1] + '"}');
			wsCommand.send('{"cmd":"titolo_2","text":"' + slideSet[slideSet_index][slide_index][2] + '"}');
			wsCommand.send('{"cmd":"slide","image":"' + '/slides/' + slideSet[slideSet_index][slide_index][0] + '"}');
			
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
