import { codeError } from "./codeErrors"
import { prismaErrorHandler } from "./PrismaErrorHandler"
import { javascriptRuntimeErrorHandler } from "./RunTimeErrorHandler"
import { typeError } from "./TypeErrors"


export const responseError = (message, error) => {
    
    prismaErrorHandler(error)
    javascriptRuntimeErrorHandler(error)
    codeError(error)
    
    if (!error.typeError) {
        error.typeError = typeError.UNIDENTIFIED
    }

    return {
        error:
            { messageError: message, typeError: error.typeError, systemError: error?.message }
    }
}