// Чекаємо поки завантажиться весь HTML
document.addEventListener('DOMContentLoaded', function() {

    // ===== ЕЛЕМЕНТИ =====
    var cart         = [];
    var cartModal    = document.getElementById('cartModal');
    var cartCount    = document.getElementById('cartCount');
    var cartItemsEl  = document.getElementById('cartItems');
    var cartEmptyEl  = document.getElementById('cartEmpty');
    var cartFooter   = document.getElementById('cartFooter');
    var cartTotalEl  = document.getElementById('cartTotal');

    // ===== ВІДКРИТИ КОШИК =====
    document.getElementById('cartBtn').addEventListener('click', function() {
        cartModal.classList.add('open');
        renderCart();
    });

    // ===== ЗАКРИТИ КОШИК =====
    document.getElementById('cartClose').addEventListener('click', function() {
        cartModal.classList.remove('open');
    });

    // ===== ОЧИСТИТИ КОШИК =====
    document.getElementById('cartClear').addEventListener('click', function() {
        cart = [];
        updateCount();
        renderCart();
    });

    // ===== ДОДАТИ ТОВАР =====
    document.querySelectorAll('.cart-btn').forEach(function(btn) {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();

            var card  = btn.closest('.product-card');
            var name  = card.querySelector('.product-name').textContent.trim();
            var price = card.querySelector('.product-price').textContent.trim();
            var imgEl = card.querySelector('.product-image img');
            var img   = imgEl ? imgEl.src : '';

            // Перевірити чи вже є в кошику
            var exists = false;
            for (var i = 0; i < cart.length; i++) {
                if (cart[i].name === name) {
                    cart[i].qty++;
                    exists = true;
                    break;
                }
            }
            if (!exists) {
                cart.push({ name: name, price: price, img: img, qty: 1 });
            }

            updateCount();

            // Анімація кнопки
            var origHTML = btn.innerHTML;
            btn.style.background = '#2196F3';
            btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>';
            cartCount.style.transform = 'scale(1.5)';

            setTimeout(function() {
                cartCount.style.transform = 'scale(1)';
            }, 200);
            setTimeout(function() {
                btn.style.background = '#4caf50';
                btn.innerHTML = origHTML;
            }, 1500);
        });
    });

    // ===== ОНОВИТИ ЛІЧИЛЬНИК =====
    function updateCount() {
        var total = 0;
        for (var i = 0; i < cart.length; i++) {
            total += cart[i].qty;
        }
        cartCount.textContent = total;
    }

    // ===== ПАРСИНГ ЦІНИ =====
    function parsePrice(str) {
        var clean = str.replace(/[^\d,\.]/g, '').replace(',', '.');
        return parseFloat(clean) || 0;
    }

    // ===== ВІДМАЛЮВАТИ КОШИК =====
    function renderCart() {
        cartItemsEl.innerHTML = '';

        if (cart.length === 0) {
            cartEmptyEl.style.display = 'flex';
            cartItemsEl.style.display = 'none';
            cartFooter.style.display  = 'none';
            return;
        }

        cartEmptyEl.style.display = 'none';
        cartItemsEl.style.display = 'flex';
        cartFooter.style.display  = 'flex';

        var total = 0;

        cart.forEach(function(item, idx) {
            total += parsePrice(item.price) * item.qty;

            var div = document.createElement('div');
            div.className = 'cart-item';
            div.innerHTML =
                '<img class="cart-item-img" src="' + item.img + '" alt="">' +
                '<div class="cart-item-info">' +
                    '<div class="cart-item-name">' + item.name + '</div>' +
                    '<div class="cart-item-price">' + item.price + '</div>' +
                '</div>' +
                '<div class="cart-item-qty">' +
                    '<button class="qty-btn minus-btn">−</button>' +
                    '<span class="qty-value">' + item.qty + '</span>' +
                    '<button class="qty-btn plus-btn">+</button>' +
                '</div>' +
                '<button class="cart-item-remove remove-btn">🗑</button>';

            cartItemsEl.appendChild(div);

            // Кнопка мінус
            div.querySelector('.minus-btn').addEventListener('click', function() {
                cart[idx].qty--;
                if (cart[idx].qty <= 0) cart.splice(idx, 1);
                updateCount();
                renderCart();
            });

            // Кнопка плюс
            div.querySelector('.plus-btn').addEventListener('click', function() {
                cart[idx].qty++;
                updateCount();
                renderCart();
            });

            // Кнопка видалення
            div.querySelector('.remove-btn').addEventListener('click', function() {
                cart.splice(idx, 1);
                updateCount();
                renderCart();
            });
        });

        cartTotalEl.textContent = total.toLocaleString('uk-UA') + ' ₴';
    }

    // ===== МЕНЮ =====
    var menuBtn  = document.getElementById('menuBtn');
    var sidebar  = document.getElementById('sidebar');
    var overlay  = document.getElementById('overlay');

    menuBtn.addEventListener('click', function() {
        sidebar.classList.toggle('open');
        overlay.classList.toggle('active');
    });

    overlay.addEventListener('click', function() {
        sidebar.classList.remove('open');
        overlay.classList.remove('active');
    });

    document.querySelectorAll('.menu-item').forEach(function(item) {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            sidebar.classList.remove('open');
            overlay.classList.remove('active');
        });
    });

    // ===== ПОШУК =====
    document.getElementById('searchInput').addEventListener('input', function() {
        var term = this.value.toLowerCase().trim();
        document.querySelectorAll('.product-card').forEach(function(card) {
            var name = card.querySelector('.product-name').textContent.toLowerCase();
            card.style.display = name.includes(term) ? 'flex' : 'none';
        });
    });

    console.log('Сайт Сар Маг завантажено!');
});