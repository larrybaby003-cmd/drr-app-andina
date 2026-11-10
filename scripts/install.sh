
#!/bin/bash
set -e

cd /home/ubuntu/app

echo "Instalando Andina Market..."

node --check app.js

if command -v pm2 >/dev/null 2>&1; then
    pm2 restart andina-market || pm2 start app.js --name andina-market
    pm2 save
else
    echo "PM2 no está instalado. Instala PM2 para administrar la aplicación."
fi

echo "Instalación y despliegue completados."
