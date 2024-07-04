const express = require('express');
const cors = require('cors');
const cheerio = require('cheerio');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());
const port = 8000;


app.get('/scrap', async (req, res) => {
    const { url, scrapeOption } = req.body;
    try {
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);
        let divContents = []
        if (scrapeOption === 'entire') {
            $('body').each((_, element) => {
                divContents.push($(element).text().trim());
            });
        }
        else
            $(`${scrapeOption}`).each((_, element) => {
                divContents.push($(element).text().trim());
            });

        res.json(divContents.join('.'));

    }
    catch (e) {
        console.log(e)
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});