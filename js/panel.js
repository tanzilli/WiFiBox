// Open a websocket with the server
var wsCommand = new WebSocket("ws://" + location.host + "/websocket");
var thumbSize=128;
var slideList=[];

var slides=[
	["Copertina generica","banner1.jpg","None","None"],
	["Copertina Auditorium","banner1.jpg","Auditorium di Santa Scolastica","5-8 Settembre 2013"],
	["Infopoint 1","wifiinfopoint.jpg","None","None"],
	["Casularo/Damiani","casularo_damiani.jpg","E. Casularo, A. Damiani","Flauto e Liuto"],
	["Segre","segre1.jpg","Emanuele Segre","Chitarra Classica"],
	["Gallucci","gallucci1.jpg","Leonardo Gallucci","Chitarra Classica"],
	["Cafiso","cafiso1.jpg","Francesco Cafiso","Sax"],
	["Milici/Buzzurro/Cafiso","milici_buzzurro_cafiso.jpg","G.Milici, F.Buzzurro, F.Cafiso","Chitarra, Sax, Armonica"],
	["Finger","finger1.jpg","Peter Finger","Chitarra Finger Picking"],
	["Segre/Veneziano","segre_veneziano.jpg","E. Segre, I. Veneziano","Pianoforte e Chitarra Classica"],
	["Veneziano","veneziano1.jpg","Irene Veneziano","Pianoforte"],
	["Borda/Palombo","borda_palombo.jpg","L. Borda, G. Palombo","Duo acustico"],
	["Borda","borda1.jpg","Luis Borda","Chitarra Classica"],
	["Palombo","palombo1.jpg","Giovanni Palombo","Chitarra Acustica"],
	["Buzzurro","buzzurro1.jpg","Francesco Buzzurro","Chitarra Classica"],
];

function liveAll() {
	wsCommand.send('{"cmd":"titolo_1","text":"' + $("#titolo_1_text").val() + '"}');
	wsCommand.send('{"cmd":"titolo_2","text":"' + $("#titolo_2_text").val() + '"}');
}

function sendSlide(slide) {
	wsCommand.send('{"cmd":"slide","slide":"/artisti/' + slide + '"}');
}

function ShowSlidesThumbnail() {
	var contents="";
	
	contents+="<table>";
	for (var i= 0; i < slides.length; i++) {
		contents+="<tr>";
		contents+="<td>";
		contents+="<img class='slide' value='" + i +"' src='/slides_thumb/" + slides[i][1] + "' title='" + slides[i][1] + "'/>";
		contents+="</td>";
		contents+="<td>";
		contents+=slides[i][0];
		contents+="<br/>";
		contents+=slides[i][2];
		contents+="<br/>";
		contents+=slides[i][3];
		contents+="</td>";
		contents+="</tr>";
	}
	contents+="</table>";
	
	$("#thumbnaillist").html(contents);

	$(".slide").click(function() {
		titolo_1=slides[$(this).attr("value")][2];
		titolo_2=slides[$(this).attr("value")][3];
		if (titolo_2=="notext") {
			$("#titolo_1_text").val("");
			$("#titolo_2_text").val("");
		} else {
			$("#titolo_1_text").val(titolo_1);
			$("#titolo_2_text").val(titolo_2);
		}	
		wsCommand.send('{"cmd":"titolo_1","text":"' + $("#titolo_1_text").val() + '"}');
		wsCommand.send('{"cmd":"titolo_2","text":"' + $("#titolo_2_text").val() + '"}');
		wsCommand.send('{"cmd":"slide","image":"' + '/slides/' + $(this).attr("title") + '"}');
	});

}

function ShowThumbnail(slideslist) {
	RefreshThumbnail(slideslist);

	$(window).resize(function() {
		console.log($(document).width());
		RefreshThumbnail(slideslist);
	});
	
	$("#titolo_1_live").click(function() {
		wsCommand.send('{"cmd":"titolo_1","text":"' + $("#titolo_1_text").val() + '"}');
	});
	$("#titolo_2_live").click(function() {
		wsCommand.send('{"cmd":"titolo_2","text":"' + $("#titolo_2_text").val() + '"}');
	});
	$(".select_text").click(function() {
		titolo_1=$(this).find('option:selected').text();
		titolo_2=$(this).val();
		if (titolo_2=="notext") {
			$("#titolo_1_text").val("");
			$("#titolo_2_text").val("");
		} else {
			$("#titolo_1_text").val(titolo_1);
			$("#titolo_2_text").val(titolo_2);
		}	
		liveAll();
		slide_name=$(this).find('option:selected').attr("name");
		if (slide_name!=undefined) {
			sendSlide(slide_name);
		} else {
			sendSlide("banner1.jpg");
		}	
	});

	$(".button_slide").click(function() {
		titolo_1=$(this).text();
		titolo_2=$(this).val();
		if (titolo_2=="notext") {
			$("#titolo_1_text").val("");
			$("#titolo_2_text").val("");
		} else {
			$("#titolo_1_text").val(titolo_1);
			$("#titolo_2_text").val(titolo_2);
		}	
		liveAll();
		slide_name=$(this).attr("name");
		if (slide_name!=undefined) {
			sendSlide(slide_name);
		} else {
			sendSlide("banner1.jpg");
		}	
	});

}

$(document).ready(function() {
	$("#tabs").tabs();
	ShowSlidesThumbnail();
	
	// Load the slides list
	/*
	$.ajax({
		dataType: "json",
		url: "/slideslist",
		type: "get",
		success: function (data,stato) {
			slideslist=data;
			ShowThumbnail(slideslist);
	    },
    	error: function (richiesta,stato,errori) {
        	alert("Error: " + stato);
    	}
	});
	*/

	$("#poll").click(function() {
		wsCommand.send('{"cmd":"poll","text":"Vota il BIS !!"}');
	});
});	
