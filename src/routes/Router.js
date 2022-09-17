import express from "express";
import authRouter from "./AuthRoutes";
import characterRouter from "./CharactersRoutes";
import genreRouter from "./GenresRoutes";
import moviesRouter from "./MoviesRoutes";

const router = express.Router()

router.use("/auth", authRouter)
router.use("/characters", characterRouter)
router.use("/movies", moviesRouter)
router.use("/genres", genreRouter)

export default router