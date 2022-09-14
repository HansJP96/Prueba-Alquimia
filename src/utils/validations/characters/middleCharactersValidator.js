import { isNotEmptyBody } from "../common/reqBodyEmpty"
import { validations } from "../common/validations"

export const middleCharactersValidator = (req, res, next) => {
    if (validations(
        isNotEmptyBody.bind(null, req, res)
    )) {
        next()
    }
}