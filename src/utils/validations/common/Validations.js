export const validations = (...listFunction) => {

    let result = true

    for (let i = 0; i < listFunction.length; i++) {
        if (!listFunction[i]()){
            result = false
            break
        }
    }

    return result
}