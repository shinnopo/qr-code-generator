const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

app.get('/', async (req, res) => {
    try {
        const response = await axios.get('https://api.qrserver.com/v1/create-qr-code/', {
            params: {
                size: '150x150',
                data: 'Hello, World!'
            },
            responseType: 'arraybuffer'
        });

        res.writeHead(200, {
            'Content-Type': 'image/png',
            'Content-Length': response.data.length
        });
        res.end(response.data);
    } catch (error) {
        console.error('Error fetching QR code:', error);
        res.status(500).send('Error generating QR code');
    }
});

app.listen(port, () => {
    console.log(`QR Code Generator app listening at http://localhost:${port}`);
});