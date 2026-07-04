let currentIndex = 0;
const images = document.querySelectorAll('.slider-images img');
const totalImages = images.length;
const counter = document.querySelector('.counter');

function showImage(index) {
    images.forEach((img, i) => {
        img.classList.toggle('active', i === index);
    });
    
    counter.textContent = `Изображение ${index + 1} из ${totalImages}`;
}

document.querySelector('.next-btn').addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % totalImages;
    showImage(currentIndex);
});

document.querySelector('.prev-btn').addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + totalImages) % totalImages;
    showImage(currentIndex);
});

// Инициализация
showImage(currentIndex);
