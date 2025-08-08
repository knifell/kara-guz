document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.content-section');
    const newsGrid = document.querySelector('.news-list-view');
    const newsFullView = document.querySelector('.news-full-view');
    const readMoreButtons = document.querySelectorAll('.read-more-btn');
    const backToNewsButton = document.querySelectorAll('.back-to-news-btn');
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    // Функция для переключения видимости секций
    const showSection = (targetId) => {
        sections.forEach(section => {
            if (section.id === targetId) {
                section.style.display = 'block';
            } else {
                section.style.display = 'none';
            }
        });
    };

    // Обработчик для навигации
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('data-target');
            showSection(targetId);

            // Закрываем мобильное меню после нажатия
            if (navMenu.classList.contains('active')) {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    });

    // Обработчик для кнопки "Смотреть все новости"
    const newsCardLink = document.querySelector('.news-card .card-link');
    if (newsCardLink) {
        newsCardLink.addEventListener('click', (e) => {
            e.preventDefault();
            showSection('news');
        });
    }

    // Обработчики для "Читать далее..."
    readMoreButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const newsId = button.getAttribute('data-news-id');
            const fullArticle = document.getElementById(newsId);

            if (fullArticle) {
                newsGrid.style.display = 'none';
                newsFullView.style.display = 'block';
                fullArticle.style.display = 'block';
            }
        });
    });

    // Обработчики для кнопки "Закрыть"
    backToNewsButton.forEach(button => {
        button.addEventListener('click', () => {
            newsGrid.style.display = 'grid';
            newsFullView.style.display = 'none';
            document.querySelectorAll('.full-article').forEach(article => {
                article.style.display = 'none';
            });
        });
    });

    // Обработчик для мобильного меню
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Показываем главную страницу при загрузке
    showSection('home');
});
