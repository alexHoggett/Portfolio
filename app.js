'use strict';

const allSections = document.querySelector('.section');
const navLinks = document.querySelector('.topnav__list');
const btnScrollTo = document.querySelector('.btn--scroll-to');

const tabs = document.querySelectorAll('.tab-panel__button');
const tabsContainer = document.querySelector('.tab-panel__container');
const tabsContent = document.querySelectorAll('.tab-panel__content');

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

// adding event listener for the entire tabbed componenet
tabsContainer.addEventListener('click', function (e) {

    // Search for closest parent tab
    const clicked = e.target.closest('.tab-panel__button');

    // guard clause in case they click something that is not a tab/button
    if (!clicked) return;

    // remove active state from all tabs
    tabs.forEach(tab => tab.classList.remove('tab-panel__button--active'));

    // remove active content
    tabsContent.forEach(c => c.classList.remove('tab-panel__content--active'));

    // add active state to currently active tab
    clicked.classList.add('tab-panel__button--active');

    // add active state to content
    document.querySelector(`.tab-panel__content--${clicked.dataset.tab}`).classList.add('tab-panel__content--active');
})