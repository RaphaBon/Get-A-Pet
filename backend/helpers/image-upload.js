const multer = require('multer') //Modulo para imagens
const path = require('path')

// Destination to store the images
const imageStorage = multer.diskStorage({   //Método do multer para salvar as imagens em um arquivo
    destination: function(req, file, cb) {

        let folder = ''

        if(req.baseUrl.includes("users")){      //Já que teremos imagens tanto para os pets, quanto para os usuários, devemos separar o local de salvar.
            folder = "users"
        } else if(req.baseUrl.includes("pets"))
        {
            folder = "pets"
        }

        cb(null, `public/images/${folder}`)    //Call-back, para o destination receber o caminho adequado com base no que vier.
    },
    filename: function(req, file, cb){
        cb(null, Date.now() + String(Math.floor(Math.random() * 100)) + path.extname(file.originalname)) //Pego o nome original do arquivo e acho a extensão dele, 
                                                                                                        // concatenando com a data e aumentendo 100 números para carregar todas de uma vez
    }
})

const imageUpload = multer({
    storage: imageStorage,   //Passamos aonde vamos guardar
    fileFilter(req,file,cb){    //Passamos um filtro para filtrar o tipo de arquivo Ex: minhaFoto.jpg 
        if(!file.originalname.match(/\.(png|jpg|jpeg)$/))    //Vemos se o fim do arquivo é .png ou .jpg
        {
            return cb(new Error("Por favor, envie apenas jpg ou png!"))
        }
        cb(undefined, true)
    }
})

module.exports = { imageUpload }