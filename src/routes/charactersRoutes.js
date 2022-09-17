import express from "express";
import { createNewCharacter } from "../controller/characters/CreateCharacters";
import { deleteOneCharacter } from "../controller/characters/DeleteCharacters";
import { getCharacterList, getOneCharacter } from "../controller/characters/GetCharacters";
import { updateOneCharacter } from "../controller/characters/UpdateCharacters";
import { checkToken } from "../utils/validations/auth/MiddleAuthValidator";
import { middleCharactersValidator } from "../utils/validations/characters/MiddleCharactersValidator";

const characterRouter = express.Router()

characterRouter.get("/", getCharacterList)

characterRouter.get("/:id", getOneCharacter)

characterRouter.use(checkToken)

characterRouter.post("/", middleCharactersValidator, createNewCharacter)

characterRouter.put("/:id", middleCharactersValidator, updateOneCharacter)

characterRouter.delete("/:id", deleteOneCharacter)

export default characterRouter