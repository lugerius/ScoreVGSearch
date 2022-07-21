/*
*
* ScoreVG Search
* Desarrollado: Luis Mendoza @lugerius
* js/engine.js Contiene el motor de busqueda dinámica y las funciones necesarias
*
*/

$(function() {
	//$("#sc-widget").hide();
	$("#logo").hide();
	$( "#autocomplete" ).on( "filterablebeforefilter", function ( e, data ) {
		var ul = $( this ),
		query = $("#suggest").val().toLowerCase(),
		engine = 'js/score.json?nocache=' + (new Date()).getTime(),
		html = "";
		ul.html( "" );
		if ( query && query.length > 2 ) { // A partir de dos caracteres inicia busqueda 
			$("#autocomplete").fadeIn(50);
			ul.html( "<li><div class='ui-loader'><span class='ui-icon ui-icon-loading'></span></div></li>" );
			ul.listview( "refresh" );
			$.getJSON( engine, function( data ) {
				$.each ( data , function(key, val){
					var score 	= val["0"];
					var uri 	= val["1"];
					var time 	= val["2"];
					var game 	= val["3"].toLowerCase();
					var track 	= val["4"].toLowerCase();
					var year 	= val["5"].toLowerCase();
					var creator = val["6"].toLowerCase();
					var publish	= val["7"].toLowerCase();
					var trackNum= val["9"];
					if (game.includes(query) || track.includes(query) || creator.includes(query) || year.includes(query) || publish.includes(query) || query.includes("svg-"+score+"-")) {
						html += '<li><a href="#" class="alltext" onclick="setPlayer(\''+uri+'\', \''+time+'\');">score-'+score+' T'+trackNum+' - ' + game.toUpperCase() + ' : ' + track + ' | ' + year + '</a></li>';
					}
				})
				ul.html( html );
				ul.listview( "refresh" );
				$('li').removeClass("ui-screen-hidden");
				ul.trigger( "updatelayout");
			});
		}
	});
});


// Configura el player de soundcloud para ir a un episodio y tiempo deseados

function setPlayer (uri, time) {
	var timems = timeInMs(time);
	var url = "https://soundcloud.com/scorevg/"+uri;
	var widgetIframe = document.getElementById('sc-widget'),
	widget       = SC.Widget(widgetIframe);
	widget.unbind (SC.Widget.Events.READY);
	widget.unbind (SC.Widget.Events.PLAY);
	// load new widget
	widget.bind (SC.Widget.Events.READY,function(){
		widget.load(url, {
			auto_play: true,
		});
		widget.bind (SC.Widget.Events.PLAY,function(){
			widget.seekTo(timems);
		});
	});
	
	$("#suggest").val("");
	$("#autocomplete").fadeOut(200);
	$("#sc-widget").delay(1000).fadeIn(2000);
	$("#logo").fadeIn(5000);
}

// Cambia el tiemo en formato hh:mm:ss a tiempo en milisegundos

function timeInMs(time) {
	var standardTime = time.split(":");
	var ms = (parseInt(standardTime[0])*3600000) + (parseInt(standardTime[1])*60000) + (parseInt(standardTime[2]*1000));
	return ms; 
}