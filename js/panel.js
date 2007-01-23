// Open a websocket with the server
var websocket = new WebSocket("ws://" + location.host + "/websocket");

websocket.onmessage = function (message) {
	console.log("receiving: " + message.data);
	obj = JSON.parse(message.data);
	
	// Conteggia i voti in arrivo
	if (obj.cmd=="poll") {
		// Aggiorna i contatori
		total=0
		$( ".poll_voice" ).each(function(index) {
			if ($(this).val()==obj.text) {
				counter=$(this).next().text();
				counter++;
				$(this).next().text(counter);
			}
			total+=parseInt($(this).next().text());
		});

		// Aggiorna le percentuali
		$( ".poll_voice" ).each(function(index) {
			perc=Math.round(parseInt($(this).next().text())*100/total);
			$(this).next().next().next().text(perc);
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

	$("#addpollitem").click(function() {
		if ($(".poll_voice" ).length<10) {
			next_index=$(".poll_voice" ).length+1;
			$("#pollitemdiv" ).append("<label>" + next_index + "</label><input class='poll_voice' type='text'/><label>0</label><label> | </label> <label>0</label><label>%</label><br/>");
		}
	});
		
	$("#removepollitem").click(function() {
		if ($(".poll_voice" ).length>2) {
			$(".poll_voice" ).last().prev().remove();
			$(".poll_voice" ).last().next().remove();
			$(".poll_voice" ).last().next().remove();
			$(".poll_voice" ).last().next().remove();
			$(".poll_voice" ).last().next().remove();
			$(".poll_voice" ).last().next().remove();
			$(".poll_voice" ).last().remove();
		}
	});

	$("#startpoll").click(function() {
		websocket.send('{"cmd":"clearpoll"}');
		
		$( ".poll_voice" ).each(function(index) {
			websocket.send('{"cmd":"addpoll","text":"' + $(this).val() + '"}');
		});
		
		websocket.send('{"cmd":"showpoll"}');
	});
	
	$("#resetpollcounters").click(function() {
		$( ".poll_voice" ).each(function(index) {
			$(this).next().text("0");
			$(this).next().next().next().text("0");
		});
	});

	$("#wallrefresh").click(function() {
		message='{' + '"cmd":"wallrefresh"' + ',';
		message+='"data": [';
		$( ".poll_voice" ).each(function(index) {
			message+='{';
			
			item=$(this).val();
			message+='"item":"' + item + '"' ;

			message+=',';
			
			perc=$(this).next().next().next().text();
			message+='"perc":"' + perc + '"' ;
			
						
			message+='},';
		});
		message=message.slice(0, -1);
		message+=']';
		message+='}';
		console.log(message);
		websocket.send(message);
	});

	
	myInterval=setInterval(function() {
		if ($("#presentation").is(':checked')) {
			//console.log('{"cmd":"slide","image":"' + '/slides/' + slideSet[slideSet_index][slide_index][0] + '"}');
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
			slide_index=0;
			slideSet_index=0;
		}
	},10000);
});	
