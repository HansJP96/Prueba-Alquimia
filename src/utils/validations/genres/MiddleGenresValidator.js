import { isNotEmptyBody } from "../common/ReqBodyEmpty"
import { validations } from "../common/Validations"

export const middleGenresValidator = (req, res, next) => {
    if (validations(
        isNotEmptyBody.bind(null, req, res)
    )) {
        next()
    }
}