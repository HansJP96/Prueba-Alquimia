import { AES, enc } from "crypto-js"
import { randomBytes } from "crypto"
import jwt from "jsonwebtoken"

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
    const realToken = token.split(" ")[1]

    try {
        return jwt.verify(realToken, process.env.TOKEN_KEY)
    } catch (error) {
        console.log(error)
    }
}