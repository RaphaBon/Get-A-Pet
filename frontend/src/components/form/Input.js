import styles from './Input.module.css'


function Input({
    type,   //texto, number, date
    text,   //o que vai ficar na label
    name,   //o nome do atributo
    placeholder, 
    handleOnChange, //um método que vamos passar do pai para o filho que vai realizar a mudança de estado do componente, ou seja, cada input vai representar 
                    // uma entidade do nosso objeto
    value,   //trazer o valor salvo no MongoDb para formulário de edição
    multiple,  //Trazer imagens.
}) {
    return(     //Retornamos um jfx (espécie de HTML dentro js)
        <div className={styles.form_control}>
            <label htmlFor={name}>{text}:</label>
            <input 
                type={type} 
                name={name} 
                id={name} 
                placeholder={placeholder} 
                onChange={handleOnChange} 
                value={value}
                //Lógica para estabelecer se o campo é de multiplas fotos ou não, onde o {...} é uma espécie de if else, sendo o 1° multiple o elemento a ser verificado se veio
                //, o 2° é a resposta, e o '' é o else. Ou seja, se veio multiple, retorna, se não veio, não retorna nada.
                {... (multiple ? { multiple } : '')}
                />
        </div>
    )
}

export default Input