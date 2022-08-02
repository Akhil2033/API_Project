const express = require("express");
const path = require("path");
const axios = require("axios");
const qs = require("querystring"); //built-in querystring module for manipulating query strings
const dotenv = require("dotenv");
dotenv.config();

const app = express();
const port = process.env.PORT || "8888";


const CoinApi = "https://rest.coinapi.io";
const ExApi = "https://api.apilayer.com";
const key = "6b7e7154e0cbd8cb62d9a52c";

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

//set up static path (for use with CSS, client-side JS, and image files)
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    getCoinInfo(res);
});

app.get("/exchange_rates", (req, res) => {
    getEx(res);
});

// app.get("/icons", (req, res) => {
//     getCoinIcons(res);
// });

app.get("/user", (req, res) => {
    getAll(res);
});

app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
});


function getCoinInfo(res) {
    axios(
        {
            url: `${CoinApi}/v1/assets`,
            method: 'get',
            headers: {
                "Accept": "application/json",
                "Accept-Encoding": "deflate, gzip",
                "X-CoinAPI-Key": process.env.API_KEY
            }
        }
    ).then (function (response) {
        res.render("index", { title: "Home", assets: response.data });
    }).catch(function (error) {
        //Put what to do on error here.
        console.log(error);
    });
}

function getEx(res) {
    axios(
        {
            url: `https://exchange-rates.abstractapi.com/v1/live/?api_key=376996028ffb4393b6b166f6585761a0&base=USD`,
            method: 'get'
        }
    ).then (function (response) {
        res.render("exchange_rates", { title: "exchange_rates", exchange_rates: response.data });
    }).catch(function (error) {
        //Put what to do on error here.
        console.log(error);
    });
}


axios.get('https://exchange-rates.abstractapi.com/v1/live/?api_key=376996028ffb4393b6b166f6585761a0&base=USD')
    .then(response => {
        console.log(response.data);
    })
    .catch(error => {
        console.log(error);
    });

// function getCoinIcons(res) {
//     axios(
//         {
//             url: `${CoinApi}/v1/assets/icons/{100px}`,
//             method: 'get',
//             headers: {
//                 "Accept": "application/json",
//                 "Accept-Encoding": "deflate, gzip",
//                 "X-CoinAPI-Key": process.env.API_KEY
//             }
//         }
//     ).then (function (response) {
//         res.render("icons", { title: "icons", icons: response.data });
//     }).catch(function (error) {
//         //Put what to do on error here.
//         console.log(error);
//     });
// }


// function getAll(res) {
//     let endpoints = [
//         "https://rest.coinapi.io/v1/assets/icons/{100}?apikey=E5425071-DFEC-4E3D-9F2E-F94159F21B34",
//         "https://rest.coinapi.io/v1/assets?apikey=E5425071-DFEC-4E3D-9F2E-F94159F21B34", 
  
//       ];
//       Promise.all(endpoints.map((endpoint) => axios.get(endpoint))).then(([{data: icons}, {data: assets}] )=> {
//         res.render("user", { title: "ALL", icons, assets });
//     });
// }








// function getAll(res) {
//     const endpoints = [
//        "https://rickandmortyapi.com/api/character",
//        "https://www.breakingbadapi.com/api/characters",
//        "https://www.breakingbadapi.com/api/episodes",
//        "https://www.breakingbadapi.com/api/quotes",
//      ];
//      axios.all(endpoints.map((endpoint) => axios.get(endpoint))).then((allResponses) => {
//          allResponses.forEach((response) => {
//            res.render("user", { title: "assets", episodes: response.data });
//        });
//      });
// }

