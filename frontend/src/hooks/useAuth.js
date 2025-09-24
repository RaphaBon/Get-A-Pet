//Nomenclatura use é importante, onde 90% das vezes que tiver useAlgo, será um hook
//Nesse hook vamos fazer chamadas na API para tratar da autenticação

//Chamamos a API
import api from '../utils/api'

//Chamando alguns hooks
import {useState, useEffect} from 'react' //useState cria um objeto para manipularmos em qualquer lugar
import {useHistory} from 'react-router-dom' //Método para direcionar o usuário após alguma ação

export default function useAuth(){

    async function register(user) {
        
        try{
            const data = await api.post('/users/register', user).then((response) => {  //Váriavel de dados para armazenar o retorno da api, 
                                                                                       // onde vamos enviar os dados que veio do form para a rota de registro da API e pegar a 
                                                                                       // resposta dela.
                return response.data    
            })      
                                        
            console.log(data)
        }catch(error){
            //tratar erro
            console.log(error)
        }
    }

    return { register } //Retornamos as funções que criamos

}