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
    console.error('\nERRO: Arquivo .env ausente ou incompleto!');
    console.error(`Variáveis não encontradas: ${missingVars.join(', ')}`);
    console.error(
        'Certifique-se de que criou o arquivo .env baseado no .env.example.\n',
    );
    process.exit(1);
}

const app = express();
app.use(express.json());
app.use(routes);

const connectWithRetry = async (attemptsLeft) => {
    if (attemptsLeft === 0) {
        console.error(
            'Falha crítica: Não foi possível sincronizar o PostgreSQL.',
        );
        process.exit(1);
    }

    try {
        await sequelize.sync();
        console.log('PostgreSQL (Sequelize) sincronizado.');
    } catch (err) {
        const remaining = attemptsLeft - 1;
        console.error(
            `Aguardando PostgreSQL... (${remaining} tentativas restantes)`,
        );

        await new Promise((resolve) => {
            setTimeout(resolve, 5000);
        });

        return connectWithRetry(remaining);
    }
    return true;
};

const startServer = async () => {
    try {
        await connectMongo();

        await connectWithRetry(5);

        app.listen(3000, () => {
            console.log('Servidor rodando na porta 3000');
        });
    } catch (error) {
        console.error('Erro inesperado durante a inicialização:', error);
        process.exit(1);
    }
};

startServer();
