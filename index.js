const express = require('express');
const axios = require('axios').default;
const app = express();
const ejs = require('ejs')


app.set('view engine', 'ejs')
app.use(express.static('public'))

axios.defaults.headers.common['x-api-key'] = "032623c2-6210-480f-bc2f-c0e8d6870935";

app.get('/', async (req, res) => {
    let response = await axios.get('https://api.thecatapi.com/v1/breeds');
    let categories = response.data
   
    res.render('index', { categories })
})

app.get('/category/:id', async (req, res) => {
    let id = req.params.id;
    let responseCat = await axios.get('https://api.thecatapi.com/v1/breeds/search?q=' + id);
    let cat = responseCat.data[0];

    let responseCatImage = await axios.get('https://api.thecatapi.com/v1/images/search?breed_ids=' + id);
    let catImage = responseCatImage.data[0];

    res.render('category', { cat, catImage })
})

app.listen(4040)