import express from "express";
import { createNewGenre } from "../controller/genres/createGenres";
import { deleteOneGenre } from "../controller/genres/deleteGenres";
import { getGenreList, getOneGenre } from "../controller/genres/getGenres";
import { updateOneGenre } from "../controller/genres/updateGenres";
import { middleGenresValidator } from "../utils/validations/genres/middleGenresValidator";

const genreRouter = express.Router()

genreRouter.get("/", getGenreList)

genreRouter.get("/:id", getOneGenre)

genreRouter.post("/", middleGenresValidator, createNewGenre)

genreRouter.put("/:id", middleGenresValidator, updateOneGenre)

genreRouter.delete("/:id", deleteOneGenre)

export default genreRouter