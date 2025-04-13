const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const path = require('path');

const app = express();
const port = process.env.PORT || 10000;

// Statik dosyalar (örneğin HTML)
app.use(express.static(path.join(__dirname)));

// TIA Portal Web Server için proxy ayarı
app.use('/proxy', createProxyMiddleware({
  target: 'http://localhost:5112',  // TIA Portal Web Server
  changeOrigin: true,
  secure: false,
  pathRewrite: {
    '^/proxy': '',  // /proxy'den sonrasını olduğu gibi localhost:5112'ye yönlendir
  },
  onProxyRes(proxyRes, req, res) {
    // X-Frame-Options ve CSP gibi başlıkları kaldır
    delete proxyRes.headers['x-frame-options'];
    delete proxyRes.headers['content-security-policy'];
  }
}));

// Dinamik HTML gösterimi (test için)
app.get('/tiaportal', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>TIA Portal Proxy</title>
    </head>
    <body>
        <h1>Iframe içinde TIA Portal</h1>
        <iframe src="/proxy/en-US/tiaportal/home?api=V20" width="100%" height="800px"></iframe>
    </body>
    </html>
  `);
});

app.listen(port, () => {
  console.log(`Sunucu http://localhost:${port} portunda çalışıyor.`);
});
