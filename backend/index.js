import express from 'express';
import { PORT, mongoDBURL,URL} from './config.js';
import mongoose from 'mongoose';
import booksRoute from './routes/booksRoute.js';
import cors from 'cors';
import serverless from 'serverless-http';

const app = express();

// Middleware for parsing request body
app.use(express.json());

app.use(cors(
  {
    origin: URL,
    method:["POST","GET","PUT","DELETE"],
    credentials: true
  }
  
));

app.get('/', (request, response) => {
  console.log(request);
  return response.status(234).send('Welcome To MERN Stack Tutorial');
});

app.get('/books', async (req, res) => {
  try {
    const books = await Book.find({});
    return res.status(200).json({ count: books.length, data: books });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
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