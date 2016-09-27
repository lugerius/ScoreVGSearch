/*
*
* ScoreVG Search
* Desarrollado: Luis Mendoza @lugerius
* js/engine.js Contiene el motor de busqueda dinámica y las funciones necesarias
*
*/

$(function() {
	$("#sc-widget").hide();
	$( "#autocomplete" ).on( "filterablebeforefilter", function ( e, data ) {
		var ul = $( this ),
		query = $("#suggest").val().toLowerCase(),
		html = "";
		ul.html( "" );
		if ( query && query.length > 1 ) { // A partir de dos caracteres inicia busqueda 
			$("#autocomplete").fadeIn(50);
			ul.html( "<li><div class='ui-loader'><span class='ui-icon ui-icon-loading'></span></div></li>" );
			ul.listview( "refresh" );
			$.getJSON( "js/scorevg.json", function( data ) {
				$.each( data, function( key, val ) {
					$.each (val.tracks, function(llave, valor){
						gameName = valor.game.toLowerCase();
						if (gameName.includes(query) || val.name.toLowerCase().includes(query)) {
							html += '<li><a href="#" class="alltext" onclick="setPlayer(\''+val.url+'\', \''+valor.time+'\');">'+val.name+' T'+valor.id+' - ' + valor.game + '</a></li>';
						}
					})
				});
				ul.html( html );
				ul.listview( "refresh" );
				$('li').removeClass("ui-screen-hidden");
				ul.trigger( "updatelayout");
			});
		}
	});
});


// Configura el player de soundcloud para ir a un episodio y tiempo deseados

function setPlayer (url, time) {
	var timems = timeInMs(time);
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
	$("#sc-widget").delay(1000).fadeIn(3000);
}


// Cambia el tiemo en formato hh:mm:ss a tiempo en milisegundos

function timeInMs(time) {
	var standardTime = time.split(":");
	ms = (parseInt(standardTime[0])*3600000) + (parseInt(standardTime[1])*60000) + (parseInt(standardTime[2]*1000));
	return ms; 
}