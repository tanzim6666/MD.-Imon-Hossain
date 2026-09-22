/* =====================================================
   MD. IMON HOSSAIN
   ADVANCED INTERACTION ENGINE
===================================================== */


/* =====================================================
   LOADER
===================================================== */

window.addEventListener("load", () => {

    const loader = document.getElementById("loader");

    setTimeout(() => {
        loader.classList.add("hide");
    }, 800);

});


/* =====================================================
   HEADER
===================================================== */

const header = document.getElementById("header");

window.addEventListener("scroll", () => {

    if(window.scrollY > 40){
        header.classList.add("scrolled");
    }else{
        header.classList.remove("scrolled");
    }

});


/* =====================================================
   MOBILE MENU
===================================================== */

const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");

menuToggle.addEventListener("click", () => {

    nav.classList.toggle("open");

});

document.querySelectorAll(".nav-item").forEach(item => {

    item.addEventListener("click", () => {
        nav.classList.remove("open");
    });

});


/* =====================================================
   ACTIVE NAV
===================================================== */

const sections = document.querySelectorAll("section[id]");
const navItems = document.querySelectorAll(".nav-item");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const top = section.offsetTop - 180;

        if(window.scrollY >= top){
            current = section.id;
        }

    });

    navItems.forEach(item => {

        item.classList.remove("active");

        if(item.getAttribute("href") === "#" + current){
            item.classList.add("active");
        }

    });

});


/* =====================================================
   SCROLL PROGRESS
===================================================== */

const progress = document.getElementById("scrollProgress");

window.addEventListener("scroll", () => {

    const scrollTop = window.scrollY;

    const height =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

    const percent =
        (scrollTop / height) * 100;

    progress.style.width = percent + "%";

});


/* =====================================================
   REVEAL ENGINE
===================================================== */

const revealElements =
    document.querySelectorAll(".reveal");

const revealObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if(entry.isIntersecting){

                    entry.target.classList.add("visible");

                    revealObserver.unobserve(entry.target);

                }

            });

        },
        {
            threshold:.12
        }
    );

revealElements.forEach(element => {

    revealObserver.observe(element);

});


/* =====================================================
   TYPING EFFECT
===================================================== */

const typingElement =
    document.getElementById("typingText");

const words = [
    "ENGLISH EDUCATION",
    "STUDENT DEVELOPMENT",
    "COMMUNICATION",
    "ACADEMIC LEARNING",
    "CONFIDENCE"
];

let wordIndex = 0;
let charIndex = 0;
let deleting = false;


function typingEffect(){

    const currentWord =
        words[wordIndex];

    if(!deleting){

        typingElement.textContent =
            currentWord.substring(
                0,
                charIndex + 1
            );

        charIndex++;

        if(charIndex === currentWord.length){

            deleting = true;

            setTimeout(
                typingEffect,
                1300
            );

            return;
        }

    }else{

        typingElement.textContent =
            currentWord.substring(
                0,
                charIndex - 1
            );

        charIndex--;

        if(charIndex === 0){

            deleting = false;

            wordIndex =
                (wordIndex + 1) %
                words.length;

        }

    }

    setTimeout(
        typingEffect,
        deleting ? 45 : 85
    );

}

typingEffect();


/* =====================================================
   CURSOR
===================================================== */

const cursor =
    document.querySelector(".cursor");

const cursorDot =
    document.querySelector(".cursor-dot");

let mouseX = 0;
let mouseY = 0;

let cursorX = 0;
let cursorY = 0;


document.addEventListener("mousemove", e => {

    mouseX = e.clientX;
    mouseY = e.clientY;

});


function cursorAnimation(){

    cursorX +=
        (mouseX - cursorX) * .14;

    cursorY +=
        (mouseY - cursorY) * .14;

    cursor.style.left =
        cursorX + "px";

    cursor.style.top =
        cursorY + "px";

    cursorDot.style.left =
        mouseX + "px";

    cursorDot.style.top =
        mouseY + "px";

    requestAnimationFrame(
        cursorAnimation
    );

}

cursorAnimation();


/* =====================================================
   CURSOR HOVER
===================================================== */

document.querySelectorAll(
    "a,button,.expertise-card,.stat-card,.contact-card"
).forEach(element => {

    element.addEventListener(
        "mouseenter",
        () => cursor.classList.add("hover")
    );

    element.addEventListener(
        "mouseleave",
        () => cursor.classList.remove("hover")
    );

});


/* =====================================================
   MOUSE LIGHT
===================================================== */

const mouseGlow =
    document.querySelector(".mouse-glow");

document.addEventListener("mousemove", e => {

    mouseGlow.style.left =
        e.clientX + "px";

    mouseGlow.style.top =
        e.clientY + "px";

});


/* =====================================================
   PARTICLE SYSTEM
===================================================== */

const canvas =
    document.getElementById("particles");

const ctx =
    canvas.getContext("2d");

let particles = [];

let width;
let height;


function resizeCanvas(){

    width =
        canvas.width =
        window.innerWidth;

    height =
        canvas.height =
        window.innerHeight;

}

resizeCanvas();

window.addEventListener(
    "resize",
    resizeCanvas
);


class Particle{

    constructor(){

        this.x =
            Math.random() * width;

        this.y =
            Math.random() * height;

        this.size =
            Math.random() * 1.5 + .3;

        this.speedX =
            (Math.random() - .5) * .25;

        this.speedY =
            (Math.random() - .5) * .25;

        this.alpha =
            Math.random() * .5 + .1;

    }


    update(){

        this.x += this.speedX;
        this.y += this.speedY;


        if(this.x < 0)
            this.x = width;

        if(this.x > width)
            this.x = 0;

        if(this.y < 0)
            this.y = height;

        if(this.y > height)
            this.y = 0;

    }


    draw(){

        ctx.beginPath();

        ctx.arc(
            this.x,
            this.y,
            this.size,
            0,
            Math.PI * 2
        );

        ctx.fillStyle =
            `rgba(217,182,108,${this.alpha})`;

        ctx.fill();

    }

}


function createParticles(){

    particles = [];

    const amount =
        Math.min(
            130,
            Math.floor(
                window.innerWidth / 10
            )
        );

    for(let i = 0; i < amount; i++){

        particles.push(
            new Particle()
        );

    }

}

createParticles();

window.addEventListener(
    "resize",
    createParticles
);


function particleAnimation(){

    ctx.clearRect(
        0,
        0,
        width,
        height
    );


    particles.forEach(p => {

        p.update();
        p.draw();

    });


    /* CONNECT NEAR PARTICLES */

    for(let i = 0; i < particles.length; i++){

        for(
            let j = i + 1;
            j < particles.length;
            j++
        ){

            const dx =
                particles[i].x -
                particles[j].x;

            const dy =
                particles[i].y -
                particles[j].y;

            const distance =
                Math.sqrt(
                    dx * dx +
                    dy * dy
                );


            if(distance < 110){

                const opacity =
                    .08 -
                    distance / 1500;

                ctx.beginPath();

                ctx.moveTo(
                    particles[i].x,
                    particles[i].y
                );

                ctx.lineTo(
                    particles[j].x,
                    particles[j].y
                );

                ctx.strokeStyle =
                    `rgba(217,182,108,${opacity})`;

                ctx.lineWidth = .5;

                ctx.stroke();

            }

        }

    }


    requestAnimationFrame(
        particleAnimation
    );

}

particleAnimation();


/* =====================================================
   CARD 3D TILT
===================================================== */

document.querySelectorAll(
    ".expertise-card"
).forEach(card => {

    card.addEventListener(
        "mousemove",
        e => {

            const rect =
                card.getBoundingClientRect();

            const x =
                e.clientX - rect.left;

            const y =
                e.clientY - rect.top;

            const rotateY =
                ((x / rect.width) - .5) * 8;

            const rotateX =
                ((y / rect.height) - .5) * -8;

            card.style.transform =
                `translateY(-12px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)`;

        }
    );


    card.addEventListener(
        "mouseleave",
        () => {

            card.style.transform = "";

        }
    );

});


/* =====================================================
   BUTTON SOUND ENGINE
===================================================== */

let audioContext = null;


function getAudio(){

    if(!audioContext){

        const AudioContext =
            window.AudioContext ||
            window.webkitAudioContext;

        if(AudioContext){

            audioContext =
                new AudioContext();

        }

    }

    return audioContext;

}


function clickSound(){

    const audio =
        getAudio();

    if(!audio) return;

    if(audio.state === "suspended"){
        audio.resume();
    }


    const osc =
        audio.createOscillator();

    const gain =
        audio.createGain();


    osc.connect(gain);
    gain.connect(audio.destination);


    osc.type = "sine";

    osc.frequency.setValueAtTime(
        480,
        audio.currentTime
    );

    osc.frequency.exponentialRampToValueAtTime(
        780,
        audio.currentTime + .07
    );


    gain.gain.setValueAtTime(
        .025,
        audio.currentTime
    );

    gain.gain.exponentialRampToValueAtTime(
        .001,
        audio.currentTime + .09
    );


    osc.start();

    osc.stop(
        audio.currentTime + .1
    );

}


document.querySelectorAll(
    ".sound-btn"
).forEach(button => {

    button.addEventListener(
        "click",
        clickSound
    );

});


/* =====================================================
   MAGNETIC BUTTON
===================================================== */

document.querySelectorAll(
    ".magnetic-btn"
).forEach(button => {

    button.addEventListener(
        "mousemove",
        e => {

            const rect =
                button.getBoundingClientRect();

            const x =
                e.clientX -
                rect.left -
                rect.width / 2;

            const y =
                e.clientY -
                rect.top -
                rect.height / 2;

            button.style.transform =
                `translate(${x * .08}px,
                           ${y * .08}px)`;

        }
    );


    button.addEventListener(
        "mouseleave",
        () => {

            button.style.transform = "";

        }
    );

});


/* =====================================================
   IMAGE PARALLAX
===================================================== */

const profileImage =
    document.querySelector(
        ".profile-photo img"
    );


document.addEventListener(
    "mousemove",
    e => {

        if(!profileImage) return;

        const x =
            (e.clientX /
            window.innerWidth -
            .5) * 8;

        const y =
            (e.clientY /
            window.innerHeight -
            .5) * 8;

        profileImage.style.transform =
            `translate(${x}px,${y}px)`;

    }
);


/* =====================================================
   FOOTER YEAR
===================================================== */

document.getElementById(
    "year"
).textContent =
    new Date().getFullYear();


/* =====================================================
   ESC KEY CLOSE MENU
===================================================== */

document.addEventListener(
    "keydown",
    e => {

        if(e.key === "Escape"){

            nav.classList.remove("open");

        }

    }
);