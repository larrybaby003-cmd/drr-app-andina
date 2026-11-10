
const http = require('http');

const VERSION = '2.0';

const html = `
<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Andina Market | Tu tienda de confianza</title>

<style>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: Arial, sans-serif;
    color: #26352d;
    background: #fff;
}

header {
    background: #173f32;
    color: white;
    padding: 22px 8%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 15px;
}

.logo {
    font-size: 26px;
    font-weight: bold;
}

.logo span {
    color: #d8b45b;
}

nav {
    display: flex;
    gap: 25px;
    flex-wrap: wrap;
}

nav a {
    color: white;
    text-decoration: none;
    font-size: 14px;
}

nav a:hover {
    color: #d8b45b;
}

.hero {
    background: linear-gradient(120deg, #153d30, #367052);
    color: white;
    padding: 110px 9%;
}

.hero-content {
    max-width: 700px;
}

.hero small {
    color: #e1bd67;
    letter-spacing: 3px;
    font-weight: bold;
}

.hero h1 {
    font-size: clamp(38px, 6vw, 65px);
    margin: 25px 0;
    line-height: 1.1;
}

.hero p {
    font-size: 18px;
    line-height: 1.7;
    color: #e1e9e3;
    margin-bottom: 30px;
}

.btn {
    display: inline-block;
    background: #d8b45b;
    color: #173f32;
    padding: 16px 28px;
    border-radius: 5px;
    text-decoration: none;
    font-weight: bold;
}

.section {
    padding: 75px 8%;
}

.section-title {
    text-align: center;
    margin-bottom: 45px;
}

.section-title h2 {
    font-size: 32px;
    color: #173f32;
    margin-bottom: 12px;
}

.section-title p {
    color: #777;
}

.benefits {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 25px;
    background: #f7f8f3;
    padding: 35px 8%;
    text-align: center;
}

.benefit h3 {
    color: #173f32;
    margin-bottom: 10px;
}

.benefit p {
    color: #777;
    font-size: 14px;
}

.categories {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
}

.category {
    background: #f4f6f0;
    padding: 35px 15px;
    text-align: center;
    border-radius: 10px;
}

.category .icon {
    font-size: 45px;
    margin-bottom: 15px;
}

.category h3 {
    color: #173f32;
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
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 5px 20px #0000000c;
}

.product-image {
    height: 190px;
    background: #e9eee7;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 70px;
}

.product-info {
    padding: 25px;
}

.product-info h3 {
    color: #173f32;
    margin-bottom: 12px;
}

.product-info p {
    color: #777;
    line-height: 1.6;
}

.promo {
    background: #173f32;
    color: white;
    padding: 65px 20px;
    text-align: center;
}

.promo h2 {
    font-size: 32px;
    margin-bottom: 15px;
}

.promo p {
    margin-bottom: 25px;
    color: #d9e4dc;
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

@media(max-width: 768px) {
    header {
        justify-content: center;
    }

    nav {
        justify-content: center;
    }

    .hero {
        padding: 75px 7%;
    }

    .categories {
        grid-template-columns: repeat(2, 1fr);
    }

    .product-grid,
    .benefits {
        grid-template-columns: 1fr;
    }
}
</style>
</head>

<body>

<header>
    <div class="logo">ANDINA<span> MARKET.</span></div>

    <nav>
        <a href="#inicio">Inicio</a>
        <a href="#categorias">Categorías</a>
        <a href="#productos">Productos</a>
        <a href="#contacto">Contacto</a>
    </nav>
</header>

<section class="hero" id="inicio">
    <div class="hero-content">
        <small>BIENVENIDO A ANDINA MARKET</small>

        <h1>Calidad que nos conecta.</h1>

        <p>
            Descubre una nueva experiencia de compra.
            Productos seleccionados, calidad y confianza
            en un solo lugar.
        </p>

        <a href="#productos" class="btn">EXPLORAR PRODUCTOS →</a>
    </div>
</section>

<section class="benefits">
    <div class="benefit">
        <h3>✦ Calidad</h3>
        <p>Productos seleccionados para ti.</p>
    </div>

    <div class="benefit">
        <h3>✓ Confianza</h3>
        <p>Compra con tranquilidad.</p>
    </div>

    <div class="benefit">
        <h3>♡ Atención</h3>
        <p>Estamos aquí para ayudarte.</p>
    </div>
</section>

<section class="section" id="categorias">
    <div class="section-title">
        <h2>Nuestras categorías</h2>
        <p>Encuentra lo que necesitas.</p>
    </div>

    <div class="categories">
        <div class="category">
            <div class="icon">🥑</div>
            <h3>Alimentos</h3>
        </div>

        <div class="category">
            <div class="icon">🏡</div>
            <h3>Hogar</h3>
        </div>

        <div class="category">
            <div class="icon">🧴</div>
            <h3>Cuidado personal</h3>
        </div>

        <div class="category">
            <div class="icon">🎁</div>
            <h3>Ofertas</h3>
        </div>
    </div>
</section>

<section class="section products" id="productos">
    <div class="section-title">
        <h2>Productos destacados</h2>
        <p>Descubre nuestra selección especial.</p>
    </div>

    <div class="product-grid">
        <div class="product">
            <div class="product-image">🌾</div>
            <div class="product-info">
                <h3>Productos naturales</h3>
                <p>Calidad para acompañar tu día.</p>
            </div>
        </div>

        <div class="product">
            <div class="product-image">☕</div>
            <div class="product-info">
                <h3>Café y bebidas</h3>
                <p>Sabores para disfrutar cada momento.</p>
            </div>
        </div>

        <div class="product">
            <div class="product-image">🛍️</div>
            <div class="product-info">
                <h3>Productos para el hogar</h3>
                <p>Soluciones prácticas para tu hogar.</p>
            </div>
        </div>
    </div>
</section>

<section class="promo">
    <h2>Tu experiencia comienza aquí</h2>
    <p>Andina Market: calidad, confianza y buenos momentos.</p>
    <a href="#contacto" class="btn">CONTÁCTANOS</a>
</section>

<footer id="contacto">
    <h2>ANDINA MARKET</h2>
    <p>Calidad que nos conecta.<br>
    Tu confianza es nuestra prioridad.</p>
    <p>© ${new Date().getFullYear()} Andina Market. Todos los derechos reservados.</p>
    <p>Versión ${VERSION}</p>
</footer>

</body>
</html>
`;

const server = http.createServer((req, res) => {
    res.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8'
    });

    res.end(html);
});

server.listen(3000, '0.0.0.0', () => {
    console.log(`Andina Market versión ${VERSION} funcionando en puerto 3000`);
});
