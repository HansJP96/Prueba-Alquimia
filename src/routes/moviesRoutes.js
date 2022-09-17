import express from "express";
import { createNewMovie } from "../controller/movies/CreateMovies";
import { deleteOneMovie } from "../controller/movies/DeleteMovies";
import { getMoviesList, getOneMovie } from "../controller/movies/GetMovies";
import { updateOneMovie } from "../controller/movies/UpdateMovies";
import { checkToken } from "../utils/validations/auth/MiddleAuthValidator";
import { middleMoviesValidator } from "../utils/validations/movies/MiddleMoviesValidator";

const moviesRouter = express.Router()

moviesRouter.get("/", getMoviesList)

moviesRouter.get("/:id", getOneMovie)

moviesRouter.use(checkToken)

moviesRouter.post("/", middleMoviesValidator, createNewMovie)

moviesRouter.put("/:id", middleMoviesValidator, updateOneMovie)

moviesRouter.delete("/:id", deleteOneMovie)

export default moviesRouter