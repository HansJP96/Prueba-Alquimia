import { prismaErrorHandler } from "./prismaErrorHandler"
import { javascriptRuntimeErrorHandler } from "./runTimeErrorHandler"
import { typeError } from "./typeErrors"


export const responseError = (message, error) => {
    
    prismaErrorHandler(error)
    javascriptRuntimeErrorHandler(error)

    if (!error.typeError) {
        error.typeError = typeError.UNIDENTIFIED
    }

    return {
        error:
            { messageError: message, typeError: error.typeError, systemError: error?.message }
    }
}