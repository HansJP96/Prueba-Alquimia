import express from "express";
import { createNewCharacter } from "../controller/characters/createCharacters";
import { deleteOneCharacter } from "../controller/characters/deleteCharacters";
import { getCharacterList, getOneCharacter } from "../controller/characters/getCharacters";
import { updateOneCharacter } from "../controller/characters/updateCharacters";
import { middleCharactersValidator } from "../utils/validations/characters/middleCharactersValidator";

const characterRouter = express.Router()

characterRouter.get("/", getCharacterList)

characterRouter.get("/:id", getOneCharacter)

characterRouter.post("/", middleCharactersValidator, createNewCharacter)

characterRouter.put("/:id", middleCharactersValidator, updateOneCharacter)

characterRouter.delete("/:id", deleteOneCharacter)

export default characterRouter