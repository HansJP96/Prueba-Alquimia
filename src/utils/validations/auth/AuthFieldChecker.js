<<<<<<< HEAD
export const validateEmail = (req, res) => {

    const email = req.body.email
=======
export const validateEmail = (email, res) => {
>>>>>>> 800b683194698e736c1c45cb24f9192b759c97ef

    const result = String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )

    if (!result) {
        res.status(400).send(
            {
                error:
                    { messageError: "El email no contiene un formato valido", typeError: typeError.BAD_INPUT_DATA, systemError: null }
            }
        )
        return false
    }

    return true
}

<<<<<<< HEAD
export const checkPasswordLength = (req, res) => {
    const password = req.body.contrasena
=======
export const checkPasswordLength = (password, res) => {
>>>>>>> 800b683194698e736c1c45cb24f9192b759c97ef

    if (password.length < 4 || password.length > 30) {
        res.status(400).send(
            {
                error:
                    { messageError: "La contraseña debe contener entre 4 y 30 caracteres", typeError: typeError.BAD_INPUT_DATA, systemError: null }
            }
        )
        return false
    }
    
    return true
}