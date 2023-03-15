/**	
	* Template Name: Eventoz
	* Version: 1.0	
	* Template Scripts
	* Author: MarkUps
	* Author URI: http://www.markups.io/

	Custom JS
	
	1. FIXED MENU
	2. EVENT TIME COUNTER
	3. MENU SMOOTH SCROLLING
	4. VIDEO POPUP
	5. SPEAKERS SLIDEER ( SLICK SLIDER )
	6. BOOTSTRAP ACCORDION 
	7. MOBILE MENU CLOSE  
	
	
**/


import { organizersEn } from "./constants.js";
(function ($) {



	/* ----------------------------------------------------------- */
	/*  1. FIXED MENU
	/* ----------------------------------------------------------- */


	jQuery(window).bind('scroll', function () {
		if ($(window).scrollTop() > 150) {
			$('.mu-navbar').addClass('mu-nav-show');

		} else {
			$('.mu-navbar').removeClass('mu-nav-show');
		}
	});

	/* ----------------------------------------------------------- */
	/*  2. EVENT TIME COUNTER
	/* ----------------------------------------------------------- */

	$('#mu-event-counter').countdown('2023/04/28').on('update.countdown', function (event) {
		var $this = $(this).html(event.strftime(''
			+ '<span class="mu-event-counter-block"><span>%D</span> Días</span> '
			+ '<span class="mu-event-counter-block"><span>%H</span> Horas</span> '
			+ '<span class="mu-event-counter-block"><span>%M</span> Mins</span> '
			+ '<span class="mu-event-counter-block"><span>%S</span> Segs</span>'));
	});


	/* ----------------------------------------------------------- */
	/*  3. MENU SMOOTH SCROLLING
	/* ----------------------------------------------------------- */

	//MENU SCROLLING WITH ACTIVE ITEM SELECTED

	// Cache selectors
	var lastId,
		topMenu = $(".mu-menu"),
		topMenuHeight = topMenu.outerHeight() + 13,
		// All list items
		menuItems = topMenu.find('a[href^=\\#]'),
		// Anchors corresponding to menu items
		scrollItems = menuItems.map(function () {
			var item = $($(this).attr("href"));
			if (item.length) { return item; }
		});

	// Bind click handler to menu items
	// so we can get a fancy scroll animation
	menuItems.click(function (e) {
		var href = $(this).attr("href"),
			offsetTop = href === "#" ? 0 : $(href).offset().top - topMenuHeight + 22;
		jQuery('html, body').stop().animate({
			scrollTop: offsetTop
		}, 1500);
		e.preventDefault();
	});

	// Bind to scroll
	jQuery(window).scroll(function () {
		// Get container scroll position
		var fromTop = $(this).scrollTop() + topMenuHeight;

		// Get id of current scroll item
		var cur = scrollItems.map(function () {
			if ($(this).offset().top < fromTop)
				return this;
		});
		// Get the id of the current element
		cur = cur[cur.length - 1];
		var id = cur && cur.length ? cur[0].id : "";

		if (lastId !== id) {
			lastId = id;
			// Set/remove active class
			menuItems
				.parent().removeClass("active")
				.end().filter("[href=\\#" + id + "]").parent().addClass("active");
		}
	})



	/* ----------------------------------------------------------- */
	/*  4. VIDEO POPUP
	/* ----------------------------------------------------------- */

	$('.mu-video-play-btn').on('click', function (event) {

		event.preventDefault();

		$('.mu-video-iframe-area').addClass('mu-video-iframe-display');

	});

	// when click the close btn

	// disappear iframe window

	$('.mu-video-close-btn').on('click', function (event) {

		event.preventDefault();

		$('.mu-video-iframe-area').removeClass('mu-video-iframe-display');

	});

	// stop iframe if it is play while close the iframe window

	$('.mu-video-close-btn').click(function () {

		$('.mu-video-iframe').attr('src', $('.mu-video-iframe').attr('src'));

	});

	// when click overlay area

	$('.mu-video-iframe-area').on('click', function (event) {

		event.preventDefault();

		$('.mu-video-iframe-area').removeClass('mu-video-iframe-display');

	});

	$('.mu-video-iframe-area, .mu-video-iframe').on('click', function (e) {
		e.stopPropagation();
	});


	/* ----------------------------------------------------------- */
	/*  5. SPEAKERS SLIDEER ( SLICK SLIDER )
	/* ----------------------------------------------------------- */

	$('.mu-speakers-slider').slick({
		slidesToShow: 4,
		responsive: [
			{
				breakpoint: 768,
				settings: {
					arrows: true,
					slidesToShow: 3
				}
			},
			{
				breakpoint: 480,
				settings: {
					arrows: true,
					slidesToShow: 1
				}
			}
		]
	});





	/* ----------------------------------------------------------- */
	/*  6. BOOTSTRAP ACCORDION 
	/* ----------------------------------------------------------- */

	/* Start for accordion #1*/
	$('#accordion .panel-collapse').on('shown.bs.collapse', function () {
		$(this).prev().find(".fa").removeClass("fa-angle-up").addClass("fa-angle-down");
	});

	//The reverse of the above on hidden event:

	$('#accordion .panel-collapse').on('hidden.bs.collapse', function () {
		$(this).prev().find(".fa").removeClass("fa-angle-down").addClass("fa-angle-up");
	});


	/* ----------------------------------------------------------- */
	/*  7. MOBILE MENU CLOSE 
	/* ----------------------------------------------------------- */

	jQuery('.mu-menu').on('click', 'li a', function () {
		$('.mu-navbar .in').collapse('hide');
	});

	/* ----------------------------------------------------------- */
	/*  8. ORGANIZER POP UP
	/* ----------------------------------------------------------- */

	$('.mu-single-organizer').on('click', function (event) {
		const hostname = 'http://' + window.location.hostname;
		console.log("organizersEn", organizersEn[0]);
		console.log("hostname:",);
		event.preventDefault();
		const currId = event.currentTarget.id;
		const currOrg = organizersEn.filter(org => org.id === currId)[0]
		$('#mu-org-name').html(currOrg.name)
		$('#bio-pic').attr('src',`${hostname}/col_conference/assets/images/${currOrg.pic}`)
		$('#bio-text').html(currOrg.bio)
		$('#bio-sumary').html(currOrg.bioSumary)
		$('.mu-orginizer-frame').addClass('mu-video-iframe-display');

	});

	// when click the close btn

    // disappear iframe window
    
		$('#mu-close-about').on('click', function (event) {
			event.preventDefault();
			$('.mu-orginizer-frame').removeClass('mu-video-iframe-display');
	
		});



})(jQuery);




