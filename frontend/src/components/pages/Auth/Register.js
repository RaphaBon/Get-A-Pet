import Input from '../../form/Input'  //Input Component

import styles from '../../form/Form.module.css' //CSS

import { Link } from 'react-router-dom' //Link para o Clique Aqui

import { useContext, useState } from 'react'  //Hook 

import { Context } from '../../../context/UserContext' //Pega o contexto

// Componente que vamos usar lá no App.js para renderizar alguma rota
function Register(){
  const [user, setUser]  = useState({}) //Maneira de consultar e setar o estado do usuário, atribuindo às variaveis o estado inicial, que é um objeto vazio, 
                                        // preenchendo esse objeto ao longo do código, por meio do handleChange, onde este executa o useState e executa o setUser

  const {register} = useContext(Context)

    function handleChange(e){
      setUser({...user, [e.target.name]: e.target.value})  //Adiciona ou modifica a propriedade, onde cada vez que nós demos um change, já mudamos o valor aqui
    }

    function handleSubmit(e){
      e.preventDefault()
      //Enviar o usuário para o banco
      register(user)
    }

    return (
        <section className={styles.form_container}>
            <h1>Registrar</h1>
            <form onSubmit={handleSubmit}>
                {/* Como vamos utilizar vários inputs em vários usuários, criamos ele como componente externo, para apenas importar  */}
                {/* Input para o nome */}
                <Input 
                  text="Nome"
                  type="Text"
                  name="name"
                  placeholder="Digite o seu nome"
                  handleOnChange={handleChange}
                />
                <Input 
                  text="Telefone"
                  type="Text"
                  name="phone"
                  placeholder="Digite o seu telefone"
                  handleOnChange={handleChange}
                />
                <Input 
                  text="E-mail"
                  type="email"
                  name="email"
                  placeholder="Digite o seu e-mail"
                  handleOnChange={handleChange}
                />
                <Input 
                  text="Senha"
                  type="password"
                  name="password"
                  placeholder="Digite a sua senha"
                  handleOnChange={handleChange}
                />
                <Input 
                  text="Confirmação de Senha"
                  type="password"
                  name="confirmpassword"
                  placeholder="Confirme a sua senha"
                  handleOnChange={handleChange}
                />
                <input type="submit" value="Cadastrar" />
            </form>
            <p>Já tem conta? <Link to="/login">Clique Aqui.</Link></p>
        </section>
    )
}

export default Register