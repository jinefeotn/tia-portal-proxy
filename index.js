const express = require('express');
const axios = require('axios');
const app = express();

app.get('/tiaportal', async (req, res) => {
  try {
    // TIA Portal'ın genel URL'sini buraya ekleyin
    const tiaPortalUrl = 'https://localhost:5112/en-us/tiaportal/home?api=V20';
    const response = await axios.get(tiaPortalUrl, {
      // Yerel test için HTTPS sertifika doğrulamasını devre dışı bırakma (production'da kaldırın)
      httpsAgent: new (require('https').Agent)({ rejectUnauthorized: false })
    });
    res.send(response.data);
  } catch (error) {
    res.status(500).send('Hata: ' + error.message);
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Proxy sunucusu ${port} portunda çalışıyor`));
