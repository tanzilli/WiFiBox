var currentslide=0
var slideslist=null
var wsCommand = null

function changeSlide(slideIndex) {
	var url = "/slides/" + slideslist[slideIndex];
	$.ajax({ 
		url: url , 
		processData : false,
		cache: true
	}).always(function(){
		$("#slide").attr("src", url);
	});   
}

$(document).ready(function() {
	var wsCommand = new WebSocket("ws://" + location.host + "/websocket");

	// Richiede al server la lista delle immagini da presentare
	$.ajax({
		dataType: "json",
		url: "/slideslist",
		type: "get",
		success: function (data,stato) {
			slideslist=data;
	    },
    	error: function (richiesta,stato,errori) {
        	alert("E' evvenuto un errore. Il stato della chiamata: "+stato);
    	}
	});

	// Passa all'immagine successiva quando viene premuto il tasto prev
	$("#arrow_prev").click(function() {
		if (currentslide>0) {
			currentslide--;
			wsCommand.send('{"cmd":"slide","slide":' + currentslide + '}');
		}
	});

	// Passa all'immagine successiva quando viene premuto il tasto next
	$("#arrow_next").click(function() {
		if (currentslide<(slideslist.length-1)) {
			currentslide++;
			wsCommand.send('{"cmd":"slide","slide":' + currentslide + '}');
		}
	});
	
	$('#slide').click(function(e) {
		console.log(" ");
		var offset = $(this).offset();
		image_w=$(this).width();
		image_h=$(this).height();
		console.log("Dimensioni immagine:",image_w,image_h);
		pos_x=e.clientX;
		pos_y=e.clientY;
		console.log("Posizione x,y:",pos_x,pos_y);
		per_x=pos_x*100/image_w;
		per_y=pos_y*100/image_h;
		console.log("Posizione in %:",per_x,per_y);
		console.log("Trasmesso:",per_x,per_y);
		wsCommand.send('{"cmd":"pos","x":' + per_x + ',"y":' + per_y + '}');
	});

	// Apre un WinSocket con il server
	wsCommand.onopen = function()
	{  
		console.log("Winsocket open");
	}; 

	wsCommand.onmessage = function (message) 
	{
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

	wsCommand.onclose = function()
	{
		console.log("disconnected"); 
	};
});
