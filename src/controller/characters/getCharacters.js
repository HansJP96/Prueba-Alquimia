import { PrismaClient } from "@prisma/client"
import { responseError } from "../../utils/errors/responseError"

const prisma = new PrismaClient()

export const getCharacterList = async (req, res) => {
    let characters = null

    try {
        characters = await prisma.personaje.findMany({
            include: {
                peliculas: {
                    select: {
                        pelicula: true
                    }
                }
            }
        })
    } catch (error) {
        return res.status(500).send(responseError("Error listando personajes", error))
    }
    return res.status(200).send(characters)
}

export const getOneCharacter = async (req, res) => {
    let character = null

    const paramId = Number(req.params.id)

    try {
        character = await prisma.personaje.findUnique({
            where: {
                id: paramId
            },
            include: {
                peliculas: {
                    select: {
                        pelicula: true
                    }
                }
            }
        })
    } catch (error) {
        return res.status(500).send(responseError(`Error obteniendo personaje con id=${paramId}`, error))
    }
    return res.status(200).send(character)
}
