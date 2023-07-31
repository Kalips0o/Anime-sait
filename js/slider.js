// Объявляем функцию slider
const slider = () => {
    // Создаем новый объект Swiper и инициализируем его
    // Передаем селектор '.swiper', который определяет контейнер, в котором находятся слайды
    // Второй аргумент - это объект с настройками для Swiper
    const swiper = new Swiper('.swiper', {
        // Настройки пагинации для слайдера
        pagination: {
            el: '.swiper-pagination', // Селектор элемента, в котором будет отображаться пагинация (индикаторы слайдов)
        },
        // Настройки навигации для слайдера (кнопки "Next" и "Prev")
        navigation: {
            nextEl: '.swiper-button-next', // Селектор элемента, отвечающего за кнопку "Next"
            prevEl: '.swiper-button-prev', // Селектор элемента, отвечающего за кнопку "Prev"
        },
        // Настройки эффекта перехода между слайдами (здесь используется эффект "fade" - затухание)
        effect: "fade",
        // Настройки скорости анимации перехода между слайдами
        speed: 1000 // Здесь значение 1000 означает, что переход между слайдами занимает 1000 миллисекунд (1 секунда)
    });
};

// Вызываем функцию slider для инициализации слайдера
slider();
