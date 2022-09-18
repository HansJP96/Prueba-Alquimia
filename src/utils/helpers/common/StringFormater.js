export const removeLineBreaks = (text) => {
    return text.replace(/[\r\n]/gm, ' ').trim().replace(/[\r\s]+/g," ");
}