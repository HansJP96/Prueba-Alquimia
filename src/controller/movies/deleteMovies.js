import { PrismaClient } from "@prisma/client"
import { responseError } from "../../utils/errors/ResponseError"

const prisma = new PrismaClient()

export const deleteOneMovie = async (req, res) => {

    const paramId = Number(req.params.id)

    try {
        await prisma.pelicula.delete({
            where: {
                id: paramId
            }
        })
    } catch (error) {
        return res.status(500).send(responseError(`Error eliminando pelicula con id=${paramId}`, error))
    }
    return res.status(200).send({ Ok: `La pelicula con id=${paramId} ha sido eliminada` })
}