const Comment = require('../models/Comment');
const Post = require('../models/Post');

module.exports = {
    async store(req, res) {
        try {
            const { postId } = req.params;
            const post = await Post.findByPk(postId);

            if (!post) {
                return res.status(404).json({ error: 'Post não encontrado' });
            }

            const comment = await Comment.create({
                content: req.body.content,
                PostId: postId,
            });

            return res.status(201).json(comment);
        } catch (error) {
            return res
                .status(400)
                .json({ error: 'Erro ao adicionar comentário' });
        }
    },

    async delete(req, res) {
        try {
            const { id } = req.params;
            const deleted = await Comment.destroy({ where: { id } });

            if (!deleted) {
                return res
                    .status(404)
                    .json({ error: 'Comentário não encontrado' });
            }
            return res.status(204).send();
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao deletar comentário' });
        }
    },
};
