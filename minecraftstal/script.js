var _____WB$wombat$assign$function_____ = function(name) {return (self._wb_wombat && self._wb_wombat.local_init && self._wb_wombat.local_init(name)) || self[name]; };
if (!self.__WB_pmw) { self.__WB_pmw = function(obj) { this.__WB_source = obj; return this; } }
{
  let window = _____WB$wombat$assign$function_____("window");
  let self = _____WB$wombat$assign$function_____("self");
  let document = _____WB$wombat$assign$function_____("document");
  let location = _____WB$wombat$assign$function_____("location");
  let top = _____WB$wombat$assign$function_____("top");
  let parent = _____WB$wombat$assign$function_____("parent");
  let frames = _____WB$wombat$assign$function_____("frames");
  let opener = _____WB$wombat$assign$function_____("opener");

$(function() {
	var $audio = $('audio');
	var $message = $('#message');
	var audio = $audio.get(0);
	var autoplay = true;
	
	$('#click-overlay').click(function() {
		if(audio.paused) {
			autoplay = false;
			audio.play();
			$message.show();
			$message.text('Turn up the volume!');
		}
	});
	
	$audio.bind('play', function() {
		if(autoplay) {
			$message.hide();
		}
	});
	
	$audio.bind('pause', function() {
		$message.text('Click to play');
	});
});

}