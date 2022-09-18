export const setDefaultImage = (req, field) => {
    if (req.body[field] === undefined || null) {
        req.body[field] = "https://whetstonefire.org/wp-content/uploads/2020/06/image-not-available.jpg"
    }
}
