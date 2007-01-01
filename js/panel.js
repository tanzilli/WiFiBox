// Open a websocket with the server
var wsCommand = new WebSocket("ws://" + location.host + "/websocket");

var sfondi=[
	["banner1.jpg","",""],
	["banner1.jpg","Auditorium di Santa Scolastica","5-8 Settembre 2013"],
	["wifiinfopoint.jpg","",""],
];

var artisti=[
	["casularo_damiani.jpg","E. Casularo, A. Damiani","Flauto e Liuto"],
	["segre1.jpg","Emanuele Segre","Chitarra Classica"],
	["gallucci1.jpg","Leonardo Gallucci","Chitarra Classica"],
	["cafiso1.jpg","Francesco Cafiso","Sax"],
	["milici_buzzurro_cafiso.jpg","G.Milici, F.Buzzurro, F.Cafiso","Chitarra, Sax, Armonica"],
	["finger1.jpg","Peter Finger","Chitarra Finger Picking"],
	["segre_veneziano.jpg","E. Segre, I. Veneziano","Pianoforte e Chitarra Classica"],
	["veneziano1.jpg","Irene Veneziano","Pianoforte"],
	["borda_palombo.jpg","L. Borda, G. Palombo","Duo acustico"],
	["borda1.jpg","Luis Borda","Chitarra Classica"],
	["palombo1.jpg","Giovanni Palombo","Chitarra Acustica"],
	["buzzurro1.jpg","Francesco Buzzurro","Chitarra Classica"],
];

var veneziano=[
	["galluppi1.jpg","Sonata n.5 in Do maggiore","(Baldassare Galluppi 1706-1785)"],
	["respighi1.jpg","Notturno","(Ottorino Respighi 1879-1936)"],
	["chopin1.jpg","Scherzo op 31","(Fryderyk Chopin 1810-1849)"],
	["camille1.jpg","Etude op 111 n.6 Toccata","(Camille Saint-Saens 1835-1921)"],
];

function ShowSlidesThumbnail(slide_div,slide_array) {
	var contents="";
	
	for (var i= 0; i < slide_array.length; i++) {
		contents+="<img class='slide' src='/slides_thumb/" + slide_array[i][0] + "' title='" + slide_array[i][0] + "'/>";
		contents+="<br/>";
		contents+="<input type='text' size='80' value='" + slide_array[i][1] + "'/>";
		contents+="<br/>";
		contents+="<input type='text' size='80' value='" + slide_array[i][2] + "'/>";
		contents+="<br/>";
	}
	
	$(slide_div).html(contents);
}

$(document).ready(function() {
	$("#tabs").tabs();
	ShowSlidesThumbnail("#sfondi",sfondi);
	ShowSlidesThumbnail("#artisti",artisti);
	ShowSlidesThumbnail("#veneziano",veneziano);

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
});	
