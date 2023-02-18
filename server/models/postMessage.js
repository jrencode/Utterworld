import mongoose from 'mongoose'

const postSchema = mongoose.Schema({
   author: String,
   authorId: String,
   title: String,
   story: String,
   tags: [String],
   selectedFile: String,
   likeCount: {
      type: Number,
      default: 0,
   },
   createdAt: {
      type: Date,
      default: new Date(),
   },
   comments: {
      type: Array,
      default: [{}]
   }
})

const PostMessage = mongoose.model('PostMessage', postSchema)
export default PostMessage
