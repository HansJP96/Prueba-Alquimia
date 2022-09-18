import { PrismaClient } from "@prisma/client"
import { createConnectFormat, deleteRelationFormat } from "../../utils/helpers/common/ConnectSchema"
import { responseError } from "../../utils/errors/ResponseError"

const prisma = new PrismaClient()

export const updateOneCharacter = async (req, res) => {
    let characterUpdated = null

    const paramId = parseInt(req.params.id)
    const movies = req.body.peliculas

    try {
        characterUpdated = await prisma.personaje.update({
            where: {
                id: paramId
            },
            data: {
                ...req.body,
                peliculas: {
                    create: createConnectFormat(movies?.conectar, "pelicula", "id"),
                    deleteMany: deleteRelationFormat(movies?.desconectar, "idPelicula", { idPersonaje: paramId })
                }
            }
        }
        )
    } catch (error) {
        return res.status(500).send(responseError(`Error actualizando personaje con id=${paramId}`,error))
           
    }
    return res.status(204).send()
}
