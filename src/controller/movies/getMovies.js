import { PrismaClient } from "@prisma/client"
import { responseError } from "../../utils/errors/responseError"

const prisma = new PrismaClient()

export const getMoviesList = async (req, res) => {
    let movies = null

    try {
        movies = await prisma.pelicula.findMany({
            include: {
                generos: {
                    select: {
                        genero: true
                    }
                },
                personajes: {
                    select: {
                        personaje: true
                    }
                }
            }
        })
    } catch (error) {
        return res.status(500).send(responseError("Error listando peliculas", error))
    }
    return res.status(200).send(movies)
}

export const getOneMovie = async (req, res) => {
    let movies = null

    const paramId = Number(req.params.id)

    try {
        movies = await prisma.pelicula.findUnique({
            where: {
                id: paramId
            },
            include: {
                generos: {
                    select: {
                        genero: true
                    }
                },
                personajes: {
                    select: {
                        personaje: true
                    }
                }
            }
        })
    } catch (error) {
        return res.status(500).send(responseError(`Error obteniendo pelicula con id=${paramId}`, error))
    }
    return res.status(200).send(movies)
}