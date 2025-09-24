const Pet = require('../models/Pet')

//helpers
const getToken = require('../helpers/get-token')
const getUserByToken = require('../helpers/get-user-by-token')
const mongoose = require('mongoose')

module.exports = class PetController{

    //Create a pet 
    static async create(req,res){
        
        const { name, age, weight, color } = req.body

        const images = req.files  //Declarando a imagem

        const available = true //Verificar se o pet está disponível ou nao

        // images upload
    
        // validations
        if(!name)
        {
            res.status(422).json({message: "O nome é obrigatório!"})
        }

        if(!age)
        {
            res.status(422).json({message: "A idade é obrigatória!"})
        }

        if(!weight)
        {
            res.status(422).json({message: "O peso é obrigatório!"})
        }

        if(!color)
        {
            res.status(422).json({message: "A cor é obrigatória!"})
        }

        if(images.length === 0)
        {
            res.status(422).json({message: "A imagem é obrigatória!"})
        }

        //get pet owner
        const token = getToken(req)
        const user = await getUserByToken(token)

        //Create a pet
        const pet = new Pet({
            name,
            age,
            weight,
            color,
            available,
            images: [], //Passando as imagens como array
            user: { //Objeto como usuário com propriedades
                _id: user._id,
                name: user.name,
                image: user.image,
                phone: user.phone,
            }
        })

        images.map((image) => {
            pet.image.push(image.filename) //Percorrendo o array de imagens com o map, e colocar apenas o nome das imagens no array.
        })


        try {
            const newPet = await pet.save()
            res.status(201).json({message: "Pet cadastrado com sucesso", newPet}) //Enviando o pet para o front junto ao status
        } catch (error) {
            res.status(500).json({message: error})
        }
    }

    //Take all pets to show in / "home"
    static async getAll(req,res){

        const pets = await Pet.find().sort('-createdAt') //Pegamos todos os pets ordenando pelos mais novos

        res.status(200).json({pets})
    }

    //Take all pets from user
    static async getAllUsersPet(req,res){

        //get user from token
        const token = getToken(req)
        const user = await getUserByToken(token)

        const pets = await Pet.find({'user._id': user._id}).sort('-createdAt') //No filtro para achar os pets, passamos primeiro o filtro daquela forma pois é um sub-document
                                                                                //Document dentro de outro, e passamos nosso id da variável, pegando os mais novos.

        res.status(200).json({pets})    //Deu certo e mandamos os pets
    }

    //Take all adoptions from user
    static async getAllUserAdoptions(req,res){

        const token = getToken(req)
        const user = await getUserByToken(token)

        const pets = await Pet.find({'adopter._id': user._id}).sort('-createdAt')  //No filtro, ao invez de procurar pelo userId, agora é pela adoção

        res.status(200).json({pets})
    }

    //Take pet by id
    static async getPetById(req,res){

        const id = req.params.id

        if(!mongoose.Types.ObjectId.isValid(id))   //Método do mongoose para ver se o Id é válido
        {
            res.status(422).json({message: 'ID Inválido!'})
            return
        }

        //Check if pet exists
        const pet = await Pet.findById(id)

        if(!pet){
            res.status(404).json({message: 'Pet não encontrado!'})
        }

        res.status(200).json({pet})
    
    }

    //Remove pet by id
    static async removePetById(req,res){

        const id = req.params.id

        if(!mongoose.Types.ObjectId.isValid(id))  
        {
            res.status(422).json({message: 'ID Inválido!'})
            return
        }

        //Check if pet exists
        const pet = await Pet.findById(id)

        if(!pet){
            res.status(404).json({message: 'Pet não encontrado!'})
            return
        }

        //Check if logged in user registered the pet
        const token = getToken(req)
        const user = await getUserByToken(token)


        if(pet.user._id.toString()  !== user._id.toString())   //Comparação do id do usuário com o id do pet, para ver se aquele pet é daquele user
        {
            res.status(422).json({message: 'Houve um problema ao remover o pet!'})
            return
        }

        await Pet.findByIdAndDelete(id)

        res.status(200).json({message: 'Pet removido com sucesso!'})
    }

    //Update pet
    static async updatePet(req,res){

        const id = req.params.id

        const { name, age, weight, color, available } = req.body

        const images = req.files  

        const updatedData = {} //Dados atualizados

        //Check if pet exists
        const pet = await Pet.findById(id)

        if(!pet){
            res.status(404).json({message: 'Pet não encontrado!'})
            return
        }

        const token = getToken(req)
        const user = await getUserByToken(token)

        if(pet.user._id.toString()  !== user._id.toString())   
        {
            res.status(422).json({message: 'Houve um problema ao remover o pet!'})
            return
        }

       //Validations
        if(!name)
        {
            res.status(422).json({message: "O nome é obrigatório!"})
        }else{
            updatedData.name = name
        }

        if(!age)
        {
            res.status(422).json({message: "A idade é obrigatória!"})
        }else{
            updatedData.age = age
        }

        if(!weight)
        {
            res.status(422).json({message: "O peso é obrigatório!"})
        }else{
            updatedData.weight = weight
        }

        if(!color)
        {
            res.status(422).json({message: "A cor é obrigatória!"})
        }else{
            updatedData.color = color
        }

        if(images.length === 0)
        {
            res.status(422).json({message: "A imagem é obrigatória!"})
        }else{
            updatedData.images = []
            images.map((image) => {updatedData.images.push(image.filename)})
        }

        await Pet.findByIdAndUpdate(id, updatedData)

        res.status(200).json({message: 'Pet atualizado com sucesso!'})



    }

    static async schedule(req,res){

        const id = req.params.id

        //check if pet exists

        const pet = await Pet.findById(id)

        if(!pet){
            res.status(404).json({message: 'Pet não encontrado!'})
            return
        }

        const token = getToken(req)
        const user = await getUserByToken(token)

        if(pet.user._id.equals(user._id))   //Comparação do id do usuário com o id do pet, para ver se aquele pet é daquele user
        {
            res.status(422).json({message: 'Voce não pode agendar uma visita com seu próprio pet!'})
            return
        }

        //check if user has already scheduled a visit
        if(pet.adopter){
            if(pet.adopter._id.equals(user._id))  //Verifica se o id do adotante está no pet, ou seja, se ele ja agendou.
                 res.status(422).json({message: 'Voce já agendou uma visita para este pet!'})
                  return
        }

        // add user as adopter to pet
        pet.adopter = {
            _id: user._id,
            name: user.name,
            image: user.image
        }

        await Pet.findByIdAndUpdate(id, pet)

        res.status(200).json({message: `A visita foi agendada com sucesso, entre em contato com ${pet.user.name} pelo telefone ${pet.user.phone}`})

    }

    static async concludeAdoption(req,res){

        const id = req.params.id

        const pet = await Pet.findById(id)

        if(!pet){
            res.status(404).json({message: 'Pet não encontrado!'})
            return
        }

        const token = getToken(req)
        const user = await getUserByToken(token)

        if(pet.user._id.toString()  !== user._id.toString())   
        {
            res.status(422).json({message: 'Houve um problema ao processar sua solicitação'})
            return
        }

        pet.available = false //Dizer que o pet não está mais disponível

        await Pet.findByIdAndUpdate(id, pet)

        res.status(200).json({message: "Parabens, o ciclo de adoção foi finalizado com sucesso!"})
    }

}