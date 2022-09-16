import { typeError } from "../../errors/TypeErrors"

export const checkQualification = (req, res) => {

    if (req.body.calificacion < 1 || req.body.calificacion > 5) {
        res.status(400).send(
            {
                error:
                    { messageError: "Calificacion de pelicula por fuera de limites (1-5)", typeError: typeError.BAD_INPUT_DATA, systemError: null }
            }
        )
        return false
    }
    return true
}