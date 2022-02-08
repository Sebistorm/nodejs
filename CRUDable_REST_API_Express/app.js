const express = require("express");
const app = express();

app.use(express.json());

// movie array (fake database)
let moviesArray = [
    {
        id: 1,
        title: "Lord of the Rings: The fellowship",
        year: 1997,
        catogory : "fantasy",
        length: 140 
    },         
    {
        id: 2,
        title: "Batman: The Dark knight returns",
        year: 2003,
        catogory : "Superheroes",
        length: 140 
    },
    {
        id: 3,
        title: "Forest Gump",
        year: 2000,
        catogory : "Family",
        length: 110 
    }
]

app.get("/movies", (req, res) => {
    res.send({movies:moviesArray});
})

app.get("/movies/:id", (req, res) => {
    for(let i = 0; i < moviesArray.length; i++) {
        if (moviesArray[i].id == req.params.id) {
            return res.send({message : "Movie found", moviesArray: moviesArray[i]});
        }
    }
    res.send({message: "Movie not found"});
})

app.post("/movies", (req, res) => {
    console.log(req.body.title);
    const newMovie = {
        id: req.body.id,
        title: req.body.title,
        year: req.body.year,
        catogory: req.body.catogory,
        length: req.body.length
    }
    moviesArray.push(newMovie)
    res.send({newMovie: newMovie, moviesArray:moviesArray});
})

app.delete("/movies/:id", (req, res) => {
    for(let i = 0; i < moviesArray.length; i++) {
        if (moviesArray[i].id == req.params.id) {
            // Save the title before deleting it in the array
            let deletedMovieTitle = moviesArray[i].title;
            moviesArray.splice(i, 1);
            return res.send({message : deletedMovieTitle + " has been deleted", moviesArray: moviesArray});
        }
    }
    res.send({message : "Error", moviesArray: moviesArray});
    
})

app.put("/movies/:id", (req, res) => {
    for(let i = 0; i < moviesArray.length; i++) {
        if (moviesArray[i].id == req.params.id) {
            // Save the title before updating it in the array
            let oldMovieTitle = moviesArray[i].title;
            moviesArray[i].title = req.body.title
            moviesArray[i].year = req.body.year
            moviesArray[i].catogory = req.body.catogory
            moviesArray[i].length = req.body.length
            return res.send({message : oldMovieTitle + " has been Updated to " + moviesArray[i].title, updatedMovie: moviesArray[i], movies: moviesArray});
        }
    }
    res.send({message: "Error. Could not find the movie"});
})

app.listen(8080)