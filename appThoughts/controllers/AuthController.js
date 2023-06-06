const User = require('../models/User')
const bcrypt = require('bcryptjs')

module.exports = class UserController {
    static login(req, res){
        res.render('auth/login')
    }

    static async loginPost(req, res){
        const {email, password} = req.body

        const user = await User.findOne({ where: {email: email}})

        if(!user){
            res.render('auth/login',{
                message: 'Usuário não encontrado'
            })

            return
        }

        const passwordMatch = bcrypt.compareSync(password, user.password)

        if(!passwordMatch){
            res.render('auth/login',{
                message: 'Senha inválida'
            })

            return
        }

        req.session.userid = user.id
        req.flash('message', 'Login realizado com sucesso')

        req.session.save(() => {
            res.redirect('/')
        })
    }

    static async register(req, res){
        res.render('auth/register')
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
        // Volume de bits enbaralhados e técnica de criptografia
        const salt = bcrypt.genSaltSync(10)
        // Embaralha baseado na linha anterior
        const hashedPassword = bcrypt.hashSync(password, salt)

        const user = {
            name,
            email,
            password: hashedPassword
        }

        User.create(user)
        .then((user) =>{
            req.session.userid = userid
            req.flash('message','Cadastro executado com sucesso!')
            req.session.save(()=>{
                res.redirect('/')
            })
        })
        .catch((err) => console.error(err))
    }

    static logout(req, res){
        req.session.destroy()
        res.redirect('/login')
    }
}