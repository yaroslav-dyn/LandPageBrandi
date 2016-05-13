(function () {

    var app = angular.module('LpBrandi', []);

    app.controller('itemGalleryCTRL',function(){
        this.itemGallery = itemGems;
    });

    var itemGems = [
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



})();//End app