const User = require('../models/User')

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

//helpers
const createUserToken = require('../helpers/create-user-token')
const getToken = require('../helpers/get-token')
const getUserByToken = require('../helpers/get-user-by-token')


module.exports = class UserController {
    static async register(req,res) { 
 
        const { name, email, phone, password, confirmpassword } = req.body

        //Validations because this datas is obrigatory
        if(!name){
            res.status(422).json({message: 'O nome é obrigatório'}) //Send a status for API and a json with a message saying the error
            return
        }
        if(!email){
            res.status(422).json({message: 'O e-mail é obrigatório'}) 
            return
        }
        if(!phone){
            res.status(422).json({message: 'O telefone é obrigatório'}) 
            return
        }
        if(!password){
            res.status(422).json({message: 'A senha é obrigatória'}) 
            return
        }
        if(!confirmpassword){
            res.status(422).json({message: 'A confirmação de senha é obrigatório'}) 
            return
        }

        if(password !== confirmpassword)
        {
            res.status(422).json({message: 'A senha e a confirmação de senha devem ser iguais'}) 
            return            
        }

        //Check if user exists
        const userExists = await User.findOne({email: email})   //Método para validar se o email preenchido possui no BD

        if(userExists)
        {
            res.status(422).json({message: 'Este e-mail não está cadastrado!'}) 
            return            
        }


        // create a password

        const salt = await bcrypt.genSalt(12) //Adicionar +12 elementos aleátorios na senha, alem da String ja criada
        const passwordHash = await bcrypt.hash(password, salt)

        //create a user

        const user = new User({
            name,
            email,
            phone,
            password: passwordHash
        })

        try {
            const newUser = await user.save()

            await createUserToken(newUser, req, res)    //Passa para a função la do helper para criar o Token e dar uma resposta à API

        } catch (error) {
            res.status(500).json({message: error})
        }
} 

    static async login(req,res){

        const { email, password } = req.body

        if(!email){
            res.status(422).json({message: 'O e-mail é obrigatório'}) 
            return
        }

        if(!password){
            res.status(422).json({message: 'A senha é obrigatória'}) 
            return
        }

        //Check if user exists
        const user = await User.findOne({email: email})   

        if(!user)
        {
            res.status(422).json({message: 'Não há usuário cadastrado com este email!'}) 
            return            
        }

        //Check if password match with db password
        const checkPassword = await bcrypt.compare(password, user.password) //Método do bcrypt para comparar, a senha do bd com a que vem do front

        if(!checkPassword)
        {
            res.status(422).json({message: 'Senha Inválida!'}) 
            return  
        }

        await createUserToken(user, req, res)
    }

    static async checkUser(req,res){    //Pega o usuário que esta usando o sistema pelo token

        let currentUser 

        if(req.headers.authorization)   //Se veio o token
        {

            const token = getToken(req) //pegamos o token "Limpo"
            const decoded = jwt.verify(token, 'nossosecret')   //decodifica o token, com o método verify passando o token e a "senha"

            currentUser = await User.findById(decoded.id) //O usuário que está logado, vai ser identificado pelo id que está presente no token dele.

            currentUser.password = undefined    //Removemos a senha por segurança, já que vai ser enviado para o frot todo o usuário.

        }
        else{
            currentUser = null
        }

        res.status(200).send(currentUser)   //Manda o token

    }

    static async getUserById(req,res){

        const id = req.params.id 

        const user = await User.findById(id).select('-password') //método do findById para não enviar a senha para o front

        if(!user)
        {
            res.status(422).json({message: 'Usuário não encontrado!'}) 
            return             
        }

        res.status(200).json({ user })
    }

    static async editUser(req,res){

       const id = req.params.id 
       
       const token = getToken(req)  //método para pegar o token limpo
       const user = await getUserByToken(token)   //método para pegar os dados do usuario com o id desse token.

       const { name, email, phone, password, confirmpassword } = req.body

       if(req.file){    
            user.image = req.file.filename
       }


       //validations
        if(!name){
            res.status(422).json({message: 'O nome é obrigatório'}) //Send a status for API and a json with a message saying the error
            return
        }

        user.name = name

        if(!email){
            res.status(422).json({message: 'O e-mail é obrigatório'}) 
            return
        }

       //Se ele enviou um email diferente, porem ja tem um usuário com este email.
       const userExists = User.findOne({email: email})

       if(user.email !== email && userExists)   
       {
            res.status(422).json({message: 'Por favor, utilize outro e-mail'}) 
            return          
       }

        user.email = email
       
    

        if(!phone){
            res.status(422).json({message: 'O telefone é obrigatório'}) 
            return
        }

        user.phone = phone

       if(password != confirmpassword)
       {
            res.status(422).json({message: 'As senhas não conferem'}) 
            return 
       }
       else if(password === confirmpassword && password != null) //Usuário enviou uma nova senha e as senhas são iguais
       {
        // create a password

        const salt = await bcrypt.genSalt(12) //Adicionar +12 elementos aleátorios na senha, alem da String ja criada
        const passwordHash = await bcrypt.hash(password, salt)

        user.password = passwordHash

       }

       try {
        
        // returns user updated date
        await User.findOneAndUpdate({_id: user._id}, {$set: user}, {new: true}) //Parametros do método findOneAndUpdate

        res.status(200).json({message: "Usuário atualizado com sucesso!"})

       } catch (err) {
        
         res.status(500).json({message: err})
         return
       }
       


    }
               
}