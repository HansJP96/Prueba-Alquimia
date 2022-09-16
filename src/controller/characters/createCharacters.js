import { PrismaClient } from "@prisma/client"
import { createConnectFormat } from "../../utils/helpers/common/ConnectSchema"
import { responseError } from "../../utils/errors/ResponseError"

const prisma = new PrismaClient()

export const createNewCharacter = async (req, res) => {
    let newCharacter = null

    const movies = req.body.peliculas

    try {
        newCharacter = await prisma.personaje.create({
            data: {
                ...req.body,
                peliculas: {
                    create: createConnectFormat(movies, "pelicula", "id")
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
        return res.status(400).send(responseError("Error creando personaje",error))
    }
    return res.status(201).send(newCharacter)
}