/**
 * Object SideNavi
 * public methods : init
 * init param : Object css data
 */

var SideNavi = ( function () {

	var container = {},
		config = {},
		posStep = 30,
		posStart = null,
		posEnd = null,
		isSlideing = false,
		isVisible = false,
		activeIndex = -1,
		changeVisibility = false;

	function getPosStart () {
		if (posStart === null) {
			posStart = jQuery(config.item + ':eq(0)', container).height()*1;
		}
		return posStart;
	}
	function getPosEnd () {
		if (posEnd === null) {
			posEnd = jQuery(config.item + ':eq(0)', container).height()*1;
			posEnd += jQuery(config.data, container).width()*1;
		}
		return posEnd;
	}
	function getPos (){
		return container.css('right').replace('px','');
	}
	function toggleIsVisible () {
		isVisible = !(isVisible);
	}
	function isActiveItem (item) {
		return item.hasClass('active');
	}
	function setActiveTab () {
		jQuery(config.tab + config.active, container).removeClass(config.active.replace('.',''));
		jQuery(config.tab + ':eq(' + activeIndex + ')',container).addClass(config.active.replace('.',''));
	}
	function removeActiveItem () {
		jQuery(config.item + config.active, container).removeClass('active');
	}
	function setActiveItem (item) {
		removeActiveItem();
		item.addClass('active');
	}
	function slideEvent () {

		var pos = getPos()*1;

		if ( isVisible && pos < getPosEnd () || ! isVisible && pos > getPosStart ()  ) {

			pos = (isVisible) ?  pos+posStep : pos-posStep;

			if (isVisible && pos + posStep >= getPosEnd () || ! isVisible && pos - posStep <= getPosStart ()) {

				pos = (isVisible) ?  getPosEnd () : getPosStart ();
				container.css('right', pos+'px');
				isSlideing = false;

			} else {
				container.css('right', pos+'px');
				setTimeout(function () {slideEvent()}, 20 );
			}

		} else {
			isSlideing = false;
		}

	}
	function slide () {
		if ( ! isSlideing) {
			isSlideing = true;
			slideEvent();
		}
	}
	function setEventParam (item) {

		activeIndex = jQuery(config.item, container).index(item);

		if (isActiveItem(item)) {

			toggleIsVisible();
			removeActiveItem();
			changeVisibility = true;

		} else {

			setActiveItem(item);

			if ( ! isVisible) {
				toggleIsVisible();
				changeVisibility = true;
			}
		}
	}
	function eventListener () {

		jQuery(config.item, container).on('click', function (event) {

			event.preventDefault();
			setEventParam(jQuery(this));
			
			if (isVisible) { setActiveTab(); }
			
			if (changeVisibility) {
				
				slide();
				
			}
		});
	}
	function init (conf) {

		config = conf;
		container = jQuery(config.container);

		eventListener();
	}

	return {
		init : init
	}

})();