//Criamos aqui na pasta helpers pois vamos usar tanto para registro quanto para login, onde a nomenclatura é a função 
//token é para, ao passar um login e senha, dar uma resposta de autenticado ou não, ou seja, dar uma autorização de algo ou não.

//Após a autenticação do usuario com email/senha, o token é enviado na resposta da req de login, onde extraimos essa resposta e salvamos em algum lugar
//para que, sempre que abrimos, estaremos logado. Onde o token é sempre enviado em todas as requisições.

const jwt = require("jsonwebtoken")
const User = require("../models/User")

const createUserToken = async(user, req, res) => {
    
    const token = jwt.sign({    //No middleware token usamos o método sign, onde nela temos que passar o que vai ser enviado junto ao token
        
        name: user.name,
        id: user._id

    },  "nossosecret" )    //"Secret", para deixar o token único, ou seja, apenas nessa aplicação.

    // return token
    res.status(200).json({  //Resposta que vai poder ser lida no front
        message: "Voce está autenticado",
        token: token,
        userId: user._id,
    })

}

module.exports = createUserToken