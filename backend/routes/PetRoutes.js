const router = require('express').Router()

const PetController = require('../controllers/PetControllers')

// middlewares
const verifyToken = require('../helpers/verify-token')
const { imageUpload }= require('../helpers/image-upload')

//Router to create a pet, with login verification and saving the images in array
router.post('/create', verifyToken, imageUpload.array('images') ,PetController.create)  //Passamos como arry pois são varias imagens.

//Router to, when user open the system, he can see all pets, even whitout login
router.get('/', PetController.getAll)

//Router to user see all pets that he is donation
router.get('/mypets', verifyToken, PetController.getAllUsersPet)

//Router to see every pets that a user adopted
router.get('/myadoptions', verifyToken, PetController.getAllUserAdoptions)

//Router to get pet by id
router.get('/:id', PetController.getPetById)

//Router to remove pet from system
router.delete('/:id', verifyToken, PetController.removePetById) //Mesma rota do '/:id', porem com método http diferente.

//Router to update pet
router.patch('/:id', verifyToken, imageUpload.array('images'), PetController.updatePet)

//Router to schedule visit
router.patch('/schedule/:id', verifyToken, PetController.schedule)

//Router to conclude adoption
router.patch('/conclude/:id', verifyToken, PetController.concludeAdoption)


module.exports = router