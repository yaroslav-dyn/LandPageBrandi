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