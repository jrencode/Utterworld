import express from 'express'
import { getPosts, getPostsByAuthor, createPost, updatePost, deletePost } from '../controllers/posts.js'
import auth from '../middleware/auth.js'

const router = express.Router()

router.get('/', getPosts)
router.post('/', auth, createPost)
router.get('/author',auth, getPostsByAuthor)
router.patch('/:id', auth, updatePost);
router.delete('/:id', auth, deletePost);
export default router
