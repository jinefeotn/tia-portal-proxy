const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 10000;

app.use(express.static(path.join(__dirname)));

app.get('/tiaportal', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>TIA Portal Home</title>
        </head>
        <body>
            <h1>TIA Portal Home</h1>
            <p>Bu sayfa, Render üzerinden simüle edilmiştir. Orijinal URL: https://localhost:5112/en-US/tiaportal/home?api=V20</p>
            <p>API Versiyonu: V20</p>
            <p>Örnek Veri: TIA Portal kontrol paneli simülasyonu.</p>
        </body>
        </html>
    `);
});

app.get('/newsitemap.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'newsitemap.html'));
});

app.listen(port, () => {
    console.log(`Sunucu ${port} portunda çalışıyor.`);
});
