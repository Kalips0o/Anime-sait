// Объявляем функцию scrollToTop
const scrollToTop = () => {
    // Находим элемент кнопки "Наверх" по его ID "scrollToTopButton" и сохраняем его в переменную topBtn
    const topBtn = document.querySelector('#scrollToTopButton');

    // Добавляем слушатель события "click" к кнопке "Наверх"
    topBtn.addEventListener('click', (event) => {
        // Предотвращаем стандартное поведение браузера при клике на кнопку
        event.preventDefault();

        // Находим элемент с классом ".header" и прокручиваем его в видимую область окна
        // с использованием плавной анимации
        document.querySelector(".header").scrollIntoView({
            behavior: "smooth", // Свойство "behavior" определяет тип анимации прокрутки ("smooth" для плавной, "auto" для мгновенной)
            block: "center",    // Свойство "block" определяет выравнивание элемента в вертикальном направлении относительно окна ("start", "center", "end" или "nearest")
            inline: "center",   // Свойство "inline" определяет выравнивание элемента в горизонтальном направлении относительно окна ("start", "center", "end" или "nearest")
        });
    });
};

// Вызываем функцию scrollToTop для активации прокрутки при клике на кнопку "Наверх"
scrollToTop();
