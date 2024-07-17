const express=require('express')
const router=express.Router()
const {
    registerUser,
    loginUser,
    currentUser
}=require('../controllers/userController')
const validatToken = require('../middleware/validateTokenHandler')

router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.get('/current',validatToken,currentUser)

module.exports=router