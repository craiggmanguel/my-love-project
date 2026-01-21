// 💖 LOVE NAME (change only this)
const herName = "Komal Tripathi"; // ← put her name here
document.getElementById("loveName").textContent = herName;


/* TYPEWRITER */
const text =
    "Thank you for being the most beautiful part of my life. Your love, your smile, and your presence mean everything to me 💗";

let i = 0;
const typeEl = document.getElementById("typewriter");

function typeWriter() {
    if (i < text.length) {
        typeEl.textContent += text.charAt(i++);
        setTimeout(typeWriter, 50);
    }
}
typeWriter();

/* TIME TOGETHER */
const startDate = new Date("2021-09-21");
const ids = ["y", "mo", "d", "h", "m", "s"];

function updateTime() {
    const now = new Date();
    let y = now.getFullYear() - startDate.getFullYear();
    let mo = now.getMonth() - startDate.getMonth();
    let d = now.getDate() - startDate.getDate();
    let h = now.getHours() - startDate.getHours();
    let m = now.getMinutes() - startDate.getMinutes();
    let s = now.getSeconds() - startDate.getSeconds();

    if (s < 0) { m--; s += 60; }
    if (m < 0) { h--; m += 60; }
    if (h < 0) { d--; h += 24; }
    if (d < 0) { mo--; d += new Date(now.getFullYear(), now.getMonth(), 0).getDate(); }
    if (mo < 0) { y--; mo += 12; }

    [y, mo, d, h, m, s].forEach((v, i) => {
        const el = document.getElementById(ids[i]);
        if (el.textContent != v) {
            el.textContent = v;
            el.classList.remove("flip");
            void el.offsetWidth;
            el.classList.add("flip");
        }
    });
}
updateTime();
setInterval(updateTime, 1000);

/* SLIDER + BLUR */
const slides = document.querySelectorAll(".slide");
const bgBlur = document.getElementById("bgBlur");
let current = 0;

function showSlide(i) {
    slides.forEach(s => s.classList.remove("active"));
    slides[i].classList.add("active");
    bgBlur.style.backgroundImage = `url(${slides[i].src})`;
}
showSlide(0);

document.querySelector(".next").onclick = () => showSlide(current = (current + 1) % slides.length);
document.querySelector(".prev").onclick = () => showSlide(current = (current - 1 + slides.length) % slides.length);

setInterval(() => showSlide(current = (current + 1) % slides.length), 4000);

/* MUSIC AUTOPLAY + MEMORY */
const music = document.getElementById("bgMusic");
const playBtn = document.getElementById("playPauseBtn");
const volumeSlider = document.getElementById("volumeSlider");

// load saved volume
let savedVol = localStorage.getItem("loveVolume");
savedVol = savedVol ? savedVol : 0.7;

music.volume = 0;
volumeSlider.value = savedVol * 100;

function startMusic() {
    music.play().catch(() => { });
    let v = 0;
    const fade = setInterval(() => {
        if (v < savedVol) {
            v += 0.01;
            music.volume = v;
        } else clearInterval(fade);
    }, 200);
    document.removeEventListener("click", startMusic);
    document.removeEventListener("touchstart", startMusic);
}
startMusic();
document.addEventListener("click", startMusic);
document.addEventListener("touchstart", startMusic);

// play / pause
playBtn.onclick = () => {
    if (music.paused) {
        music.play();
        playBtn.textContent = "⏸ Pause";
    } else {
        music.pause();
        playBtn.textContent = "▶ Play";
    }
};

// volume change + save
volumeSlider.oninput = () => {
    music.volume = volumeSlider.value / 100;
    localStorage.setItem("loveVolume", music.volume);
};
