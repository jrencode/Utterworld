

import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv'

import postRoutes from './routes/posts.js';
import userRoutes from './routes/user.js';

const app = express();
dotenv.config()

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());


app.use('/posts', postRoutes);
app.use('/user', userRoutes);

const CONNECTION_URL = process.env.MONGODB_URI || MONGODB_URI
const PORT = process.env.PORT|| 5000;
const SERVER = '';
mongoose.set('strictQuery', true);
mongoose.connect(CONNECTION_URL, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
})
  .then(() => 
  app.listen(PORT, () => ( 
    SERVER.length > 0 ?  console.log('Server Running online') : console.log(`Server Running on Port: http://localhost:${PORT}`))
  )
  
  )
  .catch((error) => console.log(`${error} did not connect`));