import { responseError } from "../../errors/ResponseError"
import { typeError } from "../../errors/TypeErrors"
import { validateToken } from "../../helpers/auth/AuthFunctions"
import { isNotEmptyBody } from "../common/ReqBodyEmpty"
import { validations } from "../common/Validations"
import { checkPasswordLength, validateEmail } from "./AuthFieldChecker"

export const middleAuthValidator = (req, res, next) => {

    if (validations(
        isNotEmptyBody.bind(null, req, res),
        validateEmail.bind(null, req.body.email, res),
        checkPasswordLength.bind(null, req.body.contrasena, res)
    )) {
        next()
    }
}

export const checkToken = async (req, res, next) => {
    if (!req.headers.authorization) {
        res.status(401).send(
            {
                error:
                    { messageError: "No tiene los permisos necesarios para esta accion", typeError: typeError.AUTHENTICATION_ERROR, systemError: null }
            }
        )
        return
    }

    try {
        const userData = await validateToken(req.headers.authorization)

        if (userData?.email) next()

    } catch (error) {
        res.status(401).send(responseError("Credenciales no validas", error))
    }
}