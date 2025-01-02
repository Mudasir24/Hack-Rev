const wasteData = [
    {
        title: 'Recycling',
        icon: '♻️',
        description: 'Convert waste materials into new products',
        image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&q=80&w=1000',
        tips: [
            'Separate plastics, glass, and paper',
            'Clean containers before recycling',
            'Check local recycling guidelines'
        ]
    },
    {
        title: 'Composting',
        icon: '🌱',
        description: 'Transform organic waste into nutrient-rich soil',
        image: 'https://images.unsplash.com/photo-1591955506264-3f5a6834570a?auto=format&fit=crop&q=80&w=1000',
        tips: [
            'Include fruit and vegetable scraps',
            'Add dry leaves and grass clippings',
            'Maintain proper moisture levels'
        ]
    },
    {
        title: 'Waste Reduction',
        icon: '🗑',
        description: 'Minimize waste production at source',
        image: 'https://images.unsplash.com/photo-1595278069441-2cf29f8005a4?auto=format&fit=crop&q=80&w=1000',
        tips: [
            'Use reusable containers',
            'Avoid single-use plastics',
            'Buy products with less packaging'
        ]
    }
];

// Initialize carousel
let currentSlide = 0;
const carouselInner = document.querySelector('.carousel-inner');
const dotsContainer = document.querySelector('.carousel-dots');

// Create slides
wasteData.forEach((item, index) => {
    const slide = document.createElement('div');
    slide.className = 'slide';
    slide.innerHTML = `
        <div class="card">
            <div class="image-container">
                <img src="${item.image}" alt="${item.title}">
                <span class="icon">${item.icon}</span>
            </div>
            <div class="content">
                <h2>${item.title}</h2>
                <p>${item.description}</p>
                <ul>
                    ${item.tips.map(tip => `<li>${tip}</li>`).join('')}
                </ul>
            </div>
        </div>
    `;
    carouselInner.appendChild(slide);

    // Create dot
    const dot = document.createElement('div');
    dot.className = `dot ${index === 0 ? 'active' : ''}`;
    dot.addEventListener('click', () => goToSlide(index));
    dotsContainer.appendChild(dot);
});

// Navigation functions
function updateSlidePosition() {
    carouselInner.style.transform = `translateX(-${currentSlide * 100}%)`;
    document.querySelectorAll('.dot').forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
}

function goToSlide(index) {
    currentSlide = index;
    updateSlidePosition();
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % wasteData.length;
    updateSlidePosition();
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + wasteData.length) % wasteData.length;
    updateSlidePosition();
}

// Event listeners
document.querySelector('.next').addEventListener('click', nextSlide);
document.querySelector('.prev').addEventListener('click', prevSlide);
document.getElementById('homeBtn').addEventListener('click', () => window.location.reload());

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') prevSlide();
    if (e.key === 'ArrowRight') nextSlide();
});