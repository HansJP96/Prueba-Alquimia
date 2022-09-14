export const stringToNumberDateValues = (dateValue) => {
    const date = dateValue?.split(/-|\//)
    const year = date && Number(date[0])
    const month = date && Number(date[1]) - 1
    const day = date && Number(date[2])

    return { year: year, month: month, day: day }
}

export const dateDataConverter = (dateValue) => {
    const { year, month, day } = stringToNumberDateValues(dateValue)
    return year ? new Date(year, month, day) : undefined
}
