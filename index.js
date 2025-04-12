const express = require('express');
const axios = require('axios');
const app = express();

app.get('/tiaportal', async (req, res) => {
  try {
    console.log('TIA Portal isteği alındı');
    const tiaPortalUrl = 'https://tia-portal-ornek.com/en-US/tiaportal/home?api=V20';
    console.log(`TIA Portal URL’sine istek gönderiliyor: ${tiaPortalUrl}`);
    const response = await axios.get(tiaPortalUrl, {
      httpsAgent: new (require('https').Agent)({ rejectUnauthorized: false })
    });
    console.log('TIA Portal’dan yanıt alındı:', response.status);
    res.send(response.data);
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
