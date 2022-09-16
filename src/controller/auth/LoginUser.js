import { PrismaClient } from "@prisma/client"
import { responseError } from "../../utils/errors/ResponseError"
import { decrypter, generateToken } from "../../utils/helpers/auth/AuthFunctions"

const prisma = new PrismaClient()

export const logInUser = async (req, res) => {
    let getUser = null

    const email = req.body.email
    const password = req.body.contrasena

    try {
        getUser = await prisma.$transaction(async (table) => {
            const passwordItems = await table.usuario.findUnique({
                where: {
                    email: email
                },
                select: {
                    contrasena: true,
                    salt_usuario: true
                }
            })

            const decodedPassword = decrypter(passwordItems.contrasena, passwordItems.salt_usuario)

            if (password !== decodedPassword) {
                throw new Error("Cod-001")
            }

            const userData = await prisma.usuario.findUnique({
                where: {
                    email: email
                },
                select: {
                    email: true,
                    primer_nombre: true,
                    primer_apellido: true
                }
            })

            return userData
        })
    } catch (error) {
        return res.status(401).send(responseError("Error validando credenciales de usuario", error))
    }

    const genToken = await generateToken(getUser)

    return res.status(201).send({ token: genToken })
}