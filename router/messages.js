/*
Path: api/messages
*/
const { Router } = require("express")
const { validateJwt } = require("../middlewares/validateJwt")
const { getMessages } = require("../controllers/messages")

const router = Router()

router.get("/:from", validateJwt, getMessages)

module.exports = router
