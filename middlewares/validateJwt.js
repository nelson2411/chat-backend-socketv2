const jwt = require("jsonwebtoken")

const validateJwt = (req, res, next) => {
  try {
    const token = req.header("x-token")
    if (!token) {
      return res.status(401).json({
        ok: false,
        msg: "Token is required",
      })
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET)
    req.uid = payload.uid

    next()
  } catch (error) {
    console.log(error)
    return res.status(401).json({
      ok: false,
      msg: "Please contact the administrator 💀",
    })
  }
}

module.exports = {
  validateJwt,
}
