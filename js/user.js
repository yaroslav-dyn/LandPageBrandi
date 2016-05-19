//initialize Carousel
$( document ).ready(function() {

	 // *Cheking height elem.
	function resizeScreen(elem){
		 var heightElem = elem.height();
		return heightElem;
	}
	//Seting first screen height
	function resizeFirstScreen(){
		var objWindow = $(window);
		var sliderHeight = $('.carousel-wrapper');
		$('.header').height(resizeScreen(objWindow)).css('maxHeight','800px');
		sliderHeight.css({
			'margin-top':resizeScreen(objWindow)/2
		});
	}
	//Callback function
	resizeFirstScreen();

	// *function for checking elem. top position
	function sectionPosition(elPos) {
		var sPos = elPos;
		return sPos.offset().top;
	}


	//carousel in first screen
	$('.carousel').carousel({
		interval: 4000
	});

	//Gallery team
	$('.full-item-team').on('click', function(){
		$(this).find('.item-gall-hidden').toggleClass('hidden');
		$(this).find('.pf-name').toggleClass('active-green');
	});

	//Event scroling
	$(window).on('scroll', function(){
		var docStop = $(this).scrollTop();
		var sectPos = sectionPosition($('#features-section'));
		var sectPosFacts = sectionPosition($('#facts-section'));

		if (docStop  >= sectPos - 350 && docStop <= sectPos + 100){
			$('.item-features').addClass('item-features-anim');
		}

		console.log(docStop + " window");
		console.log(sectPosFacts + " facts");

		if(docStop >= 2350 && docStop <= 2690){
			
			$('#facts-section .heart-img').attr('src','app/img/heart_icon.png');
		}
		else{
			$('#facts-section .heart-img').attr('src','app/img/heart_icon-white.png');
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

