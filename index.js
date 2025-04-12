const express = require('express');
const axios = require('axios');
const app = express();

const tiaPortalBaseUrl = 'https://tia-portal-genel.com'; // TIA Portal’ın genel URL’sini buraya yazın

app.get('/tiaportal/*', async (req, res) => {
  try {
    const path = req.path.replace('/tiaportal', '');
    const fullUrl = `${tiaPortalBaseUrl}${path}${req.url.includes('?') ? req.url.split('?')[1] : ''}`;
    console.log(`İstek gönderiliyor: ${fullUrl}`);
    const response = await axios.get(fullUrl, {
      httpsAgent: new (require('https').Agent)({ rejectUnauthorized: false })
    });
    console.log('Yanıt alındı:', response.status);

    // Eğer yanıt HTML ise, script yollarını güncelle
    if (response.headers['content-type'].includes('text/html')) {
      let html = response.data;
      // Script yollarını TIA Portal’ın genel URL’sinden proxy URL’sine yönlendir
      html = html.replace(/(src|href)="(\/[^"]*)"/g, `$1="${tiaPortalBaseUrl}$2"`);
      res.send(html);
    } else {
      res.send(response.data);
    }
  } catch (error) {
    console.error('Hata oluştu:', error.message);
    if (error.response) {
      console.error('Yanıt durumu:', error.response.status);
      console.error('Yanıt verisi:', error.response.data);
    }
    res.status(500).send('Hata: ' + error.message);
  }
});

const port = process.env.PORT || 10000;
app.listen(port, () => console.log(`Proxy sunucusu ${port} portunda çalışıyor`));
