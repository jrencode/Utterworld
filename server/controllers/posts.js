import mongoose from 'mongoose'
import express from 'express';
import PostMessage from '../models/postMessage.js'

const router = express.Router();

export const getPosts = async (req, res) => {
   try {
      const posts = await PostMessage.find()
      console.log(posts)

      res.status(200).json(posts)
   } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Failed to retrieve posts" });
   }
}
export const getPostsByAuthor = async (req, res) => {
   const authorId = req.userId;
   try {
      console.log(`authorId: ` + authorId);
      const existingAuthorPosts = await PostMessage.find({ authorId });
      console.log(existingAuthorPosts);
      res.json(existingAuthorPosts);
   } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Failed to retrieve posts" });
   }
};
export const createPost = async (req, res) => {
   const post = req.body

   const newPost = new PostMessage({...post, authorId: req.userId, createdAt: new Date().toISOString()})
   
   try {
      await newPost.save()

      res.status(201).json(newPost)
   } catch (error) {
      res.status(409).json({ message: error.message })
   }
}

export const updatePost = async (req, res) => {
   const { id } = req.params;
   const post  = req.body;
   
   
   if (!mongoose.Types.ObjectId.isValid(id)) 
      return res.status(404).send(`No post with id: ${id}`);

   const existingPost = await PostMessage.findById(id);

   if (existingPost.authorId !== req.userId) {
      return res.status(400).send('You do not have permission to edit this post.');
   }

   const selectedPost = ({ ...post, authorId: req.userId, _id: id });

   const updatedPost = await PostMessage.findByIdAndUpdate(id, selectedPost, { new: true });

   res.json(updatedPost);
}

export const deletePost = async (req, res) => {
   const { id } = req.params;

   if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

   await PostMessage.findByIdAndRemove(id);

   res.json({ message: "Post deleted successfully." });
}

export default router