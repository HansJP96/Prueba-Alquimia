import { PrismaClient } from "@prisma/client"
import { responseError } from "../../utils/errors/ResponseError"

const prisma = new PrismaClient()

export const updateOneGenre = async (req, res) => {
    let genreUpdated = null

    const paramId = parseInt(req.params.id)

    try {
        genreUpdated = await prisma.genero.update({
            where: {
                id: paramId
            },
            data: {
                ...req.body,
            }
        }
        )
    } catch (error) {
        return res.status(500).send(responseError(`Error actualizando el genero con id=${paramId}`,error))
    }
    return res.status(204).send()
}