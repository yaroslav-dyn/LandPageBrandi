(function () {

var app = angular.module('LpBrandi', []);

app.controller('itemCTRL',function(){
  this.itemGallery = itemGalleryGems;
  this.linkFooter = itemFooterLinksGem;
  this.itemsTeam = itemTeamGem;
});
app.controller('modelView', function($scope){
   $scope.emailLabel = "Your e-mail: ";
});
var itemGalleryGems = [
  {
      "classItemCategory": "logo",
      "urlImage": "img/gallery/gallery-image-1.jpg",
      "catInOverlay":"Logotypes"
  },
  {
      "classItemCategory": "web",
      "urlImage": "img/gallery/gallery-image-2.jpg",
      "catInOverlay":"Web"
  },
  {
      "classItemCategory": "photo",
      "urlImage": "img/gallery/gallery-image-3.jpg",
      "catInOverlay":"Photography"
  },
  {
      "classItemCategory": "logo",
      "urlImage": "img/gallery/gallery-image-4.jpg",
      "catInOverlay":"Logotypes"
  },
  {
      "classItemCategory": "photo",
      "urlImage": "img/gallery/gallery-image-5.jpg",
      "catInOverlay":"Photography"
  },
  {
      "classItemCategory": "logo",
      "urlImage": "img/gallery/gallery-image-6.jpg",
      "catInOverlay":"Logo design"
  },
  {
      "classItemCategory": "web",
      "urlImage": "img/gallery/gallery-image-7.jpg",
      "catInOverlay":"Web"
  },
  {
      "classItemCategory": "brands",
      "urlImage": "img/gallery/gallery-image-8.jpg",
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
  	"imgUrl": "img/gallery/team-1.jpg",
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
    "imgUrl": "img/gallery/team-2.jpg",
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
    "imgUrl": "img/gallery/team-3.jpg",
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
    "imgUrl": "img/gallery/team-4.jpg",
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
		var sectPosTeam = sectionPosition($('#team-section'));

		var headerHeight = $(this).height();
		var headTop = sectionPosition($('#header-top'));

		var factsPos = sectionPosition($('#facts-section'));
		var factsHeight = resizeScreen($('#facts-section'));

		if (docStop  >= sectPos - 350 && docStop <= sectPos + 100){
			$('.item-features').addClass('item-features-anim');
		}

		if (docStop <= factsPos+27 && docStop >= factsPos+21){
			function allFull(){
				//function with method
				function animateNumberLp(idF,numberF,timeF){		
					var idF;
					var numberF;
					var timeF;

					idF.animateNumber( 
						    {
						      number:numberF 
						    },
				    	timeF
				    )
				}	
				animateNumberLp($('#facts-0'),3200,3800);
				animateNumberLp($('#facts-1'),120,3800);
				animateNumberLp($('#facts-2'),360,3800);
				animateNumberLp($('#facts-3'),42,3800);
			}
			allFull();

		}		
		if(docStop >= 2350 && docStop <= 2690){		
			$('#facts-section .heart-img').attr('src','img/heart_icon.png');
		}
		else{
			$('#facts-section .heart-img').attr('src','img/heart_icon-white.png');
		}
	
		console.log(docStop + " position Window");
		console.log(factsPos + " position facts");

		
		if(headTop >= headerHeight){
			$("#header-top").css('backgroundColor','rgba(30,167,141,.8)');	
		}
		else{
			$("#header-top").css('backgroundColor','rgba(16, 22, 54, 0.2)');	
		}

		if(docStop >= factsPos && docStop <= factsPos + factsHeight ){
			$("#header-top").css('backgroundColor','rgba(16, 22, 54, 0.2)');	
		}
		if(docStop >= sectPosTeam - 200){
			$('.full-item-team').addClass('animate-w-delay');
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
	//animate number facts 
	//add unique id
	$('.facts-info strong').each(function(e){
		$(this).attr('id','facts-' + e);
	});

});