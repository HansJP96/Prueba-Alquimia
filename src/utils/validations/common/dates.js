import { typeError } from "../../errors/TypeErrors"
import { stringToNumberDateValues } from "../../helpers/common/DateConverter"

export const checkDateLimits = (createdDate, res) => {
    let result = false

    const { year, month, day } = stringToNumberDateValues(createdDate)

    if (month > 11 || month < 0) {
        res.status(400).send(
            {
                error:
                    { messageError: "Ha ocurrido en error al introducir el mes", typeError: typeError.BAD_INPUT_DATA, systemError: null }
            }
        )
        return result
    }

    if (day > new Date(year, month, 0).getDate()) {
        res.status(400).send(
            {
                error:
                    { messageError: "Ha ocurrido en error al introducir el dia", typeError: typeError.BAD_INPUT_DATA, systemError: null }
            }
        )
        return result
    }

    result = true
    return result
}
