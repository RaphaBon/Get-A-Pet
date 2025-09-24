const getToken = (req) => { //Como no token, vem a palavra Bearer antes do token, devemos tirar essa palavra e pegar apenas a String.

    const authHeader = req.headers.authorization    //Pegamos a o token com a palavra
    const token = authHeader.split(" ")[1]  //Método para, quando tiver um espaço " ", pegamos o 2° dado, que no caso é a String.

    return token
}

module.exports = getToken