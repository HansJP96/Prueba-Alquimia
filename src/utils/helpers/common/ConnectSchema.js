export const createConnectFormat = (keyList, relationField, keyName) => {
    if (keyList === undefined || null) return undefined

    if (!Array.isArray(keyList))
        throw new Error(`La propieadad de [${relationField}] debe ser un arreglo de uno o varios enteros`)

    let format = keyList.map((element) => {
        return {
            [relationField]: {
                connect: { [keyName]: element }
            }
        }
    })

    return format
}


export const deleteRelationFormat = (keyIdList, relationField, ownIdObject) => {

    if (keyIdList === undefined || null) return undefined

    if (!Array.isArray(keyIdList))
        throw new Error(`La propieadad de [${relationField}] debe ser un arreglo de uno o varios enteros`)

    let format = keyIdList.map((element) => {
        return {
            [relationField]: element,
            ...ownIdObject
        }
    })

    return format
}
