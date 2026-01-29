# Desafio Técnico - Back-end Jr (SmartNX)

Este repositório contém a solução para o desafio técnico de Desenvolvedor Back-end Jr. A API foi desenvolvida em JavaScript (Node.js) e implementa um sistema de gerenciamento de posts e comentários com persistência de dados e autenticação. Como o desafio não lida com dados reais ou sensíveis o .env foi incluído no repositório.

## Documentação do Desafio

O detalhamento completo dos requisitos originais pode ser consultado no PDF fornecido pela SmartNX:
[Visualizar Prova Desenvolvedor Back-end Jr.pdf](./docs/Prova%20Desenvolvedor%20Back-end%20Jr.pdf)

OBS: Os emails foram omitidos no pdf incluso neste repositório!

Curl de rotas exportadas via postman para testes:
[Clique aqui para visualizar](./docs/API.postman_collection.json)

## Tecnologias Utilizadas

- **Node.js** com **Express**: Framework principal para a construção da API.
- **PostgreSQL**: Utilizado para os dados da aplicação.
- **MongoDB**: Utilizado para a camada de Autenticação e Usuários (**Requisito PLUS**).
- **Sequelize & Mongoose**: ORMs para comunicação com os bancos de dados relacional e NoSQL.
- **JWT (JSON Web Token)**: Autenticação com validade rigorosa de 1 hora.
- **Docker & Docker Compose**: Orquestração completa do ambiente.
- **ESLint**: Padronização de código seguindo o **AirBnB**.

## Como Executar

### Pré-requisitos

- Docker e Docker Compose instalados na máquina.

### Passo a Passo

- Clone o repositório:
  `git clone <url-do-seu-repositorio>
cd <nome-da-pasta>`

- Inicie o ambiente com Docker
  `docker-compose up --build`

- A API estará disponível para receber requisições em http://localhost:3000

### Scripts Disponíveis

`npm start`

- Comando utilizado pelo Docker para iniciar a aplicação.

`npm run lint`

- Analisa o código em busca de erros de padronização baseados no AirBnB.

`npm run lint -- --fix`

- Corrige automaticamente problemas de estilo, indentação e pontuação

### Endpoints e Autenticação

Curl de rotas exportadas via postman para testes:
[Clique aqui para visualizar](./docs/API.postman_collection.json)

- POST /register: Registra um novo usuário (Nome, Username e Password).

- POST /login: Valida as credenciais e retorna o token JWT (Válido por 1h).

- GET /posts: Lista todos os posts cadastrados junto com seus comentários.

- POST /posts: Cria um novo post (Privado).

- PUT /posts/:id: Atualiza o título ou conteúdo de um post (Privado).

- DELETE /posts/:id: Remove um post. Devido ao CASCADE, todos os comentários vinculados também são deletados (Privado).

- POST /posts/:post_id/comments: Adiciona um novo comentário a um post específico (Privado).

- DELETE /comments/:id: Remove um comentário individual (Privado).
