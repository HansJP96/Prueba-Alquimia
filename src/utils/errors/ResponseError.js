<<<<<<< HEAD:src/utils/errors/responseError.js
import { codeError } from "./codeErrors"
=======
import { codeError } from "./CodeErrors"
>>>>>>> 800b683194698e736c1c45cb24f9192b759c97ef:src/utils/errors/ResponseError.js
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