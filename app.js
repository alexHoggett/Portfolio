'use strict';

const allSections = document.querySelector('.section');
const navLinks = document.querySelector('.topnav__list');

console.log(allSections);
console.log(navLinks);

navLinks.addEventListener('click', function(e) {
    e.preventDefault();

    if (e.target.classList.contains('topnav__link')){
        document.querySelector(e.target.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    }
})