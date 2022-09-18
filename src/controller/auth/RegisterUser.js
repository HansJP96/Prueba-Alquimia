import { PrismaClient } from "@prisma/client"
import { responseError } from "../../utils/errors/ResponseError"
import { encrypter, generateToken, saltStructure } from "../../utils/helpers/auth/AuthFunctions"
import { sendEmail } from "../../utils/helpers/auth/EmailSender"

const prisma = new PrismaClient()

export const registerNewUser = async (req, res) => {
    let newUser = null

    const email = req.body.email
    const password = req.body.contrasena
    const salt = saltStructure()

    try {
        newUser = await prisma.usuario.create({
            data: {
                ...req.body,
                email: email,
                contrasena: encrypter(password, salt),
                salt_usuario: salt
            },
            select: {
                email: true,
                primer_nombre: true,
                primer_apellido: true
            }
        })
    } catch (error) {
        return res.status(500).send(responseError("Error al registrar al usuario", error))
    }

    const genToken = await generateToken(newUser)

    return sendEmail(newUser, genToken, res)
}