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
            <h1>TIA Portal Home (Simülasyon)</h1>
            <p>Bu, internetten oluşturulan bir test sayfasıdır. API: V20</p>
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
