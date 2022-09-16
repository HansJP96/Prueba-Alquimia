import { checkDateLimits } from "../common/Dates"
import { isNotEmptyBody } from "../common/ReqBodyEmpty"
import { validations } from "../common/Validations"
import { checkQualification } from "./MoviesFieldChecker"

export const middleMoviesValidator = (req, res, next) => {
    if (validations(
        isNotEmptyBody.bind(null, req, res),
        checkQualification.bind(null, req, res),
        checkDateLimits.bind(null, req, res)
    )) {
        next()
    }
}