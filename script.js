document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link');
    const contentSections = document.querySelectorAll('.content-section');
    const cardLinks = document.querySelectorAll('.card-link');
    const appealForm = document.getElementById('appeal-form');
    const newsListView = document.querySelector('.news-list-view');
    const newsFullView = document.querySelector('.news-full-view');
    const readMoreButtons = document.querySelectorAll('.read-more-btn');
    const backToNewsButtons = document.querySelectorAll('.back-to-news-btn');

    function showSection(targetId) {
        contentSections.forEach(section => {
            if (section.id === targetId) {
                section.style.display = 'block';
            } else {
                section.style.display = 'none';
            }
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const target = event.target.getAttribute('data-target');
            showSection(target);
            // ������������ � ������ ��������, ���� ��������� �� ������ ��������
            if (target !== 'news') {
                newsListView.style.display = 'block';
                newsFullView.style.display = 'none';
            }
        });
    });

    cardLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const target = event.target.getAttribute('data-target');
            showSection(target);
        });
    });

    // ����� ������ ��� �������� ����� � ������� fetch
    if (appealForm) {
        appealForm.addEventListener('submit', function (event) {
            event.preventDefault(); // ������������� ����������� �������� �����

            const formData = new FormData(this);

            fetch('send_appeal.php', {
                method: 'POST',
                body: formData
            })
                .then(response => response.json())
                .then(data => {
                    if (data.status === 'success') {
                        alert(data.message);
                        appealForm.reset(); // ������� ����� ����� �������� ��������
                    } else {
                        alert(data.message);
                    }
                })
                .catch(error => {
                    console.error('������:', error);
                    alert('��������� ������ ��� �������� �������. ����������, ���������� ��� ���.');
                });
        });
    }

    // ������ ��� ������ ������ �������
    readMoreButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            const newsId = event.target.getAttribute('data-news-id');
            newsListView.style.display = 'none';
            newsFullView.style.display = 'block';
            document.querySelectorAll('.full-article').forEach(article => {
                if (article.id === newsId) {
                    article.style.display = 'block';
                } else {
                    article.style.display = 'none';
                }
            });
        });
    });

    // ������ ��� �������� � ������ ��������
    backToNewsButtons.forEach(button => {
        button.addEventListener('click', () => {
            newsFullView.style.display = 'none';
            newsListView.style.display = 'block';
        });
    });

    showSection('home');
});