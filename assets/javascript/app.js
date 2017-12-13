"use strict";

// Hamburger action
let body = document.querySelector( 'body' );
let hamburger = document.querySelector( '.hamburger' );

hamburger.addEventListener( 'click', () => {
	body.classList.toggle( 'menu-open' );
} );

// Go go go
