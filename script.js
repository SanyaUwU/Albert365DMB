const bgColor = document.getElementById('bg-color');
const sections = document.querySelectorAll('.section');
const backgroundColors = ['#020202', '#081712', '#0e2920', '#153d2e'];

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const index = Array.from(sections).indexOf(entry.target);
            bgColor.style.backgroundColor = backgroundColors[index];
        }
    });
}, { threshold: 0.5 });

sections.forEach(sec => observer.observe(sec));

const canvas = document.getElementById('bg');
const ctx = canvas.getContext('2d');
let width, height;
let petals = [];

function initPetals() {
    petals = [];
    const numPetals = window.innerWidth < 768 ? 50 : 120;
    for (let i = 0; i < numPetals; i++) {
        petals.push({
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            vx: (Math.random() - 0.5) * 1.2,
            vy: -(Math.random() * 2 + 1),
            size: Math.random() * 2.5 + 1,
            drift: Math.random() * Math.PI * 2,
            driftSpeed: Math.random() * 0.03 + 0.01
        });
    }
}

function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    initPetals();
}

window.addEventListener('resize', resize);
resize();

function drawBackground() {
    ctx.clearRect(0, 0, width, height);
    for (let i = 0; i < petals.length; i++) {
        let p = petals[i];
        p.y += p.vy;
        p.x += p.vx + Math.sin(p.drift) * 0.8;
        p.drift += p.driftSpeed;

        if (p.y < -30) {
            p.y = height + 30;
            p.x = Math.random() * width;
        }
        if (p.x < -30) p.x = width + 30;
        if (p.x > width + 30) p.x = -30;

        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p.x - p.size * 2, p.y + p.size * 3);
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p.x + p.size * 2, p.y + p.size * 3);
        ctx.stroke();
    }
    requestAnimationFrame(drawBackground);
}
drawBackground();

const endDate = new Date('2027-06-25T00:00:00').getTime();

function updateTimer() {
    const now = new Date().getTime();
    const distance = endDate - now;

    if (distance < 0) {
        document.getElementById('days').innerText = "000";
        document.getElementById('hours').innerText = "00";
        document.getElementById('minutes').innerText = "00";
        document.getElementById('seconds').innerText = "00";
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById('days').innerText = String(days).padStart(3, '0');
    document.getElementById('hours').innerText = String(hours).padStart(2, '0');
    document.getElementById('minutes').innerText = String(minutes).padStart(2, '0');
    document.getElementById('seconds').innerText = String(seconds).padStart(2, '0');
}

setInterval(updateTimer, 1000);
updateTimer();

const quotes = [
    "Дембель неизбежен, как восход солнца!",
    "Каждая прошедшая секунда приближает тебя к дому.",
    "Ты сильнее, чем думаешь. Мы тобой гордимся!",
    "Еще один день позади. Держись, брат!",
    "Тяжело в учении, легко в бою. Ждем тебя!",
    "Время идет, опыт копится, дембель близится.",
    "Настоящая проверка характера. Ты справишься!",
    "Считаем дни вместе с тобой.",
    "Дома тебя ждет семья и вкусная еда!",
    "Осталось совсем немного, продолжай двигаться вперед."
];

const quoteBtn = document.getElementById('quoteBtn');
const quoteDisplay = document.getElementById('quoteDisplay');

quoteBtn.addEventListener('click', () => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    let text = "root@system:~$ " + quotes[randomIndex];
    quoteDisplay.innerText = "";
    let i = 0;
    
    quoteBtn.disabled = true;
    
    function typeWriter() {
        if (i < text.length) {
            quoteDisplay.innerHTML += text.charAt(i);
            i++;
            setTimeout(typeWriter, 30);
        } else {
            quoteBtn.disabled = false;
        }
    }
    typeWriter();
});
