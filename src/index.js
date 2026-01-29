const express = require('express');
const routes = require('./routes');
const sequelize = require('./config/database');
const connectMongo = require('./config/mongo');

const app = express();
app.use(express.json());
app.use(routes);

connectMongo();

sequelize.sync().then(() => {
    app.listen(3000, () => console.log('Servidor rodando na porta 3000'));
});
