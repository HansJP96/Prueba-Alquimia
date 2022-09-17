import { PrismaClient } from "@prisma/client"
import { responseError } from "../../utils/errors/ResponseError"

const prisma = new PrismaClient()

export const getGenreList = async (req, res) => {
    let genres = null

    try {
        genres = await prisma.genero.findMany({
            include: {
                peliculas: {
                    select: {
                        pelicula: {
                            select: {
                                id: true,
                                titulo: true
                            }
                        }
                    }
                }
            }
        })
    } catch (error) {
        return res.status(500).send(responseError("Error listando generos",error))
    }
    return res.status(200).send(genres)
}

export const getOneGenre = async (req, res) => {
    let genre = null

    const paramId = parseInt(req.params.id)

    try {
        genre = await prisma.genero.findUnique({
            where:{
                id: paramId
            },
            include: {
                peliculas: {
                    select: {
                        pelicula: {
                            select: {
                                id: true,
                                titulo: true
                            }
                        }
                    }
                }
            }
        })
    } catch (error) {
        return res.status(500).send(responseError(`Error obteniendo genero con id=${paramId}`,error))
    }
    return res.status(200).send(genre)
}