import { typeError } from "../../errors/TypeErrors"

export const checkQualification = (qualifcation, res) => {

    if (qualifcation < 1 || qualifcation > 5) {
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