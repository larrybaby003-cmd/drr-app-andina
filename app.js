
const http = require('http');

const PORT = process.env.PORT || 3000;
const VERSION = '3.0';

const products = [
    { id: 1, name: 'Café Andino', category: 'Alimentos', price: 25.90, icon: '☕', description: 'Café seleccionado de los Andes.' },
    { id: 2, name: 'Quinua Premium', category: 'Alimentos', price: 18.50, icon: '🌾', description: 'Nutrición natural para tu familia.' },
    { id: 3, name: 'Miel Natural', category: 'Alimentos', price: 22.00, icon: '🍯', description: 'Dulzura natural de calidad.' },
    { id: 4, name: 'Cuidado Personal', category: 'Belleza', price: 29.90, icon: '🧴', description: 'Productos para tu bienestar.' },
    { id: 5, name: 'Decoración Hogar', category: 'Hogar', price: 45.00, icon: '🏡', description: 'Detalles para espacios especiales.' },
    { id: 6, name: 'Canasta Andina', category: 'Ofertas', price: 59.90, icon: '🎁', description: 'Una selección especial de productos.' }
];

const html = `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>Andina Market | Tienda Online</title>

<meta name="description" content="Andina Market: descubre productos seleccionados, calidad y confianza.">

<style>
:root {
    --green: #164632;
    --green2: #286b4d;
    --gold: #d6ad55;
    --cream: #f7f7f1;
    --text: #26352d;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

html {
    scroll-behavior: smooth;
}

body {
    font-family: Arial, sans-serif;
    color: var(--text);
}

header {
    background: white;
    padding: 20px 7%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
    flex-wrap: wrap;
    box-shadow: 0 3px 15px #0000000c;
    position: sticky;
    top: 0;
    z-index: 10;
}

.logo {
    font-size: 25px;
    font-weight: 900;
    color: var(--green);
}

.logo span {
    color: var(--gold);
}

nav {
    display: flex;
    gap: 25px;
}

nav a {
    text-decoration: none;
    color: #444;
    font-size: 14px;
    font-weight: bold;
}

nav a:hover {
    color: var(--green2);
}

.cart {
    background: var(--green);
    color: white;
    padding: 12px 18px;
    border-radius: 6px;
    border: none;
    cursor: pointer;
    font-weight: bold;
}

.hero {
    background: linear-gradient(120deg, #123b2b, #327653);
    color: white;
    padding: 110px 9%;
    min-height: 460px;
    display: flex;
    align-items: center;
}

.hero-content {
    max-width: 700px;
}

.hero small {
    color: var(--gold);
    letter-spacing: 3px;
    font-weight: bold;
}

.hero h1 {
    font-size: clamp(40px, 6vw, 68px);
    line-height: 1.1;
    margin: 25px 0;
}

.hero p {
    font-size: 18px;
    color: #e0eae2;
    line-height: 1.8;
    margin-bottom: 30px;
}

.btn {
    display: inline-block;
    background: var(--gold);
    color: #183b2b;
    padding: 16px 28px;
    text-decoration: none;
    font-weight: bold;
    border-radius: 5px;
    border: none;
    cursor: pointer;
}

.btn:hover {
    background: white;
}

.benefits {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    padding: 35px 8%;
    background: var(--cream);
    text-align: center;
}

.benefits h3 {
    color: var(--green);
    margin-bottom: 10px;
}

.benefits p {
    color: #777;
    font-size: 14px;
}

.section {
    padding: 75px 8%;
}

.section-title {
    text-align: center;
    margin-bottom: 35px;
}

.section-title h2 {
    color: var(--green);
    font-size: 34px;
    margin-bottom: 12px;
}

.section-title p {
    color: #777;
}

.search-box {
    display: block;
    width: 100%;
    max-width: 500px;
    margin: 0 auto 25px;
    padding: 15px;
    border: 1px solid #ddd;
    border-radius: 7px;
    font-size: 15px;
}

.filters {
    display: flex;
    justify-content: center;
    gap: 10px;
    flex-wrap: wrap;
    margin-bottom: 35px;
}

.filter {
    padding: 11px 20px;
    border: 1px solid #ddd;
    background: white;
    border-radius: 30px;
    cursor: pointer;
}

.filter.active,
.filter:hover {
    background: var(--green);
    color: white;
}

.products {
    background: #f8f9f5;
}

.product-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 25px;
}

.product {
    background: white;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 5px 20px #0000000b;
    transition: .25s;
}

.product:hover {
    transform: translateY(-5px);
}

.product-image {
    height: 190px;
    background: #eaf0e8;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 75px;
}

.product-info {
    padding: 23px;
}

.product-info small {
    color: var(--green2);
    font-weight: bold;
}

.product-info h3 {
    margin: 12px 0;
    color: var(--green);
}

.product-info p {
    color: #777;
    font-size: 14px;
    line-height: 1.6;
    min-height: 42px;
}

.price {
    color: var(--green);
    font-size: 23px;
    font-weight: bold;
    margin: 18px 0;
}

.add-btn {
    width: 100%;
    padding: 13px;
    background: var(--green);
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-weight: bold;
}

.add-btn:hover {
    background: var(--green2);
}

.empty {
    text-align: center;
    padding: 30px;
    color: #777;
    grid-column: 1 / -1;
}

.promo {
    background: var(--green);
    color: white;
    text-align: center;
    padding: 75px 20px;
}

.promo h2 {
    font-size: 34px;
    margin-bottom: 15px;
}

.promo p {
    margin-bottom: 25px;
    color: #dce8df;
}

footer {
    background: #10291f;
    color: white;
    text-align: center;
    padding: 45px 20px;
}

footer p {
    color: #bdcabe;
    margin-top: 12px;
    line-height: 1.7;
}

#cart-panel {
    display: none;
    position: fixed;
    right: 20px;
    top: 90px;
    width: min(350px, calc(100% - 40px));
    max-height: 70vh;
    overflow-y: auto;
    background: white;
    padding: 25px;
    box-shadow: 0 5px 30px #0003;
    border-radius: 12px;
    z-index: 20;
}

#cart-panel h3 {
    color: var(--green);
    margin-bottom: 15px;
}

.cart-item {
    padding: 12px 0;
    border-bottom: 1px solid #eee;
    font-size: 14px;
}

.cart-total {
    font-weight: bold;
    color: var(--green);
    padding: 18px 0;
}

.close-cart {
    float: right;
    border: none;
    background: none;
    font-size: 20px;
    cursor: pointer;
}

@media(max-width: 768px) {
    header {
        justify-content: center;
    }

    nav {
        justify-content: center;
        flex-wrap: wrap;
    }

    .hero {
        padding: 75px 7%;
    }

    .benefits,
    .product-grid {
        grid-template-columns: 1fr;
    }

    .section {
        padding: 55px 6%;
    }
}
</style>
</head>

<body>

<header>
    <div class="logo">ANDINA<span> MARKET.</span></div>

    <nav>
        <a href="#inicio">Inicio</a>
        <a href="#productos">Productos</a>
        <a href="#nosotros">Nosotros</a>
        <a href="#contacto">Contacto</a>
    </nav>

    <button class="cart" onclick="toggleCart()">
        🛒 Carrito (<span id="cart-count">0</span>)
    </button>
</header>

<section class="hero" id="inicio">
    <div class="hero-content">
        <small>BIENVENIDO A ANDINA MARKET</small>

        <h1>Descubre una nueva experiencia de compra.</h1>

        <p>
            Calidad, confianza y productos seleccionados.
            Todo lo que buscas en un solo lugar.
        </p>

        <a href="#productos" class="btn">EXPLORAR TIENDA →</a>
    </div>
</section>

<section class="benefits" id="nosotros">
    <div>
        <h3>✦ Calidad</h3>
        <p>Productos seleccionados para ti.</p>
    </div>

    <div>
        <h3>✓ Confianza</h3>
        <p>Una experiencia de compra sencilla.</p>
    </div>

    <div>
        <h3>♡ Atención</h3>
        <p>Estamos aquí para ayudarte.</p>
    </div>
</section>

<section class="section products" id="productos">
    <div class="section-title">
        <h2>Nuestros productos</h2>
        <p>Encuentra tus productos favoritos.</p>
    </div>

    <input
        class="search-box"
        type="search"
        id="search"
        placeholder="🔍 Buscar productos..."
        aria-label="Buscar productos"
    >

    <div class="filters">
        <button class="filter active" data-category="Todos">Todos</button>
        <button class="filter" data-category="Alimentos">Alimentos</button>
        <button class="filter" data-category="Belleza">Belleza</button>
        <button class="filter" data-category="Hogar">Hogar</button>
        <button class="filter" data-category="Ofertas">Ofertas</button>
    </div>

    <div class="product-grid" id="product-grid"></div>
</section>

<section class="promo">
    <h2>Andina Market</h2>
    <p>Tu confianza es nuestra mejor recompensa.</p>
    <a href="#contacto" class="btn">CONTÁCTANOS</a>
</section>

<footer id="contacto">
    <h2>ANDINA MARKET</h2>
    <p>Calidad que nos conecta.</p>
    <p>© ${new Date().getFullYear()} Andina Market. Todos los derechos reservados.</p>
    <p>Versión ${VERSION}</p>
</footer>

<div id="cart-panel">
    <button class="close-cart" onclick="toggleCart()">✕</button>
    <h3>Tu carrito</h3>
    <div id="cart-items">Tu carrito está vacío.</div>
    <div class="cart-total" id="cart-total">Total: S/ 0.00</div>
    <p style="font-size:12px;color:#777">
        Carrito de demostración. Los pedidos y pagos aún no están habilitados.
    </p>
</div>

<script>
const products = ${JSON.stringify(products)};
let cart = [];
let selectedCategory = 'Todos';

const grid = document.getElementById('product-grid');

function renderProducts() {
    const search = document.getElementById('search').value.toLowerCase();

    const filtered = products.filter(product => {
        const matchesSearch =
            product.name.toLowerCase().includes(search) ||
            product.description.toLowerCase().includes(search);

        const matchesCategory =
            selectedCategory === 'Todos' ||
            product.category === selectedCategory;

        return matchesSearch && matchesCategory;
    });

    if (!filtered.length) {
        grid.innerHTML = '<div class="empty">No encontramos productos.</div>';
        return;
    }

    grid.innerHTML = filtered.map(product => \`
        <article class="product">
            <div class="product-image">\${product.icon}</div>
            <div class="product-info">
                <small>\${product.category}</small>
                <h3>\${product.name}</h3>
                <p>\${product.description}</p>
                <div class="price">S/ \${product.price.toFixed(2)}</div>
                <button class="add-btn" onclick="addToCart(\${product.id})">
                    AGREGAR AL CARRITO
                </button>
            </div>
        </article>
    \`).join('');
}

function addToCart(id) {
    const product = products.find(item => item.id === id);
    const existing = cart.find(item => item.id === id);

    if (existing) {
        existing.quantity++;
    } else {
        cart.push({...product, quantity: 1});
    }

    updateCart();
}

function updateCart() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);

    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity, 0
    );

    document.getElementById('cart-count').textContent = count;

    document.getElementById('cart-items').innerHTML = cart.length
        ? cart.map(item => \`
            <div class="cart-item">
                \${item.icon} \${item.name} × \${item.quantity}
                <strong>S/ \${(item.price * item.quantity).toFixed(2)}</strong>
                <button onclick="removeItem(\${item.id})">Quitar</button>
            </div>
        \`).join('')
        : 'Tu carrito está vacío.';

    document.getElementById('cart-total').textContent =
        'Total: S/ ' + total.toFixed(2);
}

function removeItem(id) {
    cart = cart.filter(item => item.id !== id);
    updateCart();
}

function toggleCart() {
    const panel = document.getElementById('cart-panel');

    panel.style.display =
        panel.style.display === 'block' ? 'none' : 'block';
}

document.getElementById('search').addEventListener('input', renderProducts);

document.querySelectorAll('.filter').forEach(button => {
    button.addEventListener('click', () => {
        selectedCategory = button.dataset.category;

        document.querySelectorAll('.filter').forEach(item => {
            item.classList.remove('active');
        });

        button.classList.add('active');
        renderProducts();
    });
});

renderProducts();
</script>

</body>
</html>`;

const server = http.createServer((req, res) => {
    if (req.url === '/health') {
        res.writeHead(200, {
            'Content-Type': 'application/json; charset=utf-8'
        });

        return res.end(JSON.stringify({
            status: 'ok',
            application: 'Andina Market',
            version: VERSION
        }));
    }

    if (req.method !== 'GET') {
        res.writeHead(405);
        return res.end('Method Not Allowed');
    }

    if (req.url !== '/' && !req.url.startsWith('/?')) {
        res.writeHead(404, {
            'Content-Type': 'text/plain; charset=utf-8'
        });
        return res.end('Página no encontrada');
    }

    res.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'no-store',
        'X-Content-Type-Options': 'nosniff'
    });

    res.end(html);
});

server.listen(PORT, '0.0.0.0', () => {
    console.log('================================');
    console.log('ANDINA MARKET');
    console.log('Versión: ' + VERSION);
    console.log('Puerto: ' + PORT);
    console.log('Estado: funcionando');
    console.log('================================');
});
