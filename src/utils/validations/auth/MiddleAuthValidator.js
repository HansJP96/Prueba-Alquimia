import { isNotEmptyBody } from "../common/ReqBodyEmpty"
import { validations } from "../common/Validations"
import { checkPasswordLength, validateEmail } from "./AuthFieldChecker"

export const middleAuthValidator = (req, res, next) => {
    
    if (validations(
        isNotEmptyBody.bind(null, req, res),
        validateEmail.bind(null, req, res),
        checkPasswordLength.bind(null, req, res)
    )) {
        next()
    }
}