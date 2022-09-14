import { checkDateLimits } from "../common/dates"
import { isNotEmptyBody } from "../common/reqBodyEmpty"
import { validations } from "../common/validations"
import { checkQualification } from "./attributeChecker"

export const middleMoviesValidator = (req, res, next) => {
    if (validations(
        isNotEmptyBody.bind(null, req, res),
        checkQualification.bind(null, req, res),
        checkDateLimits.bind(null, req, res)
    )) {
        next()
    }
}