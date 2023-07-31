const modal = () => {
    // Находим элемент модального окна с классом
    const modal = document.querySelector('.search-model');
    const modalBtn = document.querySelector('.icon_search');
    const modalClose = document.querySelector('.search-close-switch');

// Создаем функцию toggleModal, которая будет отвечать за открытие и закрытие модального окна
    const toggleModal = () => {
        // Получаем текущее состояние отображения модального окна (block или none) и сохраняем его в переменную displayState
        const displayState = modal.style.display;
        // Инвертируем состояние модального окна: если оно отображается, скрываем его, и наоборот, если оно скрыто, отображаем его
        modal.style.display = displayState === 'block' ? 'none' : 'block';
    };

    // Добавляем обработчик события "click" к кнопке с классом "icon_search", чтобы при клике вызывать функцию toggleModal
    modalBtn.addEventListener('click', toggleModal);
    // Добавляем обработчик события "click" к кнопке с классом "search-close-switch", чтобы при клике вызывать функцию toggleModal
    modalClose.addEventListener('click', toggleModal);
};

// Вызываем функцию modal для инициализации работы модального окна
modal();
