const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const path = require('path');
const app = express();
const port = process.env.PORT || 10000;

app.use('/tiaportal', createProxyMiddleware({
    target: 'http://localhost:5112', // Yerel sunucu adresi
    changeOrigin: true,
    pathRewrite: {
        '^/tiaportal': '/en-US/tiaportal/home' // Yerel yol
    },
    onProxyReq: (proxyReq, req, res) => {
        proxyReq.setHeader('api', 'V20'); // ?api=V20 parametresini ekle
    }
}));

app.use(express.static(path.join(__dirname)));
app.get('/newsitemap.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'newsitemap.html'));
});

app.listen(port, () => {
    console.log(`Sunucu ${port} portunda çalışıyor.`);
});
