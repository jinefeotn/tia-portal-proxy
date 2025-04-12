const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Statik dosyaları sunmak için 'public' klasörü ayarlıyoruz
app.use(express.static(path.join(__dirname, 'public')));

// Ana sayfa
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
  console.log(`Sunucu http://localhost:${port} adresinde çalışıyor`);
});
