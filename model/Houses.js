const mongoose = require("mongoose");

const HouseSchema = new mongoose.Schema({
    date: {
        type: String,
    },
    price: {
        type: String,
    },
    bedrooms: {
        type: String,
    },
    bathrooms: {
        type: String,
    },
    sqft_living: {
        type: String,
    },
    sqft_lot: {
        type: String,
    },
    floors: {
        type: String,
    },
    waterfront: {
        type: String,
    },
    view: {
        type: String,
    },
    condition: {
        type: String,
    },
    sqft_above: {
        type: String,
    },
    sqft_basement: {
        type: String,
    },
    yr_built: {
        type: String,
    },
    yr_renovated: {
        type: String,
    },
    street: {
        type: String,
    },
    city: {
        type: String,
    },
    statezip: {
        type: String,
    },
    country: {
        type: String,
    }
});

const Houses = mongoose.model("Homelane", HouseSchema, "houses");

module.exports = Houses;