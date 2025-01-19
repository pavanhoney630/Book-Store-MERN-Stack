import express from 'express';
import { PORT, mongoDBURL,URL} from './config.js';
import mongoose from 'mongoose';
import booksRoute from './routes/booksRoute.js';
import cors from 'cors';
import serverless from 'serverless-http';

const app = express();

// Middleware for parsing request body
app.use(express.json());

const corsOptions = {
  origin: URL,
   
 methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], 
  allowedHeaders: ['Content-Type', 'Authorization'] 
 }; app.use(cors(corsOptions)); app.use(express.json());
 app.options('*', cors(corsOptions));
  app.get('/', (req, res) => { res.send('Hello World'); 
 }); 
  


app.use('/books', booksRoute);

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log('App connected to database');
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
  export const handler = serverless(app);
