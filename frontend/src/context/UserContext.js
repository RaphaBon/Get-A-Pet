//Criamos o container que abraçava a children, onde aqui vamos alimentar ele com as informações corretas.

import { createContext } from "react";
import useAuth from "../hooks/useAuth";

const Context = createContext()

function UserProvider({children}){  //Provider é um coponente que fornece algo para outro, e o children significa que o Provider vai abraçar outros componentes

    const {register} = useAuth()

    return(
        <Context.Provider value={{register}}>
            {children}
        </Context.Provider>
    )

}

export {Context, UserProvider}