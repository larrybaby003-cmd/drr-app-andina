
const http = require('http');

const VERSION = '2.0';

const html = `
<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Andina Market | Calidad que nos conecta</title>
<meta name="description" content="Descubre productos seleccionados en Andina Market. Calidad, confianza y buenos precios.">

<style>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

:root {
    --green: #173f32;
    --green-light: #245b46;
    --gold: #d5a94d;
    --cream: #f8f7f1;
    --dark: #202820;
}

body {
    font-family: Arial, Helvetica, sans-serif;
    color: var(--dark);
    background: white;
}

header {
    background: white;
    padding: 18px 7%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-shadow: 0 2px 15px rgba(0,0,0,.06);
    position: sticky;
    top: 0;
    z-index: 100;
}

.logo {
    font-size: 25px;
    font-weight: 800;
    color: var(--green);
}

.logo span {
    color: var(--gold);
}

nav {
    display: flex;
    gap: 30px;
}

nav a {
    text-decoration: none;
    color: #444;
    font-weight: 600;
    font-size: 14px;
}

nav a:hover {
    color: var(--gold);
}

.header-btn {
    background: var(--green);
    color: white;
    padding: 12px 22px;
    border-radius: 6px;
    text-decoration: none;
    font-weight: bold;
    font-size: 13px;
}

.hero {
    background: linear-gradient(110deg, #12382c, #28634a);
    color: white;
    min-height: 470px;
    display: flex;
    align-items: center;
    padding: 70px 9%;
}

.hero-content {
    max-width: 650px;
}

.tag {
    color: var(--gold);
    font-weight: bold;
    letter-spacing: 3px;
    font-size: 12px;
    margin-bottom: 20px;
}

.hero h1 {
    font-size: clamp(38px, 5vw, 65px);
    line-height: 1.1;
    margin-bottom: 22px;
}

.hero p {
    color: #e1e9e3;
    font-size: 17px;
    line-height: 1.8;
    margin-bottom: 30px;
}

.primary-btn {
    display: inline-block;
    background: var(--gold);
    color: #172d23;
    text-decoration: none;
    padding: 16px 28px;
    border-radius: 5px;
    font-weight: bold;
    transition: .3s;
}

.primary-btn:hover {
    background: white;
    transform: translateY(-3px);
}

.features {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 25px;
    padding: 35px 9%;
    background: var(--cream);
    text-align: center;
}

.feature {
    padding: 12px;
}

.feature strong {
    display: block;
    color: var(--green);
    margin-bottom: 8px;
}

.feature p {
    color: #777;
    font-size: 13px;
}

.section {
    padding: 75px 9%;
}

.section-title {
    text-align: center;
    margin-bottom: 40px;
}

.section-title h2 {
    color: var(--green);
    font-size: 32px;
    margin-bottom: 12px;
}

.section-title p {
    color: #777;
}

.categories {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
}

.category {
    background: var(--cream);
    padding: 35px 15px;
    text-align: center;
    border-radius: 10px;
    transition: .3s;
}

.category:hover {
    transform: translateY(-6px);
    box-shadow: 0 10px 25px rgba(0,0,0,.08);
}

.category .emoji {
    font-size: 38px;
    margin-bottom: 15px;
}

.category h3 {
    color: var(--green);
    font-size: 17px;
}

.products {
    background: #fafaf7;
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
    box-shadow: 0 4px 20px rgba(0,0,0,.05);
    transition: .3s;
}

.product:hover {
    transform: translateY(-5px);
}

.product-image {
    height: 190px;
    background: #e9eee7;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 75px;
}

.product-info {
    padding: 22px;
}

.product-info h3 {
    color: var(--green);
    margin-bottom: 10px;
}

.product-info p {
    color: #777;
    font-size: 14px;
    line-height: 1.6;
}

.price {
    color: var(--green);
    font-size: 20px;
    font-weight: bold;
    margin-top: 17px;
}

.badge {
    display: inline-block;
    background: #e6f0e8;
    color: var(--green);
    padding: 6px 10px;
    font-size: 11px;
    font-weight: bold;
    border-radius: 20px;
    margin-bottom: 12px;
}

.promo {
    background: var(--green);
    color: white;
    text-align: center;
    padding: 65px 20px;
}

.promo h2 {
    font-size: 34px;
    margin-bottom: 15px;
}

.promo p {
    color: #d7e4dc;
    margin-bottom: 25px;
}

footer {
    background: #10291f;
    color: white;
    padding: 45px 9% 25px;
}

.footer-content {
    display: flex;
    justify-content: space-between;
    gap: 30px;
    flex-wrap: wrap;
    margin-bottom: 35px;
}

footer h3 {
    color: var(--gold);
    margin-bottom: 15px;
}

footer p {
    color: #c5d0c8;
    font-size: 14px;
    line-height: 1.8;
}

.copyright {
    border-top: 1px solid #355044;
    padding-top: 20px;
    text-align: center;
    color: #aab9af;
    font-size: 12px;
}

@media(max-width: 768px) {
    header {
        padding: 18px 5%;
        flex-wrap: wrap;
        gap: 15px;
    }

    nav {
        order: 3;
        width: 100%;
        justify-content: center;
        gap: 18px;
        flex-wrap: wrap;
    }

    nav a {
        font-size: 12px;
    }

    .hero {
        padding: 65px 7%;
    }

    .features {
        grid-template-columns: 1fr;
    }

    .categories {
        grid-template-columns: repeat(2, 1fr);
    }

    .product-grid {
        grid-template-columns: 1fr;
    }

    .section {
        padding: 55px 6%;
    }

    .promo h2 {
        font-size: 27px;
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

    <a class="header-btn" href="#productos">Explorar tienda</a>
</header>

<section class="hero" id="inicio">
    <div class="hero-content">
        <div class="tag">BIENVENIDO A ANDINA MARKET</div>

        <h1>Calidad que nos conecta, confianza que nos inspira.</h1>

        <p>
            Descubre una nueva experiencia de compra.
            Encuentra productos seleccionados, calidad y
            excelentes opciones en un solo lugar.
        </p>

        <a href="#productos" class="primary-btn">
            DESCUBRIR PRODUCTOS →
        </a>
    </div>
</section>

<section class="features">
    <div class="feature">
        <strong>✦ Calidad seleccionada</strong>
        <p>Productos elegidos pensando en ti.</p>
    </div>

    <div class="feature">
        <strong>✓ Compra con confianza</strong>
        <p>Una experiencia sencilla y transparente.</p>
    </div>

    <div class="feature">
        <strong>♡ Atención personalizada</strong>
        <p>Estamos aquí para ayudarte.</p>
    </div>
</section>

<section class="section" id="categorias">
    <div class="section-title">
        <h2>Explora nuestras categorías</h2>
        <p>Encuentra lo que necesitas de manera sencilla.</p>
    </div>

    <div class="categories">
        <div class="category">
            <div class="emoji">🥑</div>
            <h3>Alimentos</h3>
        </div>

        <div class="category">
            <div class="emoji">🏡</div>
            <h3>Hogar</h3>
        </div>

        <div class="category">
            <div class="emoji">🧴</div>
            <h3>Cuidado personal</h3>
        </div>

        <div class="category">
            <div class="emoji">🎁</div>
            <h3>Ofertas especiales</h3>
        </div>
    </div>
</section>

<section class="section products" id="productos">
    <div class="section-title">
        <h2>Productos destacados</h2>
        <p>Una selección especial para nuestros clientes.</p>
    </div>

    <div class="product-grid">

        <article class="product">
            <div class="product-image">🌾</div>
            <div class="product-info">
                <span class="badge">DESTACADO</span>
                <h3>Productos naturales</h3>
                <p>Opciones seleccionadas para tu día a día.</p>
            </div>
        </article>

        <article class="product">
            <div class="product-image">☕</div>
            <div class="product-info">
                <span class="badge">SELECCIÓN ESPECIAL</span>
                <h3>Café y bebidas</h3>
                <p>Disfruta de sabores para cada momento.</p>
            </div>
        </article>

        <article class="product">
            <div class="product-image">🛍️</div>
            <div class="product-info">
                <span class="badge">RECOMENDADO</span>
                <h3>Productos para el hogar</h3>
                <p>Soluciones prácticas para tu hogar.</p>
            </div>
        </article>

    </div>
</section>

<section class="promo">
    <h2>¡Bienvenido a una nueva forma de comprar!</h2>
    <p>Andina Market: calidad, confianza y una experiencia diferente.</p>
    <a href="#contacto" class="primary-btn">CONÓCENOS</a>
</section>

<footer id="contacto">
    <div class="footer-content">
        <div>
            <h3>ANDINA MARKET</h3>
            <p>Calidad que nos conecta.<br>
            Tu confianza es nuestra prioridad.</p>
        </div>

        <div>
            <h3>Navegación</h3>
            <p>Inicio<br>Categorías<br>Productos<br>Contacto</p>
        </div>

        <div>
            <h3>Información</h3>
            <p>Atención al cliente<br>
            Consultas y pedidos<br>
            Información comercial</p>
        </div>
    </div>

    <div class="copyright">
        © ${new Date().getFullYear()} Andina Market.
        Todos los derechos reservados.
        | Versión ${VERSION}
    </div>
</footer>

</body>
</html>
`;

http.createServer((req, res) => {
    res.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8'
    });

    res.end(html);

}).listen(3000, '0.0.0.0', () => {
    console.log('Andina Market funcionando en el puerto 3000');
});

