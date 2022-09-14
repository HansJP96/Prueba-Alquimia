import { PrismaClient } from "@prisma/client"
import { responseError } from "../../utils/errors/responseError"
import { setDefaultImage } from "../../utils/helpers/common/imageSetter"

const prisma = new PrismaClient()

export const createNewGenre = async (req, res) => {
    let newGenre = null

    //setDefaultImage(req, "imagen")
    try {
        newGenre = await prisma.genero.create({
            data: {
                ...req.body
            }
        })
    } catch (error) {
        return res.status(400).send(responseError("Error creando genero",error))
    }
    return res.status(201).send(newGenre)
}