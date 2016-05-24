(function () {

var app = angular.module('LpBrandi', []);

app.controller('itemCTRL',function(){
  this.itemGallery = itemGalleryGems;
  this.linkFooter = itemFooterLinksGem;
  this.itemsTeam = itemTeamGem;
});

var itemGalleryGems = [
  {
      "classItemCategory": "logo",
      "urlImage": "app/img/gallery/gallery-image-1.jpg",
      "catInOverlay":"Logotypes"
  },
  {
      "classItemCategory": "web",
      "urlImage": "app/img/gallery/gallery-image-2.jpg",
      "catInOverlay":"Web"
  },
  {
      "classItemCategory": "photo",
      "urlImage": "app/img/gallery/gallery-image-3.jpg",
      "catInOverlay":"Photography"
  },
  {
      "classItemCategory": "logo",
      "urlImage": "app/img/gallery/gallery-image-4.jpg",
      "catInOverlay":"Logotypes"
  },
  {
      "classItemCategory": "photo",
      "urlImage": "app/img/gallery/gallery-image-5.jpg",
      "catInOverlay":"Photography"
  },
  {
      "classItemCategory": "logo",
      "urlImage": "app/img/gallery/gallery-image-6.jpg",
      "catInOverlay":"Logo design"
  },
  {
      "classItemCategory": "web",
      "urlImage": "app/img/gallery/gallery-image-7.jpg",
      "catInOverlay":"Web"
  },
  {
      "classItemCategory": "brands",
      "urlImage": "app/img/gallery/gallery-image-8.jpg",
      "catInOverlay":"Branding"
  }
];

var itemFooterLinksGem = [
  {
      "headerLink":"Envato",
      "urlLink":"#"
  },
  {
      "headerLink":"Themecurve",
      "urlLink":"#"
  },
  {
      "headerLink":"Kreativeshowcase",
      "urlLink":"#"
  },
  {
      "headerLink":"Freebiescurve",
      "urlLink":"#"
  },
  {
      "headerLink":"Themeforest",
      "urlLink":"#"
  },
  {
      "headerLink":"Microsoft",
      "urlLink":"#"
  },
  {
      "headerLink":"Google",
      "urlLink":"#"
  },
  {
      "headerLink":"Yahoo",
      "urlLink":"#"
  }

];

var itemTeamGem = [
  {
  	"imgUrl": "app/img/gallery/team-1.jpg",
  	"nameCo":"John Filrm Doe",
  	"prof":"Managing Director",
  	"headerDescr":"Nemo enim ipsam voluptatem quia voluptas",
  	"textDescr":"sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem.",
  	"social":[
  		{
  			"class":"fa fa-twitter",
            "title":"Twitter",
            "url":"#"
  		},
        {
            "class":"fa fa-facebook",
            "title":"Facebook",
            "url":"#"
        },
        {
            "class":"fa fa-google-plus",
            "title":"Google +",
            "url":"#"
        }


  	]
  },

  {
    "imgUrl": "app/img/gallery/team-2.jpg",
    "nameCo":"Chystine Hineu",
    "prof":"Lead Designer",
    "headerDescr":"Nemo enim ipsam voluptatem quia voluptas",
    "textDescr":"sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem.",
    "social":[
        {
            "class":"fa fa-twitter",
            "title":"Twitter",
            "url":"#"
        },
        {
            "class":"fa fa-facebook",
            "title":"Facebook",
            "url":"#"
        },
        {
            "class":"fa fa-google-plus",
            "title":"Google +",
            "url":"#"
        }


    ]
  },

    {
    "imgUrl": "app/img/gallery/team-3.jpg",
    "nameCo":"Martin Matrone",
    "prof":"Lead Developer",
    "headerDescr":"Nemo enim ipsam voluptatem quia voluptas",
    "textDescr":"sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem.",
    "social":[
        {
            "class":"fa fa-twitter",
            "title":"Twitter",
            "url":"#"
        },
        {
            "class":"fa fa-facebook",
            "title":"Facebook",
            "url":"#"
        },
        {
            "class":"fa fa-google-plus",
            "title":"Google +",
            "url":"#"
        }
    ]
  },
  {
    "imgUrl": "app/img/gallery/team-4.jpg",
    "nameCo":"Steve Flaulkin",
    "prof":"Sr. UI Designer",
    "headerDescr":"Nemo enim ipsam voluptatem quia voluptas",
    "textDescr":"sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem.",
    "social":[
        {
            "class":"fa fa-twitter",
            "title":"Twitter",
            "url":"#"
        },
        {
            "class":"fa fa-facebook",
            "title":"Facebook",
            "url":"#"
        },
        {
            "class":"fa fa-google-plus",
            "title":"Google +",
            "url":"#"
        }
    ]
  }
]

})();//End app
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

		var headerHeight = $(this).height();
		var headTop = sectionPosition($('#header-top'));

		var factsPos = sectionPosition($('#facts-section'));
		var factsHeight = resizeScreen($('#facts-section'));

		if (docStop  >= sectPos - 350 && docStop <= sectPos + 100){
			$('.item-features').addClass('item-features-anim');
		}

		if(docStop >= 2350 && docStop <= 2690){		
			$('#facts-section .heart-img').attr('src','app/img/heart_icon.png');
		}
		else{
			$('#facts-section .heart-img').attr('src','app/img/heart_icon-white.png');
		}
		/*
		console.log(docStop + " position Window");
		console.log(factsPos + " position facts");
		console.log(factsHeight + " heightfacts");
		*/
		if(headTop >= headerHeight){
			$("#header-top").css('backgroundColor','rgba(30,167,141,.8)');	
		}
		else{
			$("#header-top").css('backgroundColor','rgba(16, 22, 54, 0.2)');	
		}

		if(docStop >= factsPos && docStop <= factsPos + factsHeight ){
			$("#header-top").css('backgroundColor','rgba(16, 22, 54, 0.2)');	
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

	//toggle active class on main nav
	$('.main-nav li').on('click', function(){
		$(this).parent().find('li>a').removeClass('active-full-screen');
		$(this).find('a').addClass('active-full-screen');
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

