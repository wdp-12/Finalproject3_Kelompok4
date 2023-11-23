window.addEventListener('scroll', e => {
	document.documentElement.style.setProperty('--scrollTop', `${this.scrollY}px`) // Update method
})
gsap.registerPlugin(ScrollTrigger, ScrollSmoother)
ScrollSmoother.create({
	wrapper: '.wrapper',
	content: '.content'
})
const track = document.querySelector('.carousel-track');
const images = document.querySelectorAll('.carousel-image');
const options = { duration: 1200, fill: 'forwards' };

function start(e) {
  e.preventDefault();
  track.dataset.mousedown = e.clientX;
  track.classList.add('grabbing');
  track.addEventListener('pointerleave',end,false);
}

function move(e) {
  if (track.dataset.mousedown === '0') return;
  const dist = e.clientX - Number(track.dataset.mousedown);
  const speed = window.innerWidth/1.25;
  const percentage = (dist/speed) * 100;
  let nextPercentage = Number(track.dataset.prevPercentage) + percentage; 
  nextPercentage = Math.min(0,nextPercentage);
  nextPercentage = Math.max(nextPercentage,((window.innerWidth/track.clientWidth)*100) - 100);
  track.dataset.percentage = nextPercentage;
  track.animate({transform:`translate(${nextPercentage}%,-50%)`},options);
  images.forEach((image) => image.animate({objectPosition: `${nextPercentage+100}% 50%`},options));
}

function end() {
  track.dataset.mousedown = '0'; 
  track.dataset.prevPercentage = track.dataset.percentage;
  track.classList.remove('grabbing');
}

track.addEventListener('pointerdown',start,false);
track.addEventListener('pointermove',move,false);
track.addEventListener('pointerup',end,false);