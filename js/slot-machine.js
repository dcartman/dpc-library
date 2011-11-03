/**
 * This app is meant to opporate as a slot machine on the d • b web site.
 * 
 * the idea is to have three callout boxes on the bottom of the page
 * with a trigger button that will spin the content of each box for a
 * random period of time and then stop on a one piece of content.
 *
 * The box should be bound to the foloowing rules:
 * 1. Each box will act as and independant wheel, each spinning for a
 *    a unique time period.
 * 2. As a box approaches the end of its spin period it should slow down
 *    easing into the final stop.
 * 3. It should not stop between content types.
 * 4. The content items should continue to rotate to the beginning of the
 *    spin cycle.
 *
 * Requires:
 *     jQuery
 *.    jQueryUI
 * 
 * Basic HTML:
 * <div class="slot-machine">
 *     <div class="wheel-housing">
 *         <div class="wheel">
 *             <div class="content"></div>
 *             <div class="content"></div>
 *             <div class="content"></div>
 *             <div class="content"></div>
 *         </div>
 *         <div class="wheel">
 *             <div class="content"></div>
 *             <div class="content"></div>
 *             <div class="content"></div>
 *             <div class="content"></div>
 *         </div>
 *         <div class="wheel">
 *             <div class="content"></div>
 *             <div class="content"></div>
 *             <div class="content"></div>
 *             <div class="content"></div>
 *         </div>  
 *     </div> 
 *     <div class="trigger">
 *         <button type="button">Spin the Wheels</button>
 *     </div>
 * </div>
 *
 * Expected CSS:
 * .slot-machine { position: relative; }
 * .wheel-housing { width: set size; margin: 0px auto; position:relative; }
 * .wheel-housing:after { clear:both; content: "."; display:block; height: 0px; visibility: hidden; }
 * .wheel { float: left; height: set height; overflow: hidden; position: relative; width: set width;
 * .wheel .content {  position: relative; }
 * .trigger {}
 * .trigger button {}
 *
 **/
 
 function SlotMachine(ele,$h) {
 	var me = this,
 		this.element = ele,
 		$h = $h || {};
 	
 	for( var p in $h) {
 		if(h.hasOwnProperty(p)) this[p] = $h[p];
 	}
 	
 	this.element.object = this;
 	this.wheels = [];
 	
 	this.setWheels();
 	this.setTrigger();
 }
 
 SlotMachine.prototype.setWheels= function() {
 	var me = this;
 	$(me.element).find(".wheel").each( function (i, wheel) {
 		me.wheels.push( new Wheel(wheel) );
 	});
 }
 
 SlotMachine.prototype.setTrigger = function() {
 	var me = this;
 }
 
 /* complimentary object to SlotMachine */
 function Wheel(ele, $h) {
 	var me = this,
 		this.element = ele,
 		$h = $h || {};
 	
 	for( var p in $h) {
 		if(h.hasOwnProperty(p)) this[p] = $h[p];
 	}
 	
 	this.element.object = this;
 	me.contentItems = [];
 	
 	me.getContent();
 	
 }
 
 /* This will handling spinning the wheels when the trigger has been pressed */
 Wheel.prototype.spin = function() {
 
 }
 
 /* Handles moving the content items up by adjusting their style.top setting */
 Wheel.prototype.rotateContent = function() {
 
 }
 
 /* Slide content up to the next full piece of content */
 Wheel.prototype.slideUp = function() {
 
 }
 
 /* Slide content down to the next full piece of content */
 Wheel.prototype.slideDown = function() {
 
 }
 
 /* used by Wheel.spin to generate a randome number of seconds */
 Wheel.prototype.generateRandomTime = function() {
 
 }
 
 /* Adds a custom event listener wheel:spin to each piece of content */
 Wheel.prototype.setupContent = function(content) {
 	var me = this;
 	return $(content).bind('wheel:spin', function (event) {
 		var ele = event.currentTarget;
 		if(ele.style.top < 0 && ele.offSetHeight <= Math.abs(ele.style.top)) {
 			var wheel = ele.parent;
 			
 			// move the element to the bottom of the stack
 			ele.style.top = (wheel.contentItems.length - 1) * ele.offSetHeight + ele.style.top;
 			wheel.remove(ele);
 			wheel.append(ele);
 		}
 	});
 }
 
 /* Loads jQuery objects for each piece of content into the Wheel.contentItems array */
 Wheel.prototype.getContent = function() {
 	var me = this;
 	$(me.element).find(".content").each(function (i,content) {
 		me.contentItems.push(me.setupContent(content));
 	});
 }
 
 /* returns a jQuery object containing the top most elementin the list */
 Wheel.prototype.getActiveItem = function() {
 	return $(me.item).find('.content').first();
 }