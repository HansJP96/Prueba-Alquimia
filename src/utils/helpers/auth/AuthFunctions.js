import { AES, enc } from "crypto-js"
import { randomBytes } from "crypto"
<<<<<<< HEAD
import jwt from "jsonwebtoken"
=======
import jwt, { TokenExpiredError } from "jsonwebtoken"
>>>>>>> 800b683194698e736c1c45cb24f9192b759c97ef

export const encrypter = (text, key) => {
    return AES.encrypt(text, key).toString()
}

export const decrypter = (text, key) => {
    return AES.decrypt(text, key).toString(enc.Utf8)
}

export const saltStructure = () => {
    return randomBytes(20).toString("hex")
}

export const generateToken = async (userData) => {
    const completeToken = "Bearer " + jwt.sign(userData, process.env.TOKEN_KEY, { algorithm: "HS256", expiresIn: '1h' })
    return completeToken
}

export const validateToken = async (token) => {
<<<<<<< HEAD
    const realToken = token.split(" ")[1]
=======
    const realToken = token?.split(" ")[1]
>>>>>>> 800b683194698e736c1c45cb24f9192b759c97ef

    try {
        return jwt.verify(realToken, process.env.TOKEN_KEY)
    } catch (error) {
<<<<<<< HEAD
        console.log(error)
=======
        if (error instanceof TokenExpiredError) {
            throw new Error("Cod-003")
        }
        throw new Error("Cod-002")
>>>>>>> 800b683194698e736c1c45cb24f9192b759c97ef
    }
}