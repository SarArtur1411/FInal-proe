// Отримання елементів
const menuBtn = document.getElementById('menuBtn');
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');
const searchInput = document.getElementById('searchInput');
const menuItems = document.querySelectorAll('.menu-item');
const buyButtons = document.querySelectorAll('.buy-btn');
const productCards = document.querySelectorAll('.product-card');

// Функція відкриття/закриття меню
function toggleSidebar() {
    sidebar.classList.toggle('open');
    overlay.classList.toggle('active');
}

// Відкриття меню при кліку на кнопку
menuBtn.addEventListener('click', toggleSidebar);

// Закриття меню при кліку на overlay
overlay.addEventListener('click', toggleSidebar);

// Закриття меню при кліку на пункт меню
menuItems.forEach(item => {
    item.addEventListener('click', function(e) {
        e.preventDefault();
        toggleSidebar();
        console.log('Клік на:', this.textContent.trim());
    });
});

// Пошук товарів
searchInput.addEventListener('input', function(e) {
    const searchTerm = e.target.value.toLowerCase().trim();
    
    productCards.forEach(card => {
        const productName = card.querySelector('.product-name').textContent.toLowerCase();
        
        if (productName.includes(searchTerm)) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
});

// Функція для кнопок купити
buyButtons.forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.stopPropagation();
        
        const originalText = this.textContent;
        const originalColor = this.style.background;
        
        // Зміна тексту та кольору
        this.textContent = '✓ ДОДАНО';
        this.style.background = '#2196F3';
        
        // Повернення до початкового стану через 1.5 секунди
        setTimeout(() => {
            this.textContent = originalText;
            this.style.background = originalColor || '#4caf50';
        }, 1500);
        
        console.log('Товар додано до кошика');
    });
});

// Лог при завантаженні сторінки
console.log('Сайт Сар Маг завантажено успішно!');
console.log('Кількість товарів:', productCards.length);