//initialize Carousel
$( document ).ready(function() {

	//carousel in first screen
	$('.carousel').carousel({
		interval: false
	});

	//Gallery team
	$('.full-item-team').on('click', function(){
		$(this).find('.item-gall-hidden').toggleClass('hidden');
		$(this).find('.pf-name').toggleClass('active-green');

	});

	$(window).on('scroll', function(){
		var docSctop = $(this).scrollTop();
		//console.log(docSctop);
		if(docSctop >= 3300 && docSctop <= 3980){
			$('.header-top').css('background', 'rgba(255,255,255,0.2');
		}
		else{
			$('.header-top').css('background', 'rgba(16,22,54, 0.2');
		}
	});

});

