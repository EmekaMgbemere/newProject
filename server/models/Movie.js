const mongoose = require("mongoose")

const movieSchema = new mongoose.Schema({
    movietitle:{type:String},
    moviedescription:{type:String},
    movieimage:{type:String},
    movielocation:{type:String},
    theaterid:{type:String},
    movietrailer:{type: String},
    pg:{type: Number}, 
    movieduration:{type: Number}, 
    
});

const Movie = mongoose.model('Movie', movieSchema);
module.exports = Movie;

