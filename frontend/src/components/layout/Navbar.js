//Importando método link para 
import { Link } from "react-router-dom"

//Importando a imagem
import Logo from '../../assests/img/logo.png'

// Importando o css da navbar
import styles from './Navbar.module.css'

function Navbar(){
    return (
        <nav className={styles.navbar}>
            <div className={styles.navbar_logo}>
                <img src={Logo} alt="Get a Pet"/>
                <h2>Get A Pet</h2>
            </div>
            <ul>
                <li>
                    <Link to={"/"}>Adotar</Link>
                </li>
                <li>
                    <Link to={"/login"}>Entrar</Link>
                </li>
                <li>
                    <Link to={"/register"}>Registrar</Link>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar