const User = require('../models/User')
const bcrypt = require('bcryptjs')

module.exports = class UserController {
    static login(req, res){
        res.render('auth/login')
    }

    static async loginPost(req, res){
        const {email, password} = req.body
    }

    static async registerPost(req, res){
        const { name, email, password, confirmpassword } = req.body

        if(password != confirmpassword){
            req.flash('message','As senhas não conferem, tente novamente!')
            res.render('auth/register')

            return
        }

        const checkIfUserExists = await User.findOne({where: {email:email}})

        if(checkIfUserExists){
            req.flash('message','O e-mail já está registrado')
            res.render('auth/register')

            return
        }
    }
}