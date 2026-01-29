const Post = require('../models/Post');
const Comment = require('../models/Comment');

module.exports = {
    async index(req, res) {
        try {
            const posts = await Post.findAll({ include: Comment });
            return res.json(posts);
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao listar posts' });
        }
    },

    async store(req, res) {
        try {
            const post = await Post.create(req.body);
            return res.status(201).json(post);
        } catch (error) {
            return res.status(400).json({ error: 'Erro ao criar post' });
        }
    },

    async update(req, res) {
        try {
            const { id } = req.params;
            const [updated] = await Post.update(req.body, { where: { id } });
            if (!updated) { return res.status(404).json({ error: 'Post não encontrado' }); }

            const updatedPost = await Post.findByPk(id);
            return res.json(updatedPost);
        } catch (error) {
            return res.status(400).json({ error: 'Erro ao atualizar post' });
        }
    },

    async delete(req, res) {
        try {
            const { id } = req.params;
            const deleted = await Post.destroy({ where: { id } });
            if (!deleted) { return res.status(404).json({ error: 'Post não encontrado' }); }
            return res.status(204).send();
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao deletar post' });
        }
    },
};
