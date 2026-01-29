const express = require('express');

const routes = express.Router();

const AuthController = require('./controllers/AuthController');
const PostController = require('./controllers/PostController');
const CommentController = require('./controllers/CommentController');
const authMiddleware = require('./middlewares/auth');

routes.post('/register', AuthController.register);
routes.post('/login', AuthController.login);

routes.use(authMiddleware);

routes.get('/posts', PostController.index);
routes.post('/posts', PostController.store);
routes.put('/posts/:id', PostController.update);
routes.delete('/posts/:id', PostController.delete);

routes.post('/posts/:postId/comments', CommentController.store);
routes.delete('/comments/:id', CommentController.delete);

module.exports = routes;
