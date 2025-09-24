const express = require('express')
const cors = require('cors')   //As req tem como ponto inicial este arquivo.
const app = express()

//Config JSON response
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


//Solve CORS
app.use(cors({credentials: true, origin: 'http://localhost:3000'})) //Esse cors middleware serve para liberar o back para aceitar requisições do front,
                                                                    //  garantindo segurança (especificando a origem permitida) e funcionalidade 
                                                                    // (permitindo envio de cookies e headers de autenticação). (todo localhost:5000) vai 
                                                                    // conversar com o localhost:3000)

//Public folder for images
app.use(express.static('public'))

//Routes (nao precisamos da rota barra pois, com as APIs, podemos dizer que a barra la do front-end é alguma barra especifica aqui.
//Ex: localhost3000/ la no front aqui pode ser /users, basta linkar)
const UserRoutes = require('./routes/UserRoutes')
const PetRoutes = require('./routes/PetRoutes')

app.use('/users', UserRoutes)
app.use('/pets', PetRoutes)
 

app.listen(5000)    //Usamos a porta 5000, pois o front-end ja vai usar a porta 3000