(function($){	
	$.fn.videoPlayer = function(options){
					
  	var settings = {
			dark : false,
			volume : 0,
		}			
		settings = $.extend(settings, options);
			
		return this.each(function(){				
			
      var s = settings;
		  var video_wrapper = $(this);							
		  var video = document.getElementById(video_wrapper.attr('id')).getElementsByTagName('video')[0];	
			var jQvideo = video_wrapper.children('video');
			var btn_play = video_wrapper.children('.video-controls').children('.btn-play');
			var btn_pause = video_wrapper.children('.video-controls').children('.btn-pause');
			var elapsed_time = video_wrapper.children('.video-controls').children('.elapsed-time'); 		
			var time = null;
								
			video.controls = false;
			video.volume = s.volume;
				
			if(s.dark){
				video_wrapper.addClass('dark-controls');
			}
				
			function currentTime(){
				var s = Math.floor(video.currentTime);
				var m = Math.floor(s/60);
				var sl = s%60;
				if(sl < 10) sl = '0'+sl;
				if(m < 10) m = '0'+m;
				elapsed_time.html(m+':'+sl);	
			}			
											
			btn_play.bind('click', function(e){
				video.play();
			});
				
			btn_pause.bind('click', function(e){
				video.pause();
			});
				
			jQvideo.bind('play', function(e){
				btn_play.fadeOut(200, function(){btn_pause.fadeIn(200);});
				time = setInterval(currentTime, 1000);
			});
				
			jQvideo.bind('pause', function(e){
				btn_pause.fadeOut(200, function(){btn_play.fadeIn(200);});
				clearInterval(time);
			});
				
			jQvideo.bind('ended', function(e){
				btn_pause.fadeOut(200, function(){btn_play.fadeIn(200);});
				clearInterval(time);
				video.pause();
			});							
		});			
	}	
})(jQuery)