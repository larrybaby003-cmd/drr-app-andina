
const http = require('http');

const VERSION = '3.0';
const PORT = process.env.PORT || 3000;

const products = [
    { name: 'Café Andino', price: 25.90, icon: '☕', category: 'Alimentos' },
    { name: 'Quinua Premium', price: 18.50, icon: '🌾', category: 'Alimentos' },
    { name: 'Miel Natural', price: 22.00, icon: '🍯', category: 'Alimentos' },
    { name: 'Cuidado Personal', price: 29.90, icon: '🧴', category: 'Belleza' },
    { name: 'Decoración Hogar', price: 45.00, icon: '🏡', category: 'Hogar' },
    { name: 'Canasta Andina', price: 59.90, icon: '🎁', category: 'Ofertas' }
];

const productHTML = products.map(p => `
    <article class="product">
        <div class="product-icon">${p.icon}</div>
        <div class="product-info">
            <small>${p.category}</small>
            <h3>${p.name}</h3>
            <p>Calidad seleccionada para ti.</p>
            <strong>S/ ${p.price.toFixed(2)}</strong>
        </div>
    </article>
`).join('');

const html = `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Andina Market | Tienda Online</title>
<meta name="description" content="Andina Market. Calidad, confianza y productos seleccionados.">

<style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:Arial,sans-serif;color:#26352d}
header{padding:22px 8%;display:flex;justify-content:space-between;align-items:center;background:white;flex-wrap:wrap;gap:20px}
.logo{font-size:25px;font-weight:900;color:#164632}
.logo span{color:#d6ad55}
nav{display:flex;gap:25px;flex-wrap:wrap}
nav a{text-decoration:none;color:#333;font-weight:bold;font-size:14px}
.hero{background:linear-gradient(120deg,#123b2b,#367653);padding:110px 9%;color:white}
.hero small{color:#e3c16f;letter-spacing:3px}
.hero h1{font-size:clamp(40px,6vw,68px);max-width:700px;margin:25px 0;line-height:1.1}
.hero p{font-size:18px;line-height:1.8;color:#e0eae2;margin-bottom:30px}
.btn{display:inline-block;background:#d6ad55;color:#173d2c;padding:16px 28px;text-decoration:none;font-weight:bold;border-radius:5px}
.benefits{display:grid;grid-template-columns:repeat(3,1fr);gap:25px;padding:40px 8%;background:#f7f8f3;text-align:center}
.benefits h3{color:#164632;margin-bottom:10px}
.benefits p{color:#777;font-size:14px}
.section{padding:75px 8%}
.heading{text-align:center;margin-bottom:40px}
.heading h2{font-size:34px;color:#164632;margin-bottom:12px}
.heading p{color:#777}
.products{background:#f8f9f5}
.grid{display:grid;grid-template-columns:repeat(3,1fr);gap:25px}
.product{background:white;border-radius:12px;overflow:hidden;box-shadow:0 5px 20px #0000000c;transition:.2s}
.product:hover{transform:translateY(-5px)}
.product-icon{height:190px;background:#eaf0e8;display:grid;place-items:center;font-size:75px}
.product-info{padding:25px}
.product-info small{color:#367653;font-weight:bold}
.product-info h3{color:#164632;margin:12px 0}
.product-info p{color:#777;margin-bottom:15px}
.product-info strong{font-size:22px;color:#164632}
.promo{background:#164632;color:white;text-align:center;padding:70px 20px}
.promo h2{font-size:32px;margin-bottom:15px}
.promo p{margin-bottom:25px;color:#dce8df}
footer{background:#10291f;color:white;text-align:center;padding:40px 20px}
footer p{color:#bdcabe;margin-top:12px;line-height:1.7}
@media(max-width:768px){
header{justify-content:center}
nav{justify-content:center}
.hero{padding:75px 7%}
.benefits,.grid{grid-template-columns:1fr}
.section{padding:55px 6%}
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
</header>

<section class="hero" id="inicio">
<small>BIENVENIDO A ANDINA MARKET</small>
<h1>Calidad que nos conecta.</h1>
<p>Descubre una nueva experiencia de compra. Productos seleccionados, calidad y confianza en un solo lugar.</p>
<a href="#productos" class="btn">EXPLORAR TIENDA →</a>
</section>

<section class="benefits" id="nosotros">
<div><h3>✦ Calidad</h3><p>Productos seleccionados para ti.</p></div>
<div><h3>✓ Confianza</h3><p>Compra con tranquilidad.</p></div>
<div><h3>♡ Atención</h3><p>Estamos aquí para ayudarte.</p></div>
</section>

<section class="section products" id="productos">
<div class="heading">
<h2>Nuestros productos</h2>
<p>Descubre nuestra selección especial.</p>
</div>
<div class="grid">${productHTML}</div>
</section>

<section class="promo">
<h2>Tu experiencia comienza aquí</h2>
<p>Andina Market: calidad, confianza y buenos momentos.</p>
<a href="#contacto" class="btn">CONTÁCTANOS</a>
</section>

<footer id="contacto">
<h2>ANDINA MARKET</h2>
<p>Calidad que nos conecta.</p>
<p>© ${new Date().getFullYear()} Andina Market. Todos los derechos reservados.</p>
<p>Versión ${VERSION}</p>
</footer>

</body>
</html>`;

const server = http.createServer((req, res) => {
    if (req.url === '/health') {
        res.writeHead(200, {'Content-Type':'application/json'});
        return res.end(JSON.stringify({
            status: 'ok',
            version: VERSION,
            application: 'Andina Market'
        }));
    }

    if (req.method !== 'GET' || !['/', '/favicon.ico'].includes(req.url.split('?')[0])) {
        res.writeHead(404);
        return res.end('Página no encontrada');
    }

    res.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'no-store'
    });

    res.end(html);
});

server.listen(PORT, '0.0.0.0', () => {
    console.log(`Andina Market ${VERSION} funcionando en puerto ${PORT}`);
});

