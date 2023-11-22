// server/server.js
const express = require('express');
const cors = require('cors');
const { getWebsiteData } = require('./main');

const app = express();
app.use(cors());

app.get('/api/test', (req, res) => {
    
})

app.get('/api/getWebsiteData', async(req, res) => {

    console.log('im here');
    const url = req.query.url;
    console.log('Received url - ', url);
    if (!url) {
        return res.status(400).send('URL is required');
    }
    const data = await getWebsiteData(url);
    res.json(data);
});



app.listen(5000, () => {
    console.log('Server is running on http://localhost:5000');
});
