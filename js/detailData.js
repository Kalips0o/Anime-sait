// Определение функции detailData
const detailData = () => {
    // Находим элемент с классом "preloader" и сохраняем его в переменную preloader
    const preloader = document.querySelector('.preloder');

    // Функция для отображения списка жанров в выпадающем меню
    const renderGanreList = (ganres) => {
        // Находим элемент с классом "dropdown" внутри элемента с классом "header__menu" и сохраняем его в переменную dropdownBlock
        const dropdownBlock = document.querySelector('.header__menu .dropdown');

        // Перебираем каждый жанр из массива ganres
        ganres.forEach(ganre => {
            // Добавляем каждый жанр в список, создавая соответствующие HTML элементы с помощью insertAdjacentHTML
            dropdownBlock.insertAdjacentHTML('beforeend', `
            <li><a href="./categories.html?ganre=${ganre}">${ganre}</a></li>
         `);
        });
    }

    // Функция для отображения деталей выбранного аниме
    const renderAnimeDetails = (array, itemId) => {
        // Находим объект аниме с соответствующим id (itemId) из массива данных array и сохраняем его в переменную animeObj
        const animeObj = array.find(item => item.id === +itemId);

        // Находим различные элементы на странице и сохраняем их в соответствующие переменные
        const imageBlock = document.querySelector('.anime__details__pic');
        const viewsBlock = imageBlock.querySelector('.view');
        const titleBlock = document.querySelector('.anime__details__title h3');
        const subtitleBlock = document.querySelector('.anime__details__title span');
        const descriptionBlock = document.querySelector('.anime__details__text p');
        const widgetList = document.querySelectorAll('.anime__details__widget ul li');
        const breadcrumb = document.querySelector('.breadcrumb__links span');

        // Если аниме существует (нашли объект аниме по id)
        if (animeObj) {
            // Устанавливаем фоновое изображение для элемента с классом "anime__details__pic" из свойства "image" объекта animeObj
            imageBlock.dataset.setbg = animeObj.image;

            // Добавляем информацию о просмотрах в блок с классом "view"
            viewsBlock.insertAdjacentHTML('beforeend', `
            <i class="fa fa-eye">${animeObj.views}</i>
         `);

            // Обновляем заголовок и подзаголовок с информацией из объекта animeObj
            titleBlock.textContent = animeObj.title;
            subtitleBlock.textContent = animeObj['original-title'];

            // Обновляем текстовый блок с описанием аниме
            descriptionBlock.textContent = animeObj.description;

            // Обновляем виджеты с информацией о дате выпуска, рейтинге и жанрах
            widgetList[0].insertAdjacentHTML('beforeend', `
            <span>Date aired: </span>${animeObj.date}
         `);
            widgetList[1].insertAdjacentHTML('beforeend', `
            <span>Raiting: </span>${animeObj.rating}
         `);
            widgetList[2].insertAdjacentHTML('beforeend', `
            <span>Genre: </span>${animeObj.tags.join(', ')}
         `);

            // Обновляем хлебные крошки с информацией о жанре аниме
            breadcrumb.textContent = animeObj.ganre;

            // Устанавливаем фоновое изображение для всех элементов с классом "set-bg" из их свойства "data-setbg"
            document.querySelectorAll('.set-bg').forEach((elem) => {
                elem.style.backgroundImage = `url(${elem.dataset.setbg})`;
            });

            // Убираем прелоадер через 500 миллисекунд (0.5 секунды)
            setTimeout(() => {
                preloader.classList.remove('active');
            }, 500);
        } else {
            // Если аниме не найдено (animeObj равен undefined), выводим сообщение "Аниме отсутствует!" в консоль
            console.log('Аниме отсутствует!');
        }
    };

    // Выполняем запрос к удаленному серверу для получения данных об аниме
    fetch('https://anime-date-fbec3-default-rtdb.firebaseio.com/anime.json')
        .then((response) => response.json()) // Получаем ответ сервера в формате JSON
        .then((data) => {
            // Создаем пустой объект Set с названиями ganres для хранения уникальных жанров из данных
            const ganres = new Set();

            // Получаем значение параметра "itemId" из текущего URL страницы
            const ganreParams = new URLSearchParams(window.location.search).get('itemId');

            // Перебираем данные и добавляем уникальные жанры в ganres
            data.forEach((item) => {
                ganres.add(item.ganre);
            });

            // Если задан параметр "itemId", вызываем функцию renderAnimeDetails с данными и ganreParams
            if (ganreParams) {
                renderAnimeDetails(data, ganreParams);
            } else {
                // Иначе, если параметр "itemId" не задан, выводим сообщение "Аниме отсутствует!" в консоль
                console.log('Аниме отсутствует!');
            }

            // Вызываем функцию renderGanreList с полученным списком уникальных жанров
            renderGanreList(ganres);
        });
};

// Вызываем функцию detailData для выполнения всей логики при загрузке страницы
detailData();
