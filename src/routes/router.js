import express from "express";
import authRouter from "./authRoutes";
import characterRouter from "./charactersRoutes";
import genreRouter from "./genresRoutes";
import moviesRouter from "./moviesRoutes";

const router = express.Router()

router.use("/auth", authRouter)
router.use("/characters", characterRouter)
router.use("/movies", moviesRouter)
router.use("/genres", genreRouter)

export default router