# Desafio Técnico - Back-end Jr (SmartNX)

Este repositório contém a solução para o desafio técnico de Desenvolvedor Back-end Jr da SmartNX. A API foi desenvolvida em JavaScript (Node.js) e implementa um sistema de gerenciamento de posts e comentários com persistência de dados e autenticação.

## Documentação do Desafio

O detalhamento completo dos requisitos originais pode ser consultado no PDF fornecido pela SmartNX:
[Visualizar Prova Desenvolvedor Back-end Jr.pdf](./docs/Prova%20Desenvolvedor%20Back-end%20Jr.pdf)

OBS: Os emails foram omitidos no pdf incluso neste repositório!

curl de rotas exportadas via postman para testes:
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

- Crie o arquivo .env com as variáveis inclusas no .env.example

- Inicie o ambiente com Docker
  `docker-compose up --build`

- Aguarde a mensagem de "Servidor rodando na porta xxx"

- A API estará disponível para receber requisições em http://localhost:3000

### Scripts Disponíveis

`npm start`

- Comando utilizado pelo Docker para iniciar a aplicação.

`npm run lint`

- Analisa o código em busca de erros de padronização baseados no AirBnB.

`npm run lint -- --fix`

- Corrige automaticamente problemas de estilo, indentação e pontuação

### Endpoints e Autenticação

curl de rotas exportadas via postman para testes:
[Clique aqui para visualizar](./docs/API.postman_collection.json)

- Cadastro de Usuário: Envie um POST para /register com um corpo JSON contendo name, username e password.

- Login: Envie um POST para /login com username e password. O retorno será um Token JWT que deve ser usado nas demais rotas.

- Listagem de Posts: Envie um GET para /posts. Esta rota retorna todos os posts com seus respectivos comentários aninhados. Requer Header: Authorization: Bearer <token>

- Criação de Post: Envie um POST para /posts com um JSON contendo title e content. Requer Header: Authorization: Bearer <token>.

- Edição de Post: Envie um PUT para /posts/:id com os campos que deseja atualizar no corpo da requisição. Requer Header: Authorization: Bearer <token>.

- Exclusão de Post: Envie um DELETE para /posts/:id. Isso removerá o post e todos os comentários vinculados a ele. Requer Header: Authorization: Bearer <token>.

- Adicionar Comentário: Envie um POST para /posts/:post_id/comments com um JSON contendo o campo content. Requer Header: Authorization: Bearer <token>.

- Remover Comentário: Envie um DELETE para /comments/:id (este é o id do comentário e não do post!). Requer Header: Authorization: Bearer <token>.
