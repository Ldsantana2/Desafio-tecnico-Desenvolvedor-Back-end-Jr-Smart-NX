require('dotenv').config();
const express = require('express');
const routes = require('./routes');
const sequelize = require('./config/database');
const connectMongo = require('./config/mongo');

const requiredEnvVars = [
    'DB_HOST',
    'MONGO_URI',
    'JWT_SECRET',
    'DB_NAME',
    'DB_USER',
    'DB_PASS',
];
const missingVars = requiredEnvVars.filter((variable) => !process.env[variable]);

if (missingVars.length > 0) {
    console.error('\n ERRO: Arquivo .env ausente ou incompleto!');
    console.error(`Variáveis não encontradas: ${missingVars.join(', ')}`);
    console.error(
        'Certifique-se de que criou o arquivo .env baseado no .env.example.\n',
    );
    process.exit(1);
}

const app = express();
app.use(express.json());
app.use(routes);

connectMongo();

sequelize
    .sync()
    .then(() => {
        app.listen(3000, () => {
            console.log(' Servidor rodando na porta 3000');
            console.log(' PostgreSQL (Sequelize) sincronizado.');
        });
    })
    .catch((err) => {
        console.error('Falha ao sincronizar o PostgreSQL:', err);
    });
