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


});