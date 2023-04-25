const express = require('express')
const app = express()
const port = 3000
const path = require('path')

const basePath = path.join(__dirname,'templates')

var checkAuth = function(req, res, next){
    req.authStatus = true
    if(req.authStatus){
        console.log('Está Logado pode continuar!')
        next()
    }else{
        console.log('Não esta logado, faça login para continuar!')
    }
}

app.use(checkAuth)

app.get('/', (req, res)=>{
    res.sendFile(`${basePath}/index.html`)
})

app.get('/user/:id', (req, res)=>{
    let emailUser = req.params.id + "@gmail.com"
    console.log(`Parametro de usuario: ${emailUser}`)
    res.sendFile(`${basePath}/user.html`)
})

app.listen(port, () => {
    console.log(`Servidor Rodando na porta: ${port}`)
})