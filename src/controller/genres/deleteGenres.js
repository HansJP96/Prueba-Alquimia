import { PrismaClient } from "@prisma/client"
import { responseError } from "../../utils/errors/ResponseError"

const prisma = new PrismaClient()

export const deleteOneGenre = async (req, res) => {

    const paramId = Number(req.params.id)

    try {
        await prisma.genero.delete({
            where: {
                id: paramId
            }
        })
    } catch (error) {
        return res.status(500).send(responseError(`Error eliminando genero con id=${paramId}`, error))
    }
    return res.status(200).send({Ok:`El genero con id=${paramId} ha sido eliminado`})
}