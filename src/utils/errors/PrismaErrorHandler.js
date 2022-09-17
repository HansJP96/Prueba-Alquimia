import { Prisma } from "@prisma/client"
import { removeLineBreaks } from "../helpers/common/StringFormater"
import { typeError } from "./TypeErrors"

export const prismaErrorHandler = (error) => {
    const textError = JSON.stringify(error.message)

    if (error instanceof Prisma.PrismaClientValidationError) {
        const errorTotalLength = textError.length
        const lastBracketFormat = textError.lastIndexOf("}")

        if (textError.includes("Got invalid value")) {
            error.message = textError.match(/Argument [(a-z)(A-Z)_]+: Got invalid value/g)
        } else {
            error.message = textError
                .substring(lastBracketFormat + 5, errorTotalLength - 5)
                .split(/\\n\\n|\\n/)
        }

        error.typeError = typeError.PRISMA_VALIDATION

    } else if (error instanceof Prisma.PrismaClientInitializationError) {

        error.message = removeLineBreaks(error.message)
        error.typeError = typeError.PRISMA_CONNECTION

    } else if (error instanceof Prisma.PrismaClientKnownRequestError) {

        error.message = removeLineBreaks(error.message)
        error.typeError = typeError.PRISMA_DATABASE

    }
}