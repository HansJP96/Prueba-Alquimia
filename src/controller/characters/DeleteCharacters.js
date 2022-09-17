import { PrismaClient } from "@prisma/client"
import { responseError } from "../../utils/errors/ResponseError"

const prisma = new PrismaClient()

export const deleteOneCharacter = async (req, res) => {

    const paramId = parseInt(req.params.id)

    try {
        await prisma.personaje.delete({
            where: {
                id: paramId
            }
        })
    } catch (error) {
        return res.status(500).send(responseError(`Error eliminando personaje con id=${paramId}`, error))
    }
    return res.status(200).send(`El personaje con id=${paramId} ha sido eliminado`)
}