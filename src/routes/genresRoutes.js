import express from "express";
import { createNewGenre } from "../controller/genres/CreateGenres";
import { deleteOneGenre } from "../controller/genres/DeleteGenres";
import { getGenreList, getOneGenre } from "../controller/genres/GetGenres";
import { updateOneGenre } from "../controller/genres/UpdateGenres";
import { middleGenresValidator } from "../utils/validations/genres/MiddleGenresValidator";

const genreRouter = express.Router()

genreRouter.get("/", getGenreList)

genreRouter.get("/:id", getOneGenre)

genreRouter.post("/", middleGenresValidator, createNewGenre)

genreRouter.put("/:id", middleGenresValidator, updateOneGenre)

genreRouter.delete("/:id", deleteOneGenre)

export default genreRouter