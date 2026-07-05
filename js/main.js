// Находим основные элементы слайдера в DOM
const sliderImages = document.querySelector(".slider-images"); // Контейнер-лента для картинок
const originalImages = document.querySelectorAll(".slider-images img"); // Список всех оригинальных картинок
const totalImages = originalImages.length; // Общее количество оригинальных картинок
const counter = document.querySelector(".counter"); // Элемент текстового счетчика

// СОЗДАНИЕ КЛОНОВ (Необходимо для эффекта бесконечной прокрутки без резких скачков)
const firstClone = originalImages[0].cloneNode(true); // Клонируем первую картинку
const lastClone = originalImages[totalImages - 1].cloneNode(true); // Клонируем последнюю картинку

// Добавляем клоны в DOM:
sliderImages.appendChild(firstClone); // Первый клон встает в самый конец ленты
sliderImages.insertBefore(lastClone, originalImages[0]); // Последний клон встает в самое начало ленты

// ИНИЦИАЛИЗАЦИЯ ПЕРЕМЕННЫХ
let currentIndex = 1; // Начинаем с 1, так как на позиции 0 теперь находится клон последней картинки
let isTransitioning = false; // Флаг-защита от «спам-кликов» (блокирует нажатия во время анимации)

// ФУНКЦИЯ ОБНОВЛЕНИЯ СЧЕТЧИКА
function updateCounter(index) {
  let displayIndex = index;

  // Если мы находимся на клонах, корректируем цифру для пользователя
  if (index === 0) displayIndex = totalImages; // На первом клоне пишем номер последней картинки
  if (index === totalImages + 1) displayIndex = 1; // На последнем клоне пишем номер первой картинки

  // Выводим текст в формате "Изображение X из Y"
  counter.textContent = `Изображение ${displayIndex} из ${totalImages}`;
}

// ФУНКЦИЯ ПЕРЕКЛЮЧЕНИЯ СЛАЙДОВ
function showImage(index, animate = true) {
  if (animate) {
    // Включаем плавную анимацию перемещения ленты
    sliderImages.style.transition = "transform 0.5s ease-in-out";
  } else {
    // Выключаем анимацию (нужно для мгновенного и незаметного переноса с клона на оригинал)
    sliderImages.style.transition = "none";
  }

  // Сдвигаем ленту картинок влево на нужный процент (каждый индекс — это 100% ширины слайдера)
  sliderImages.style.transform = `translateX(-${index * 100}%)`;

  // Обновляем текст счетчика
  updateCounter(index);
}

// ОТСЛЕЖИВАНИЕ ЗАВЕРШЕНИЯ АНИМАЦИИ
// Это событие срабатывает каждый раз, когда картинка закончила свое плавное движение
sliderImages.addEventListener("transitionend", () => {
  isTransitioning = false; // Анимация завершена, снимаем блокировку с кнопок

  // Если мы докрутили влево до самого первого клона (индекс 0)
  if (currentIndex === 0) {
    currentIndex = totalImages; // Меняем индекс на настоящую последнюю картинку
    showImage(currentIndex, false); // Мгновенно (без анимации) переносим на неё фокус
  }

  // Если мы докрутили вправо до самого последнего клона (индекс totalImages + 1)
  if (currentIndex === totalImages + 1) {
    currentIndex = 1; // Меняем индекс на настоящую первую картинку
    showImage(currentIndex, false); // Мгновенно (без анимации) переносим на неё фокус
  }
});

// ОБРАБОТЧИКИ НАЖАТИЯ НА КНОПКИ

// Кнопка «Вперед»
document.querySelector(".next-btn").addEventListener("click", () => {
  if (isTransitioning) return; // Если прошлая картинка еще не доехала, игнорируем клик
  isTransitioning = true; // Блокируем новые клики на время анимации
  currentIndex++; // Увеличиваем индекс на 1
  showImage(currentIndex); // Запускаем анимацию перехода
});

// Кнопка «Назад»
document.querySelector(".prev-btn").addEventListener("click", () => {
  if (isTransitioning) return; // Если прошлая картинка еще не доехала, игнорируем клик
  isTransitioning = true; // Блокируем новые клики на время анимации
  currentIndex--; // Уменьшаем индекс на 1
  showImage(currentIndex); // Запускаем анимацию перехода
});

// ПЕРВЫЙ ЗАПУСК
// Сразу перемещаем ленту на индекс 1 (настоящая первая картинка) без анимации,
// чтобы пользователь не видел клон при загрузке страницы.
showImage(currentIndex, false);
