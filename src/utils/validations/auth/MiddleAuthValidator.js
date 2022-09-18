<<<<<<< HEAD
=======
import { responseError } from "../../errors/ResponseError"
import { typeError } from "../../errors/TypeErrors"
import { validateToken } from "../../helpers/auth/AuthFunctions"
>>>>>>> 800b683194698e736c1c45cb24f9192b759c97ef
import { isNotEmptyBody } from "../common/ReqBodyEmpty"
import { validations } from "../common/Validations"
import { checkPasswordLength, validateEmail } from "./AuthFieldChecker"

export const middleAuthValidator = (req, res, next) => {
<<<<<<< HEAD
    
    if (validations(
        isNotEmptyBody.bind(null, req, res),
        validateEmail.bind(null, req, res),
        checkPasswordLength.bind(null, req, res)
    )) {
        next()
    }
=======

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
>>>>>>> 800b683194698e736c1c45cb24f9192b759c97ef
}