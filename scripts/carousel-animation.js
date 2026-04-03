const slider = document.querySelector('.film-section'); // container com scroll
const photosContainer = document.querySelector('.photos-films'); // div interna
const photos = Array.from(photosContainer.querySelectorAll('.photo'));
let isDown = false;
let startX;
let scrollLeft;

// ---------------------------
// Drag / Touch
// ---------------------------
const startDrag = (x) => {
    isDown = true;
    slider.style.scrollSnapType = 'none';
    startX = x;
    scrollLeft = slider.scrollLeft;
};

const moveDrag = (x) => {
    if (!isDown) return;
    const walk = x - startX;
    slider.scrollLeft = scrollLeft - walk;
};

const stopDrag = () => {
    isDown = false;
    slider.style.scrollSnapType = 'x mandatory';
};

// ---------------------------
// Loop infinito (clones mínimos)
// ---------------------------
function setupInfiniteCarousel() {
    const clonesStart = photos.slice(-2).map(p => p.cloneNode(true));
    const clonesEnd = photos.slice(0, 2).map(p => p.cloneNode(true));

    clonesStart.forEach(c => photosContainer.prepend(c));
    clonesEnd.forEach(c => photosContainer.appendChild(c));

    // Ajusta scroll inicial para o conteúdo original
    const totalOriginalWidth = photosContainer.scrollWidth / 3;
    slider.scrollLeft = totalOriginalWidth;
}

// ---------------------------
// Pré-calcula centros das fotos
// ---------------------------
const photoCenters = photos.map(photo => photo.offsetLeft + photo.offsetWidth / 2);

function updateScaleFast() {
    const sliderCenter = slider.scrollLeft + slider.clientWidth / 2;
    photos.forEach((photo, i) => {
        const distance = Math.abs(sliderCenter - photoCenters[i]);
        const scale = Math.max(1, 1.2 - distance / 400);
        photo.style.transform = `scale(${scale})`;
    });
}

// ---------------------------
// Atualização via requestAnimationFrame
// ---------------------------
let ticking = false;
function onScrollOrMove() {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            updateScaleFast();
            ticking = false;
        });
        ticking = true;
    }
}

// ---------------------------
// Eventos Mouse
// ---------------------------
slider.addEventListener('mousedown', e => startDrag(e.clientX));
slider.addEventListener('mousemove', e => {
    moveDrag(e.clientX);
    onScrollOrMove();
});
slider.addEventListener('mouseup', stopDrag);
slider.addEventListener('mouseleave', stopDrag);

// ---------------------------
// Eventos Touch
// ---------------------------
slider.addEventListener('touchstart', e => startDrag(e.touches[0].clientX));
slider.addEventListener('touchmove', e => {
    moveDrag(e.touches[0].clientX);
    onScrollOrMove();
    e.preventDefault();
}, { passive: false });
slider.addEventListener('touchend', stopDrag);

// ---------------------------
// Previne seleção de texto
// ---------------------------
slider.addEventListener('dragstart', e => e.preventDefault());

// ---------------------------
// Inicialização
// ---------------------------
window.addEventListener('load', () => {
    setupInfiniteCarousel();
    updateScaleFast(); // primeira atualização
});
