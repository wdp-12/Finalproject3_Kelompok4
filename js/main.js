
const heroSocrates = document.querySelector(".hero__socrates");
const heroMoon = document.querySelector(".hero__moon");
const heroContent = document.querySelector(".hero__content");
const bioContent = document.querySelector(".biography .bio-content");

window.addEventListener('scroll', function (e) {
    heroMoon.style.transform = `translateY(${this.scrollY / 1.35}px)`;

    heroContent.style.transform = `translateY(${(this.scrollY / 2)}px)`;

    heroSocrates.style.transform = `translateY(-${this.scrollY / 5}px)`;

    bioContent.style.transform = `translateY(-${this.scrollY / 2}px)`;
});


const track = document.querySelector('.carousel-track');
const images = document.querySelectorAll('.carousel-image');
const options = { duration: 1200, fill: 'forwards' };

function start(e) {
    e.preventDefault();
    track.dataset.mousedown = e.clientX;
    track.classList.add('grabbing');
    track.addEventListener('pointerleave', end, false);
}

function move(e) {
    if (track.dataset.mousedown === '0') return;
    const dist = e.clientX - Number(track.dataset.mousedown);
    const speed = window.innerWidth / 1.25;
    const percentage = (dist / speed) * 100;
    let nextPercentage = Number(track.dataset.prevPercentage) + percentage;
    nextPercentage = Math.min(0, nextPercentage);
    nextPercentage = Math.max(nextPercentage, ((window.innerWidth / track.clientWidth) * 100) - 100);
    track.dataset.percentage = nextPercentage;
    track.animate({ transform: `translate(${nextPercentage}%,-50%)` }, options);
    images.forEach((image) => image.animate({ objectPosition: `${nextPercentage + 100}% 50%` }, options));
}

function end() {
    track.dataset.mousedown = '0';
    track.dataset.prevPercentage = track.dataset.percentage;
    track.classList.remove('grabbing');
}

track.addEventListener('pointerdown', start, false);
track.addEventListener('pointermove', move, false);
track.addEventListener('pointerup', end, false);

document.querySelector('.loading-overlay').style.display = 'flex';

setTimeout(() => {
    document.querySelector('.loading-overlay').style.display = 'none';
    document.querySelector('.layers__caption').classList.add('animate__animated', 'animate__heartBeat');
    document.querySelector('.layers__title').classList.add('animate__animated', 'animate__hinge');
}, 5000);

const parallaxContainer = document.querySelector('.parallax-container');
const parallaxImage = document.querySelector('.parallax-image');

let lastScrollTop = 0;

window.addEventListener('scroll', function () {
    const scrollTop = window.scrollY;

    if (scrollTop > lastScrollTop) {
        // Scroll ke bawah
        parallaxImage.style.transform = `translateX(-${scrollTop * 0.4}px)`;
    } else {
        // Scroll ke atas
        parallaxImage.style.transform = `translateX(${scrollTop * 0.6}px)`;
    }

    lastScrollTop = scrollTop;
});

