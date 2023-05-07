const express =require('express')
const { Regitser, Login } = require('../controller/AuthCon')

const router =express.Router()

router.post("/register",Regitser )
router.post("/login",Login )

module.exports = router