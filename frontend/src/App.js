// Imports do react-router-dom para trabalhar com rotas
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// Import das páginas
import Login from './components/pages/Auth/Login'
import Register from './components/pages/Auth/Register'
import Home from './components/pages/Home'

// Import dos componentes de layout (fixos em todas as páginas)
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Container from './components/layout/Container'

// Import Context
import { UserProvider } from './context/UserContext'

function App() {
  return (
    // O Router é o provedor de rotas: tudo que envolve navegação fica dentro dele
    <Router>
      {/* Todos os elementos conseguem identificar qual o contexto do usuário */}
      <UserProvider>
      {/* Navbar aparece em todas as páginas */}
      <Navbar />

      <Container>
        {/* Routes agrupa todas as rotas (substitui o antigo Switch do v5) */}
       <Routes>
        {/* Cada Route define um caminho (path) e qual componente será renderizado */}
        {/* Importante: no v6 usamos element={<Componente />} */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Home />} />
      </Routes>
      </Container>

      {/* Footer também aparece em todas as páginas */}
      <Footer />

      </UserProvider>
    </Router>
  )
}

export default App
