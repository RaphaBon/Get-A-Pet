const router = require('express').Router()
const UserController = require('../controllers/UserController')

//middlewares
const verifyToken = require('../helpers/verify-token')
const { imageUpload } = require('../helpers/image-upload')

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.get('/checkuser', UserController.checkUser)
router.get('/:id', UserController.getUserById)
router.patch('/edit/:id', verifyToken, imageUpload.single('image'), UserController.editUser) //Rota de patch pois é de atualização (la no postman deve ser rota de patch), 
                                                                                            // com a análise do token e imagem (vamos sempre receber apenas 1 imagem (single))
                                                                                            // com o campo a ser enviado no formulário 'image'



module.exports = router