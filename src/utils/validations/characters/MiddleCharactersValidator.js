import { isNotEmptyBody } from "../common/ReqBodyEmpty"
import { validations } from "../common/Validations"

export const middleCharactersValidator = (req, res, next) => {
    if (validations(
        isNotEmptyBody.bind(null, req, res)
    )) {
        next()
    }
}