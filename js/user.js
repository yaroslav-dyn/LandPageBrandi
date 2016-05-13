//initialize Carousel
$( document ).ready(function() {

	//carousel in first screen
	$('.carousel').carousel({
		interval: 4000
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

	//Sort item in gallery
	$('.item-gallery-global').each(function(e){
		e = e+1;
		$(this).attr('data-my-order', e );
	});
	$(function(){
		$('#gal-portfolio').mixItUp();
	});
	//toggle active class on navigation of gallery
	$('.gallery-nav li').on('click', function(){
		$(this).parent().find('li').removeClass('current-cat');
		$(this).parent().find('li>a').removeClass('label label-success');
		$(this).addClass('current-cat');
		$(this).find('a').addClass('label label-success');
	});
	//select category in mobile version
	$(function(){
		var filterSelect = $('#filter-gal-select'),
			container = $('#gal-portfolio');

			container.mixItUp();

		filterSelect.on('change', function(){
			container.mixItUp('filter', this.value);
		});

	});
});

