import { typeError } from "./TypeErrors";

export const codeError = (error) => {

    switch (error.message) {
        case "Cod-001":
            error.typeError = typeError.AUTHENTICATION_ERROR
            error.message = "Cod-001 Password validation process has failed"
            break
        case "Cod-002":
            error.typeError = typeError.AUTHENTICATION_ERROR
            error.message = "Cod-002 An error has ocurred while token authentication was verified"
            break
        case "Cod-003":
            error.typeError = typeError.AUTHENTICATION_ERROR
            error.message = "Cod-003 Session time has expired"
            break;
        default:
            break
    }
}