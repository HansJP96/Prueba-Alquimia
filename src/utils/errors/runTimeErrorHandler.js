import { typeError } from "./TypeErrors"

export const javascriptRuntimeErrorHandler = (error) => {

    if (error instanceof ReferenceError) {
        error.typeError = typeError.JAVASCRIPT_ERROR
    }
}