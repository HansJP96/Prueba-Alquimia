import { Prisma } from "@prisma/client"
import { removeLineBreaks } from "../helpers/common/stringFormater"
import { typeError } from "./typeErrors"

export const prismaErrorHandler = (error) => {

    if (error instanceof Prisma.PrismaClientValidationError) {
        const errorTotalLength = JSON.stringify(error.message).length
        const lastBracketFormat = JSON.stringify(error.message).lastIndexOf("}")

        error.message = JSON.stringify(error.message)
            .substring(lastBracketFormat + 5, errorTotalLength - 5)
            .split(/\\n\\n|\\n/)

        error.typeError = typeError.PRISMA_VALIDATION

    } else if (error instanceof Prisma.PrismaClientInitializationError) {

        error.message = removeLineBreaks(error.message)
        error.typeError = typeError.PRISMA_CONNECTION

    } else if (error instanceof Prisma.PrismaClientKnownRequestError){

        error.message = removeLineBreaks(error.message)
        error.typeError = typeError.PRISMA_DATABASE

    }
}