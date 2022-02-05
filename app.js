'use strict';

const allSections = document.querySelector('.section');
const navLinks = document.querySelector('.topnav__list');
const btnScrollTo = document.querySelector('.btn--scroll-to');

navLinks.addEventListener('click', function (e) {
    e.preventDefault();

    if (e.target.classList.contains('topnav__link')) {
        document.querySelector(e.target.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    }
});

btnScrollTo.addEventListener('click', function (e) {
    const section1 = document.querySelector('#section--1');
    section1.scrollIntoView({
        behavior: 'smooth'
    });
});