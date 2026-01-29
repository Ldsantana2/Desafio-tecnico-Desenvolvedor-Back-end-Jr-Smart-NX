const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = {
    async register(req, res) {
        try {
            const { name, username, password } = req.body;
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = await User.create({
                name,
                username,
                password: hashedPassword,
            });
            const userResponse = newUser.toObject();
            delete userResponse.password;
            return res.status(201).json(userResponse);
        } catch (error) {
            return res.status(400).json({ error: 'Erro ao registrar usuário' });
        }
    },

    async login(req, res) {
        try {
            const { username, password } = req.body;
            const identity = await User.findOne({ username });

            if (
                !identity
                || !(await bcrypt.compare(password, identity.password))
            ) {
                return res.status(401).json({ error: 'Credenciais inválidas' });
            }

            const accessToken = jwt.sign(
                { id: identity._id },
                process.env.JWT_SECRET,
                {
                    expiresIn: '1h',
                },
            );
            return res.json({ token: accessToken });
        } catch (error) {
            return res.status(500).json({ error: 'Erro no servidor' });
        }
    },
};
