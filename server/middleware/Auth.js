const jwt = require('jsonwebtoken');
require("dotenv").config()

const isAuth = (req, res, next) => {
  const { verificationToken } = req.cookies
  if (!verificationToken) {
    return res.status(401).json({ message: 'Login Again' })
  }

  jwt.verify(verificationToken, process.env.privatekey, function (err, decoded) {
    if (err) {
      return res.status(400).send({ message: err })
    }
    // console.log(decoded.userdata)
    req.user = decoded.userdata
    next()
  });
}

module.exports = isAuth