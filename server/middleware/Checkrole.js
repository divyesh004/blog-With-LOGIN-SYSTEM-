const isAdmin = (req, res, next) => {
    if (req.user.role != "admin") {
        return res.status(400).send({ message: "You have not permissio to get notes" })
    }
    next()
}

module.exports = isAdmin