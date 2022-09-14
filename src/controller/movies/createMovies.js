import { PrismaClient } from "@prisma/client"
import { responseError } from "../../utils/errors/responseError"
import { createConnectFormat } from "../../utils/helpers/common/connectSchema"
import { dateDataConverter } from "../../utils/helpers/common/dateConverter"

const prisma = new PrismaClient()

export const createNewMovie = async (req, res) => {
    let newMovie = null

    const date = req.body.fecha_creacion
    const genres = req.body.generos
    
    try {
        newMovie = await prisma.pelicula.create({
            data: {
                ...req.body,
                fecha_creacion: dateDataConverter(date),
                generos: {
                    create: createConnectFormat(genres, "genero", "id")
                }
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
        return res.status(400).send(responseError("Error creando pelicula",error))
    }
    return res.status(201).send(newMovie)
}