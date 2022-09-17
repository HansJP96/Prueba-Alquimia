import { typeError } from "../../errors/TypeErrors"

export const isNotEmptyBody = (req, res) => {
    if (Object.keys(req.body).length === 0) {
        res.status(400).send(
            {
                error:
                    { messageError: "Cuerpo de peticion vacio", typeError: typeError.BAD_INPUT_DATA, systemError: null }
            }
        )
        return false
    }
    return true
}