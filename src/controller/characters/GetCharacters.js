import { PrismaClient } from "@prisma/client"
import { responseError } from "../../utils/errors/ResponseError"

const prisma = new PrismaClient()

export const getCharacterList = async (req, res) => {
    let characters = null

    const name = req.query.name
    const age = parseInt(req.query.age) || undefined
    const movies = req.query.movies?.split(",").map((idMovie) => { return parseInt(idMovie) })

    try {
        characters = await prisma.personaje.findMany({
            where: {
                nombre: {
                    contains: name
                },
                edad: {
                    equals: age
                },
                peliculas: {
                    some: {
                        pelicula: {
                            id: {
                                in: movies
                            }
                        }
                    }
                }
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
        return res.status(500).send(responseError("Error listando personajes", error))
    }
    return res.status(200).send(characters)
}

export const getOneCharacter = async (req, res) => {
    let character = null

    const paramId = parseInt(req.params.id)

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
