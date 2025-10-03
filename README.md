# 🐾 Get-A-Pet

**Get-A-Pet** é uma plataforma web fullstack para adoção de animais de estimação, onde usuários podem cadastrar pets para doação e adotar pets disponíveis. O projeto foi desenvolvido durante um curso de Node.js na Udemy.

---

## 📋 Índice

- [Sobre o Projeto](#-sobre-o-projeto)
- [Funcionalidades](#-funcionalidades)
- [Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [Pré-requisitos](#-pré-requisitos)
- [Instalação](#-instalação)
- [Configuração](#-configuração)
- [Como Usar](#-como-usar)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [API Endpoints](#-api-endpoints)
- [Contribuindo](#-contribuindo)
- [Licença](#-licença)

---

## 🎯 Sobre o Projeto

Get-A-Pet é uma aplicação completa que conecta pessoas que desejam adotar animais de estimação com aqueles que precisam doar. A plataforma oferece um sistema de cadastro seguro, gerenciamento de pets, agendamento de visitas e conclusão do processo de adoção.

### Principais Características

- Sistema de autenticação JWT (JSON Web Token)
- Upload e gerenciamento de múltiplas imagens por pet
- Sistema de agendamento de visitas
- Interface responsiva e intuitiva
- API RESTful completa

---

## ✨ Funcionalidades

### Para Usuários

- ✅ Registro e login de usuários
- ✅ Edição de perfil (nome, email, telefone, foto)
- ✅ Visualizar todos os pets disponíveis para adoção
- ✅ Cadastrar pets para doação
- ✅ Gerenciar pets cadastrados (editar/remover)
- ✅ Agendar visitas para adoção
- ✅ Visualizar pets que você está interessado em adotar
- ✅ Concluir processo de adoção

### Sistema

- 🔐 Autenticação com JWT
- 🖼️ Upload de múltiplas imagens
- 🔒 Proteção de rotas privadas
- 📱 Design responsivo
- ⚡ API RESTful

---

## 🛠 Tecnologias Utilizadas

### Backend

- **Node.js** - Ambiente de execução JavaScript
- **Express.js** (v5.1.0) - Framework web
- **MongoDB** - Banco de dados NoSQL
- **Mongoose** (v8.18.0) - ODM para MongoDB
- **JWT (jsonwebtoken)** - Autenticação
- **Bcrypt** (v6.0.0) - Criptografia de senhas
- **Multer** (v2.0.2) - Upload de arquivos
- **CORS** - Comunicação entre frontend e backend
- **Nodemon** - Auto-reload durante desenvolvimento

### Frontend

- **React** (v19.1.1) - Biblioteca JavaScript
- **React Router DOM** (v7.8.2) - Roteamento
- **Axios** (v1.11.0) - Cliente HTTP
- **React Icons** (v5.5.0) - Biblioteca de ícones
- **CSS Modules** - Estilização componentizada

---

## 📦 Pré-requisitos

Antes de começar, certifique-se de ter instalado em sua máquina:

- **Node.js** (versão 16 ou superior)
- **npm** ou **yarn**
- **MongoDB** (local ou MongoDB Atlas)
- **Git**

### Verificar instalações

```bash
node --version
npm --version
git --version
```

---

## 🚀 Instalação

### 1. Clone o repositório

```bash
git clone https://github.com/RaphaBon/Get-A-Pet.git
cd Get-A-Pet
```

### 2. Instale as dependências do Backend

```bash
cd backend
npm install
```

### 3. Instale as dependências do Frontend

```bash
cd ../frontend
npm install
```

---

## ⚙️ Configuração

### Backend

1. **Configure o MongoDB**

Abra o arquivo `backend/db/conn.js` e configure a URL do seu banco de dados:

```javascript
// backend/db/conn.js
await mongoose.connect('mongodb://localhost:27017/getapet')
```

**Opções de configuração:**

- **Local:** `mongodb://localhost:27017/getapet`
- **MongoDB Atlas:** `mongodb+srv://usuario:senha@cluster.mongodb.net/getapet`

2. **Configure o JWT Secret**

O projeto usa `'nossosecret'` como secret. Para produção, é recomendado usar uma variável de ambiente:

```javascript
// Em backend/helpers/create-user-token.js e backend/helpers/verify-token.js
// Altere 'nossosecret' para process.env.JWT_SECRET
```

Crie um arquivo `.env` na pasta `backend`:

```env
JWT_SECRET=sua_chave_secreta_aqui
MONGODB_URI=mongodb://localhost:27017/getapet
PORT=5000
```

3. **Estrutura de pastas para imagens**

O sistema criará automaticamente as pastas para armazenar imagens:

```
backend/
└── public/
    └── images/
        ├── users/
        └── pets/
```

### Frontend

1. **Configure a URL da API**

Abra o arquivo `frontend/src/utils/api.js` e verifique a URL:

```javascript
// frontend/src/utils/api.js
export default axios.create({
    baseURL: 'http://localhost:5000'
})
```

Para produção, altere para a URL do seu servidor.

---

## 🎮 Como Usar

### 1. Inicie o MongoDB

```bash
# Se estiver usando MongoDB local
mongod
```

### 2. Inicie o Backend

```bash
cd backend
npm start
```

O servidor estará rodando em `http://localhost:5000`

### 3. Inicie o Frontend

Em outro terminal:

```bash
cd frontend
npm start
```

A aplicação abrirá automaticamente em `http://localhost:3000`

### 4. Usando a Aplicação

1. **Registre-se:** Acesse `/register` e crie uma conta
2. **Faça Login:** Entre com suas credenciais em `/login`
3. **Cadastre um Pet:** Adicione informações e fotos do pet
4. **Explore:** Navegue pelos pets disponíveis
5. **Agende uma Visita:** Interesse-se por um pet e agende
6. **Conclua a Adoção:** Finalize o processo de adoção

---

## 📁 Estrutura do Projeto

```
Get-A-Pet/
│
├── backend/
│   ├── controllers/         # Lógica de negócio
│   │   ├── PetControllers.js
│   │   └── UserController.js
│   │
│   ├── db/                  # Configuração do banco
│   │   └── conn.js
│   │
│   ├── helpers/             # Funções auxiliares
│   │   ├── create-user-token.js
│   │   ├── get-token.js
│   │   ├── get-user-by-token.js
│   │   ├── image-upload.js
│   │   └── verify-token.js
│   │
│   ├── models/              # Modelos do MongoDB
│   │   ├── Pet.js
│   │   └── User.js
│   │
│   ├── routes/              # Definição de rotas
│   │   ├── PetRoutes.js
│   │   └── UserRoutes.js
│   │
│   ├── public/              # Arquivos estáticos
│   │   └── images/
│   │       ├── users/
│   │       └── pets/
│   │
│   ├── index.js             # Ponto de entrada
│   └── package.json
│
└── frontend/
    ├── public/
    ├── src/
    │   ├── assests/         # Imagens e recursos
    │   ├── components/      # Componentes React
    │   │   ├── form/
    │   │   ├── layout/
    │   │   └── pages/
    │   │
    │   ├── context/         # Context API
    │   │   └── UserContext.js
    │   │
    │   ├── hooks/           # Custom Hooks
    │   │   ├── useAuth.js
    │   │   └── useFlashMessage.js
    │   │
    │   ├── utils/           # Utilitários
    │   │   ├── api.js
    │   │   └── bus.js
    │   │
    │   ├── App.js
    │   └── index.js
    │
    └── package.json
```

---

## 🔌 API Endpoints

### Autenticação e Usuários

| Método | Endpoint | Descrição | Autenticação |
|--------|----------|-----------|--------------|
| POST | `/users/register` | Registrar novo usuário | Não |
| POST | `/users/login` | Login de usuário | Não |
| GET | `/users/checkuser` | Verificar usuário logado | Não |
| GET | `/users/:id` | Buscar usuário por ID | Não |
| PATCH | `/users/edit/:id` | Editar perfil do usuário | Sim |

### Pets

| Método | Endpoint | Descrição | Autenticação |
|--------|----------|-----------|--------------|
| POST | `/pets/create` | Cadastrar novo pet | Sim |
| GET | `/pets/` | Listar todos os pets | Não |
| GET | `/pets/mypets` | Listar pets do usuário | Sim |
| GET | `/pets/myadoptions` | Listar adoções do usuário | Sim |
| GET | `/pets/:id` | Buscar pet por ID | Não |
| DELETE | `/pets/:id` | Remover pet | Sim |
| PATCH | `/pets/:id` | Atualizar informações do pet | Sim |
| PATCH | `/pets/schedule/:id` | Agendar visita | Sim |
| PATCH | `/pets/conclude/:id` | Concluir adoção | Sim |

### Exemplo de Requisição

```javascript
// Registrar usuário
POST http://localhost:5000/users/register
Content-Type: application/json

{
  "name": "João Silva",
  "email": "joao@email.com",
  "phone": "11999999999",
  "password": "senha123",
  "confirmpassword": "senha123"
}

// Cadastrar pet (com autenticação)
POST http://localhost:5000/pets/create
Authorization: Bearer {seu_token_jwt}
Content-Type: multipart/form-data

{
  "name": "Rex",
  "age": 3,
  "weight": 15,
  "color": "Marrom",
  "images": [arquivo1.jpg, arquivo2.jpg]
}
```

---

## 🤝 Contribuindo

Contribuições são sempre bem-vindas! Siga os passos abaixo:

1. Faça um Fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

---

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 👨‍💻 Autor

**Raphael Bonilha**

- GitHub: [@RaphaBon](https://github.com/RaphaBon)

---

## 📞 Suporte

Se você tiver alguma dúvida ou problema, sinta-se à vontade para abrir uma [issue](https://github.com/RaphaBon/Get-A-Pet/issues).

---

## 🙏 Agradecimentos

- Curso de Node.js na Udemy
- Comunidade Open Source
- Todos os contribuidores

---

**Desenvolvido com ❤️ e ☕**
