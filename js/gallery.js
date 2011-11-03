/**
 * This is an image gallery used in the YET Web site
 * to display program and ship images on their show
 * pages.
 *
 * Requires: jQuery and jQueryUI
 * 
 * Usage: 
 * 
 * This object assumes the gallery HTML is defined as follows:
 * <div class="gallery">
 *     <div class="main-view">
 *         <img class="one" />
 *         <img class="two" />
 *     </div>
 *     <div class="thumb-view clearfix">
 *         <img class="one" />
 *         <img class="one" />
 *     </div>
 * </div>
 *
 * The CSS is expected to include:
 * .gallery { position: relative or absolute; }
 * .gallery .main-view { position: relative; }
 * .gallery .main-view img {  left: 0 px; position: absolute; top: 0px; width: 100%; }
 * .gallery .thumb-view { position: relative; }
 * .gallery .thumb-view  img { float:left; position: relative; }
 * .clearfix:after { clear:both; content: "."; display:block; height: 0px; visibility: hidden; } 
 *
 * To activate a Gallery:
 * $(document).ready(function() {
 *     $(".gallery").each(function (i, e) { new Gallery(e); });
 * });
 *
 **/

/**
 * initiate
 **/
$(document).ready(function() {
	$(".gallery").each(function (i, e) { new Gallery(e); });
});

/**
 * @param required ele = DOM element
 * @param optional $h = {} optional
 * @param optional $h.listeners { selector: jQuery selector, action: event, handler: function }
 **/
function Gallery(ele, $h) {
	var me = this,
		this.element = ele
		$h = $h || {};
		
	for( var p in $h) {
		if( $h.hasOwnPropertyOf(p) ) me[p] = $h[p]
	}
	
	me.element.object = this;
	me.images = [];
	
	me.getImages();
	if (me.listeners) me.addListeners(me.listeners);

}

/** 
 * Swaps out the active image using a jQuery UI fade animation.
 * @param newImage = main image Element to activate.
 **/
Gallery.prototype.swapImage= function(newImage) {
	var me = this,
		oldImage = me.getActiveImage();
	me.setActiveImage(newImage);
	$(oldImage).fadeOut();
	$(newImage).fadeIn();
}

Gallery.prototype.setActiveImage = function(image) {
	this.activeImage = image;
}

Gallery.prototype.getActiveImage = function() {
	return this.activeImage;
}

/**
 * Collects the main-view and thumb-view images into hashes and stores them in Gallery.images
 * Gallery.images[] = { "main": jQuery(img), "thumb": jQuery(img) }
 * 
 * Adds an object property to each thumbnail
 * thumb.object = { "gallery": Gallery Object, "mainImage": main img Element
 **/
Gallery.prototype.getImages= function() {
	var me = this;
	$(me.element).find(".main-view img").each(function (i,main) {
		var thumb = $(me.element)
			.find(".thumb-view img." + main.getAttribute("class"))
			.first().each( function (index, thumbEle) { 
				thumbEle.object = { 
					"gallery" = me,
					"mainImage" = main
				}
			});
		me.images.push({ 
			"main": $(main), 
			"thumb": thumb
		});
		me.addThumbnailListener(thumb);
	});

}

/**
 * Sets an onClick listener for the given thumbnail.
 * The handler calls the Gallery.swapImages method passing in the main image Element
 * @param required thumbnail = jQuery(thumb-view image)
 **/
Gallery.prototype.addThumbnailListener = function(thumbnail) {
	thumbnail.click(function(event) {
		var ele = event.currentTarget,
			gallery = ele.object.gallery,
			mainImage = ele.object.mainImage;
		gallery.swapImages(mainImage);
	});
}

Gallery.prototype.addListeners = function(listeners) {
	var me =this;
	listeners.forEach(function (e) {
		$(me.element).find(e.selector).bind(e.action, e.handler);
	});
}