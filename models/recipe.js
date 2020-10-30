const { Schema, model } = require("mongoose");

const recipeSchema = new Schema(
    { 
        username: {type: String, required: true},
        image: {type: String},
        name: {type: String, required: true},
        ingredient:{type: String, required: true},
        instructions: {type: String}
    }, 
    { timestamp: true }
    );

    //RECIPE MODEL
    const Recipe = model("recipe", recipeSchema)

    //EXPORT MODEL
    module.exports = Recipe