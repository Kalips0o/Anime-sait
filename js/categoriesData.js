// Определение функции categoriesData
const categoriesData = () => {
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

    // Функция для отображения списка аниме определенного жанра
    const renderAnimeList = (array, ganres) => {
        // Находим элемент с классом "product-page" и вложенным элементом с классом "col-lg-8" и сохраняем его в переменную wrapper
        const wrapper = document.querySelector('.product-page .col-lg-8');

        // Перебираем каждый жанр из массива ganres
        ganres.forEach((ganre) => {
            // Создаем блок элементов для аниме определенного жанра
            const productBlock = document.createElement('div');
            const listBlock = document.createElement('div');
            const list = array.filter((item => item.tags.includes(ganre)));

            // Добавляем классы стилизации для блоков
            listBlock.classList.add('row');
            productBlock.classList.add('mb-5');

            // Вставляем HTML-код для блока заголовка жанра и кнопки "View All"
            productBlock.insertAdjacentHTML(
                'beforeend',
                `
         <div class="row">
            <div class="col-lg-8 col-md-8 col-sm-8">
               <div class="section-title">
                  <h4>${ganre}</h4>
               </div>
            </div>
            <div class="col-lg-4 col-md-4 col-sm-4">
               <div class="btn__all">
                  <a href="./categories.html?ganre=${ganre}" class="primary-btn">View All <span class="arrow_right"></span></a>
               </div>
            </div>
         </div>
         `
            );

            // Перебираем каждый элемент аниме определенного жанра
            list.forEach(item => {
                // Создаем блок тегов для аниме
                const tagsBlock = document.createElement('ul');

                // Добавляем каждый тег в блок тегов
                item.tags.forEach(tag => {
                    tagsBlock.insertAdjacentHTML('beforeend', `
                  <li>${tag}</li>
               `);
                });

                // Вставляем HTML-код для элемента аниме
                listBlock.insertAdjacentHTML('beforeend', `
            <div class="col-lg-4 col-md-6 col-sm-6">
               <div class="product__item">
                  <div class="product__item__pic set-bg" data-setbg="${item.image}">
                     <div class="ep">${item.rating} / 10</div>
                     <div class="view"><i class="fa fa-eye"></i>${item.views}</div>
                  </div>
                  <div class="product__item__text">
                     ${tagsBlock.outerHTML}
                     <h5><a href="./anime-details.html?itemId=${item.id}">${item.title}</a></h5>
                  </div>
               </div>
            </div>
            `);
            });

            // Добавляем блок элементов аниме определенного жанра в обертку
            productBlock.append(listBlock);
            wrapper.appendChild(productBlock);

            // Устанавливаем фоновое изображение для всех элементов с классом "set-bg" из их свойства "data-setbg"
            wrapper.querySelectorAll('.set-bg').forEach((elem) => {
                elem.style.backgroundImage = `url(${elem.dataset.setbg})`;
            });
        });

        // Убираем прелоадер через 500 миллисекунд (0.5 секунды)
        setTimeout(() => {
            preloader.classList.remove('active');
        }, 500);
    };

    // Функция для отображения списка популярного аниме
    const renderTopAnime = (anime) => {
        // Находим элемент с классом "filter__gallery" и сохраняем его в переменную wrapper
        const wrapper = document.querySelector('.filter__gallery');

        // Очищаем содержимое элемента wrapper
        wrapper.innerHTML = ``;

        // Перебираем каждый элемент популярного аниме и вставляем его HTML-код в обертку
        anime.forEach((item) => {
            wrapper.insertAdjacentHTML(
                'beforeend',
                `
         <div class="product__sidebar__view__item set-bg mix"
         data-setbg="${item.image}">
            <div class="ep">${item.rating} / 10</div>
            <div class="view"><i class="fa fa-eye"></i>${item.views}</div>
            <h5><a href="./anime-details.html">${item.title}</a></h5>
         </div>
         `
            );
        });

        // Устанавливаем фоновое изображение для всех элементов с классом "set-bg" из их свойства "data-setbg"
        wrapper.querySelectorAll('.set-bg').forEach((elem) => {
            elem.style.backgroundImage = `url(${elem.dataset.setbg})`;
        });
    };

    // Выполняем запрос к удаленному серверу для получения данных об аниме
    fetch('https://anime-date-fbec3-default-rtdb.firebaseio.com/anime.json')
        .then((response) => response.json()) // Получаем ответ сервера в формате JSON
        .then((data) => {
            // Создаем пустой объект Set с названиями ganres для хранения уникальных жанров из данных
            const ganres = new Set();
            // Получаем значение параметра "ganre" из текущего URL страницы
            const ganreParams = new URLSearchParams(window.location.search).get('ganre');

            // Перебираем каждый элемент данных об аниме и добавляем его жанр в набор ganres
            data.forEach((item) => {
                ganres.add(item.ganre);
            });

            // Вызываем функцию renderTopAnime для отображения списка популярного аниме, отсортированного по просмотрам и ограниченного до 5 элементов
            renderTopAnime(data.sort((a, b) => b.views - a.views).slice(0, 5));

            // Проверяем, есть ли параметр "ganre" в URL
            if (ganreParams) {
                // Если параметр "ganre" есть, вызываем функцию renderAnimeList, передавая данные об аниме и массив с единственным выбранным жанром
                renderAnimeList(data, [ganreParams]);
            } else {
                // Если параметра "ganre" нет, вызываем функцию renderAnimeList, передавая данные об аниме и весь набор жанров
                renderAnimeList(data, ganres);
            }

            // Вызываем функцию renderGanreList для отображения списка жанров в выпадающем меню
            renderGanreList(ganres);
        });
};

// Вызываем функцию categoriesData для начала работы с данными и отображения на странице
categoriesData();
