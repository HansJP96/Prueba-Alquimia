import { PrismaClient } from "@prisma/client"
import { createConnectFormat, deleteRelationFormat } from "../../utils/helpers/common/connectSchema"
import { responseError } from "../../utils/errors/responseError"

const prisma = new PrismaClient()

export const updateOneMovie = async (req, res) => {
    let movieUpdated = null

    const paramId = Number(req.params.id)

    const date = req.body.fecha_creacion
    const characters = req.body.personajes
    const genres = req.body.generos
 
    try {
        movieUpdated = await prisma.pelicula.update({
            where: {
                id: paramId
            },
            data: {
                ...req.body,
                fecha_creacion: dateDataConverter(date),
                generos:{
                    create: createConnectFormat(genres?.conectar, "genero", "id"),
                    deleteMany: deleteRelationFormat(genres?.desconectar, "idGenero", { idPelicula: paramId })
                },
                personajes:{
                    create: createConnectFormat(characters?.conectar, "personaje", "id"),
                    deleteMany: deleteRelationFormat(characters?.desconectar, "idPersonaje", { idPelicula: paramId })
                }
            }
        }
        )
    } catch (error) {
        return res.status(500).send(responseError(`Error actualizando la pelicula con id=${paramId}`,error))
    }
    return res.status(204).send()
}
