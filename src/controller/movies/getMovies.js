import { PrismaClient } from "@prisma/client"
import { responseError } from "../../utils/errors/ResponseError"
import { orderByAscDesc } from "../../utils/helpers/common/FilterConstants"

const prisma = new PrismaClient()

export const getMoviesList = async (req, res) => {
    let movies = null

    const title = req.query.title
    const genre = req.query.genre?.split(",").map((idGenre) => { return parseInt(idGenre) })
    const order = orderByAscDesc.includes(req.query.order) ? req.query.order : undefined
    
    try {
        movies = await prisma.pelicula.findMany({
            where: {
                titulo: {
                    contains: title
                },
                generos: {
                    some: {
                        genero: {
                            id: {
                                in: genre
                            }
                        }
                    }
                }
            },
            orderBy: {
                fecha_creacion: order
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
        return res.status(500).send(responseError("Error listando peliculas", error))
    }
    return res.status(200).send(movies)
}

export const getOneMovie = async (req, res) => {
    let movies = null

    const paramId = parseInt(req.params.id)

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