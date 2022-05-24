const allSections = document.querySelectorAll('.section');
const navList = document.querySelector('.navbar__list');
const navbar = document.querySelector('.navbar');
const btnScrollTo = document.querySelector('.btn--scroll-to');

const tabs = document.querySelectorAll('.timeline__tab');
const tabsContainer = document.querySelector('.timeline__tab-container');
const tabsContent = document.querySelectorAll('.timeline__tab-content');
const indicator = document.querySelector('.timeline__tab-indicator');
const burger = document.querySelector('.navbar__burger');
const overlay = document.querySelector('.navbar__overlay');
const sidebar = document.querySelector('.sidebar');
const projects = document.querySelectorAll('.project');
const projectsOverlay = document.querySelector('.projects__overlay')

navList.addEventListener('click', function (e) {
    e.preventDefault();

    if (e.target.classList.contains('navbar__link')) {
        document.querySelector(e.target.getAttribute('href')).scrollIntoView({
          behavior: 'smooth'
        });
         if (burger.classList.contains('navbar__burger--active')){
           burgerToggles();
         }
    }
});

btnScrollTo.addEventListener('click', function (e) {
    const section1 = document.querySelector('#section--1');
    section1.scrollIntoView({
        behavior: 'smooth'
    });
});

const openModal = function(e, id){
  e.preventDefault();
  projectsOverlay.classList.add('projects__overlay--active');
  let modal = document.querySelector(`.project__modal--${id}`);
  modal.classList.add('project__modal--active');
  document.body.classList.add('no-scroll');
}

const closeModal = function(){
  projectsOverlay.classList.remove('projects__overlay--active');
  let modals = document.querySelectorAll(`.project__modal`);
  modals.forEach(modal => {
    modal.classList.remove('project__modal--active');
  })
  document.body.classList.remove('no-scroll');
}

projectsOverlay.addEventListener('click', closeModal);

projects.forEach(project => {
  project.addEventListener('click', function(e){
    if (!e.target.classList.contains('project__git')) openModal(e, project.dataset.id);
  })
})

// Functionality for burger

function burgerToggles(){
  burger.classList.toggle('navbar__burger--active');
  overlay.classList.toggle('navbar__overlay--active');
  document.body.classList.toggle('no-scroll');
  navList.classList.toggle('navbar__list--active');
  sidebar.classList.toggle('sidebar--active');
}

burger.addEventListener('click', (e) => {
  burgerToggles();
})



// ///// ///// ///// ///// ///// ///// ///// ///
// /// Revealing Sections on Scroll
// ///// ///// ///// ///// ///// ///// ///// ///

function revealSection(entries, observer){
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
}

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15
});

allSections.forEach(section => {
  sectionObserver.observe(section);
  section.classList.add('.section--hidden');
});

// ///// ///// ///// ///// ///// ///// ///// ///
// /// tabbed component
// ///// ///// ///// ///// ///// ///// ///// ///


tabs.forEach(tab => {
  tab.addEventListener('click', e => {
    document.querySelector('.timeline__tab--active').classList.remove('timeline__tab--active');

    const tab = e.target;
    tab.classList.add('timeline__tab--active');

    const tabIndex = Array.prototype.indexOf.call(tab.parentNode.children, tab);

    const indicatorWidth = getComputedStyle(indicator).getPropertyValue('width');
    indicator.style.transform = `skewX(15deg) translateX(calc( ${indicatorWidth} * ${tabIndex} ))`;
    indicator.style.width = `calc(${indicatorWidth} + 2%)`;
    setTimeout(() => {
      indicator.style.width = indicatorWidth
    }, 100);

    // change content
    document.querySelector('.timeline__tab-content--active').classList.remove('timeline__tab-content--active');
    document.querySelector(`.timeline__tab-content--${tabIndex + 1}`).classList.add('timeline__tab-content--active');
  })
})


// ///// ///// ///// ///// ///// ///// ///// ///
// /// Parallax tilt effect
// ///// ///// ///// ///// ///// ///// ///// ///

class parallaxTiltEffect {

    constructor({element, tiltEffect}) {
  
      this.element = element;
      this.container = this.element.querySelector(".card");
      this.size = [300, 360];
      [this.w, this.h] = this.size;
  
      this.tiltEffect = tiltEffect;
  
      this.mouseOnComponent = false;
  
      this.handleMouseMove = this.handleMouseMove.bind(this);
      this.handleMouseEnter = this.handleMouseEnter.bind(this);
      this.handleMouseLeave = this.handleMouseLeave.bind(this);
      this.defaultStates = this.defaultStates.bind(this);
      this.setProperty = this.setProperty.bind(this);
      this.init = this.init.bind(this);
  
      this.init();
    }
  
    handleMouseMove(event) {
      const {offsetX, offsetY} = event;
  
      let X;
      let Y;
  
      if (this.tiltEffect === "reverse") {
        X = ((offsetX - (this.w/2)) / 3) / 3;
        Y = (-(offsetY - (this.h/2)) / 3) / 3;
      }
  
      else if (this.tiltEffect === "normal") {
        X = (-(offsetX - (this.w/2)) / 3) / 3;
        Y = ((offsetY - (this.h/2)) / 3) / 3;
      }
  
      this.setProperty('--rY', X.toFixed(2));
      this.setProperty('--rX', Y.toFixed(2));
  
      this.setProperty('--bY', (80 - (X/4).toFixed(2)) + '%');
      this.setProperty('--bX', (50 - (Y/4).toFixed(2)) + '%');
    }
  
    handleMouseEnter() {
      this.mouseOnComponent = true;
      this.container.classList.add("card--active");
    }
  
    handleMouseLeave() {
      this.mouseOnComponent = false;
      this.defaultStates();
    }
  
    defaultStates() {
      this.container.classList.remove("card--active");
      this.setProperty('--rY', 0);
      this.setProperty('--rX', 0);
      this.setProperty('--bY', '80%');
      this.setProperty('--bX', '50%');
    }
  
    setProperty(p, v) {
      return this.container.style.setProperty(p, v);
    }
  
    init() {
      this.element.addEventListener('mousemove', this.handleMouseMove);
      this.element.addEventListener('mouseenter', this.handleMouseEnter);
      this.element.addEventListener('mouseleave', this.handleMouseLeave);
    }
  
}

const cards = document.querySelectorAll('.card__wrapper');
cards.forEach(card => {
    new parallaxTiltEffect({
        element: card,
        tiltEffect: 'reverse'
    })
});

let lastScrollTop;
window.addEventListener('scroll', function(){
  let scrollTop = window.pageYOffset ||
  this.document.documentElement.scrollTop;
  if (scrollTop > lastScrollTop){
    navbar.style.top = '-10rem';
  } else {
    navbar.style.top = '0';
  }
  lastScrollTop = scrollTop;
});



