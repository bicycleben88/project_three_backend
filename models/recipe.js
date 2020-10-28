const { Schema, model } = require("mongoose");

const recipeSchema = new Schema(
    { 
        name: String 
    }, 
    { timestamp: true }
    );

    //RECIPE MODEL
    const Recipe = model("recipe", recipeSchema)

    //EXPORT MODEL
    module.exports = Recipe