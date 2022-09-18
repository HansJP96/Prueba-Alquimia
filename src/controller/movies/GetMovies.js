import { PrismaClient } from "@prisma/client"
import { responseError } from "../../utils/errors/ResponseError"
import { orderByAscDesc } from "../../utils/helpers/common/FilterConstants"

const prisma = new PrismaClient()

export const getMoviesList = async (req, res) => {
    let movies = null

    const title = req.query.title
<<<<<<< HEAD:src/controller/movies/getMovies.js
    const genre = req.query.genre?.split(",").map((idGenre) => { return Number(idGenre) })
=======
    const genre = req.query.genre?.split(",").map((idGenre) => { return parseInt(idGenre) })
>>>>>>> 800b683194698e736c1c45cb24f9192b759c97ef:src/controller/movies/GetMovies.js
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