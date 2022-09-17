export const validateEmail = (email, res) => {

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

export const checkPasswordLength = (password, res) => {

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