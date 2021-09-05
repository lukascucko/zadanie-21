(function($) {

	//overlay
	var gallery = $('.gallery-set'),
		overlay = $('<div/>', { id: 'overlay' }),
		overlayImg = $('<img>', { id: 'overlayImg' }),
		overlayClose = $('<div/>', { id: 'close', html: 'x' });	

	overlay.prependTo('body').hide();
	overlayImg.prependTo( overlay );
	overlayClose.prependTo( overlay );

		
	gallery.on('click', 'a', function(event) {
		var imgSource = $(this).attr('href')
			image = overlayImg.attr( 'src', imgSource);

		$(this).addClass('shown');
		
		overlay.addClass('loading');
		image.on('load', function() {
			overlay.fadeIn()
				   .removeClass('loading');
		})
		
		
		event.preventDefault();
	});
	
	// overlay vypnutie na Esc a kliknutie
	
	function overlayFadeOut() { 
		overlay.fadeOut();
		gallery.find('a').removeClass('shown');
	}

	overlayClose.on('click', function() {
		overlayFadeOut();
	});
	
	$(document).on('keyup', function(event) {
		
		if ( event.which === 27)	overlayFadeOut();
	});
	
	//-------------------------------------------------------
	// overlay prepnutie sipkami 'click'
	
	var prevImg = $('<img>', { id: 'prevImg'}),
	nextImg = $('<img>', { id: 'nextImg'});
	
	prevImg.attr( 'src', 'img/left.png').prependTo(overlay);
	nextImg.attr( 'src', 'img/right.png').prependTo(overlay);
	
	function overlaySrc() {
		var imgSource = $('.shown').attr('href');
		
		overlay.fadeIn();
		overlayImg.attr( 'src', imgSource);	
	}
	
	function predchadzajuci() {
		var shownImage = $('.gallery-set').find('a.shown');
		
		shownImage.prev().addClass('shown')
		.next().removeClass('shown');
		
		overlaySrc();
	}

	function dalsi() {
		var shownImage = $('.gallery-set').find('a.shown');

		shownImage.next().addClass('shown')
				  .prev().removeClass('shown');

		overlaySrc();
	}

	prevImg.on('click', function() {
		predchadzajuci();
	});

	nextImg.on('click', function() {
		dalsi();		
	});
		
	// overlay prepnutie sipkami na klavesnici

	$(document).on('keyup', function(event) { 
		if ( event.which === 37 ) 	predchadzajuci();
		else if ( event.which === 39 ) 	dalsi();
	});


	//----------------------------------------------------------
	// prepinanie galerii
	gallery.hide();

	var selected = $('.menu').find('.selected');
	
	function showGallery( selected ) { 

		if ( selected.length ) {
			var id = selected.find('a').attr('href');
			selectedGallery = $(id);
		}

		var newGallery = selectedGallery.length ? selectedGallery : gallery.eq(0);

		gallery.not( newGallery ).hide();

		newGallery.fadeIn();

	}

	showGallery(selected);

	var menu = $('.menu');

	menu.find('a').on('click', function(event) {
		var li = $(this).parent();

		li.addClass('selected')
		  .siblings().removeClass('selected');

		showGallery(li);

		event.preventDefault();
	});

})(jQuery);