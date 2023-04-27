const express = require('express')
const app = express()
const port = 3000
const path = require('path')

const basePath = path.join(__dirname,'templates')

app.use(
    //encodar abrir pacote URL
    express.urlencoded({
        extended: true,
    })
)
app.use(express.json())

app.get('/', (req, res)=>{
    res.sendFile(`${basePath}/index.html`)
})

app.get('/users/add', (req, res) => {
    res.sendFile(`${basePath}/userForm.html`)
})

app.get('/list/open', (req, res)=>{
    res.sendFile(`${basePath}/listForm.html`)
})

app.post('/list/resolve', (req, res) => {
    let numero1 = req.body.numero1
    let numero2 = req.body.numero2
    if((numero1+numero2) % 2 == 0){
        res.sendFile(`${basePath}/userForm.html`)
    }else{
        res.sendFile(`${basePath}/index.html`)
    }
})

app.post('/users/save', (req, res) =>{
    let name = req.body.name
    let age = req.body.age

    console.log(`Nome do Usuario: ${name}, Idade: ${age}`)
    res.sendFile(`${basePath}/index.html`)
})

app.listen(port, () => {
    console.log(`Servidor Rodando na porta: ${port}`)
})