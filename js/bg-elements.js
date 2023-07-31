// Объявляем функцию bgElements
const bgElements = () => {
    // Находим все элементы на странице с классом "set-bg" и сохраняем их в переменную elements
    const elements = document.querySelectorAll('.set-bg');

    // Проходимся по всем элементам, используя метод forEach
    elements.forEach((elem) => {
        // Для каждого элемента устанавливаем фоновое изображение, используя значение атрибута "data-setbg"
        // Атрибут "data-setbg" содержит URL изображения
        // Мы используем интерполяцию строк, чтобы вставить значение атрибута в URL фонового изображения
        elem.style.backgroundImage = `url(${elem.dataset.setbg})`;
    });
};

// Вызываем функцию bgElements для применения фоновых изображений к элементам с классом "set-bg"
bgElements();
