const slider = document.querySelector('.film-section'); // container com scroll
const photosContainer = document.querySelector('.photos-films'); // div interna
const photos = Array.from(photosContainer.querySelectorAll('.photo'));
let isDown = false;
let startX;
let scrollLeft;

// ---------------------------
// Drag
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
// Loop infinito via clonagem (apenas para buffer visual)
// ---------------------------
function setupInfiniteCarousel() {
    photos.forEach(photo => {
        const cloneStart = photo.cloneNode(true);
        const cloneEnd = photo.cloneNode(true);
        photosContainer.prepend(cloneStart); // adiciona clones no início
        photosContainer.appendChild(cloneEnd); // adiciona clones no final
    });

    // Ajusta scroll inicial para o conteúdo original no meio
    const totalOriginalWidth = photosContainer.scrollWidth / 3;
    slider.scrollLeft = totalOriginalWidth;
}

// ---------------------------
// Escala dinâmica
// ---------------------------
function updateScale() {
    const photosAll = Array.from(photosContainer.querySelectorAll('.photo'));
    const sliderCenter = slider.scrollLeft + slider.clientWidth / 2;
    photosAll.forEach(photo => {
        const photoLeft = photo.offsetLeft;
        const photoCenter = photoLeft + photo.offsetWidth / 2;
        const distance = Math.abs(sliderCenter - photoCenter);
        const scale = Math.max(1, 1.2 - distance / 400);
        photo.style.transform = `scale(${scale})`;
    });
}

// ---------------------------
// Eventos Mouse
// ---------------------------
slider.addEventListener('mousedown', e => startDrag(e.clientX));
slider.addEventListener('mousemove', e => {
    moveDrag(e.clientX);
    updateScale();
});
slider.addEventListener('mouseup', stopDrag);
slider.addEventListener('mouseleave', stopDrag);

// ---------------------------
// Eventos Touch
// ---------------------------
slider.addEventListener('touchstart', e => startDrag(e.touches[0].clientX));
slider.addEventListener('touchmove', e => {
    moveDrag(e.touches[0].clientX);
    updateScale();
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
    setInterval(updateScale, 50); // atualiza escala continuamente
});