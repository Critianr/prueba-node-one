const express = require('express');
const morgan = require('morgan');
const port = 3000;
const axios = require('axios');
// const weatherRoutes = require('./routes/index')
const bodyParser = require('body-parser');
const app = express();

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({extended: false}))
// app.use(bodyParser.json())

app.use(express.static(__dirname + '/../public'));

app.post("/weather", async (req,res)=>{
    const city = await req.body.ciudad;
    if (city != '') {
    axios.get('https://community-open-weather-map.p.rapidapi.com/weather',{
      params: {
      q: city,
      mode: 'json'
    },
    headers: {
      'X-RapidAPI-Host': 'community-open-weather-map.p.rapidapi.com',
      'X-RapidAPI-Key': 'db1d13ee8emsh8de4da56c3ae7e6p138cadjsn876a4b63140e',
    //   'Content-Type': 'application/x-www-form-urlencoded'
    }
})
.then(response => {
    res.write(
        `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
        </head>
        <body>
        <div> 
            <h1>Datos del clima</h1>
            <ul> 
            <h1>Ciudad ${response.data.name}</h1>
            <li>Cielo: ${response.data.weather[0].main} : ${response.data.clouds.all}</li>
            <li>Descripcion: ${response.data.weather[0].description}</li>
            <li>Presion: ${response.data.main.pressure}</li>
            <li>Humidity: ${response.data.main.humidity}</li>
            <li>Vientos: ${response.data.wind.speed}</li>
            <li>N: ${response.data.wind.speed}</li>
            </ul>
        </div>
        </body>
        </html>`
    )
    // console.log(response.data)
    console.log(response.data.name)
    console.log(response.data.weather[0].main)
    console.log(`Presion ${response.data.main.pressure}`)
    // console.log(`Humedad ${response.data.coord[lon]}`)
    
})
.catch(error => {
    console.log(error.response);
  });
        
    }else {
        res.send( 'fallo de renderizado' );
    }
})


app.listen(port, () => {
    console.log(`inicio de ${port}`);
});
