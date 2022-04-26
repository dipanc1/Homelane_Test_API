const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
var MongoClient = require('mongodb').MongoClient;
const mongoose = require("mongoose");
const { mongo_url } = require("./mongo_auth");
const Houses = require("./model/Houses");
const { MaxKey } = require("mongodb");
const router = require("express").Router();

const app = express();

app.use(
    cors({
        origin: "*",
    })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(
    mongo_url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    () => {
        console.log("Connected to MongoDB");
    }, 600000
);

// MongoClient.connect(mongo_url, function async(err, db) {
//     if (err) throw err;
//     var dbo = db.db("Homelane");
//     console.log("Connected to database");


//     dbo.collection("houses").find(findPrice).toArray(function(err, result) {
//         if (err) throw err;
//         console.log(result);
//         priceRange = result;
//         db.close();
//     });

// });

app.use("/", router.get("/pricerange", async(req, res) => {
    const params = req.body;
    const min = params.min;
    const max = params.max;

    console.log(min, max);

    const findPrice = await Houses.find().where('price').gt(min).lt(max);

    console.log(findPrice);

    res.send(findPrice);

}));

app.use("/", router.get("/minsqft", async(req, res) => {
    const params = req.body;
    const min = params.min;

    console.log(min);

    // var sqft_above = {
    //     'sqft_living': { $gte: min }
    // }

    // console.log(sqft_above);

    const sqft_living = await Houses.find().where('sqft_living').gt(min);

    console.log(sqft_living);

    res.send(sqft_living);

}));

app.use("/", router.get("/yearbuilt", async(req, res) => {
    const params = req.body;
    const yearbuilt = params.yearbuilt;

    console.log(yearbuilt);

    var year_house_built = {
        'yr_built': { $gte: yearbuilt }
        // $or: [{
        //         'yr_built': { $gte: `${yearbuilt}` }
        //     },
        //     {
        //         'yr_renovated': { $gte: `${yearbuilt}` }
        //     }
        // ]
    }

    console.log(year_house_built);

    const year_built = await Houses.find().where('yr_built').gt(yearbuilt).or(Houses.find().where('yr_renovated').gt(yearbuilt));

    console.log(year_built);

    res.send(year_built);

}));



const PORT = "8000";
app.listen(PORT, () => {
    console.log(`Port running on http://localhost:${PORT} `);
});