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
            <style>
                body { font-family: Arial, sans-serif; margin: 20px; }
                h1 { color: #333; }
                ul { list-style-type: none; padding: 0; }
                li { margin: 10px 0; }
            </style>
        </head>
        <body>
            <h1>TIA Portal Home (Simülasyon)</h1>
            <p>API Versiyonu: V20</p>
            <h2>İçerik Tablosu (TOC)</h2>
            <ul>
                <li><a href="#">S7-1500 Başlangıç</a></li>
                <li><a href="#">S7-1200 Kılavuzu</a></li>
                <li><a href="#">Otomasyon Görevleri</a></li>
                <li><a href="#">Eğitim Merkezi</a></li>
            </ul>
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
