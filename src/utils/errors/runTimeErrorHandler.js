import { typeError } from "./typeErrors"

export const javascriptRuntimeErrorHandler = (error) => {

    if (error instanceof ReferenceError) {
        error.typeError = typeError.JAVASCRIPT_ERROR
    }
}