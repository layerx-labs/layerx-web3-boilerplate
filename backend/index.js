require('dotenv').config()
const cloudinary = require('cloudinary').v2;
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const axios = require('axios');
const port = 4000


// basic configs for better running
const app = express()

cloudinary.config({
    cloud_name: 'dsebklwp5',
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  });

app.use(cors({
    origin: '*'
}))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json())

// listen on env variable or port = 4000
app.listen(process.env.PORT || port, () => console.log(`Started at port ${port}`))

// cors configs
app.use(function (_, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


// backend routes
app.get('/', (_, res) => res.send("Running"))

app.get('/get_images/:stringParam', async (req, res) => {
    const [id, prompt] = req.params.stringParam.split("&");
    try {
      const response = await axios.post('https://api.openai.com/v1/images/generations', {
        "model": "image-alpha-001",
        "prompt": prompt,
        "num_images": 1,
        "size": "256x256"
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
        }
      });
      const imageUrl = response.data.data[0].url;
      const uploadResult = await cloudinary.uploader.upload(imageUrl, { public_id: id, version: 'v1' });
      console.log(uploadResult);
      res.send(1);
    } catch (error) {
      console.error(error);
      res.send(0);
    }
  });

