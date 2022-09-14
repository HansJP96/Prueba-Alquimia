import express from "express";
import { createNewMovie } from "../controller/movies/createMovies";
import { deleteOneMovie } from "../controller/movies/deleteMovies";
import { getMoviesList, getOneMovie } from "../controller/movies/getMovies";
import { updateOneMovie } from "../controller/movies/updateMovies";
import { middleMoviesValidator } from "../utils/validations/movies/middleMoviesValidator";

const moviesRouter = express.Router()

moviesRouter.get("/", getMoviesList)

moviesRouter.get("/:id", getOneMovie)

moviesRouter.post("/", middleMoviesValidator, createNewMovie)

moviesRouter.put("/:id", middleMoviesValidator, updateOneMovie)

moviesRouter.delete("/:id", deleteOneMovie)

export default moviesRouter