import styles from './Container.module.css'

// Children para mostrarmos o conteúdo dentro do container, onde o container é o pai e o children o filho
function Container({children}){
    return (
        <main className={styles.container}>{children}</main>
    )
}

export default Container