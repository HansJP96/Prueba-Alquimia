import { typeError } from "./TypeErrors";

export const codeError = (error) => {

    switch (error.message) {
        case "Cod-001":
            error.typeError = typeError.AUTHENTICATION_ERROR
            error.message = "Cod-001 Password validation process has failed"
            break;

        default:
            break;
    }
}