import express from 'express';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import 'dotenv/config';

import { corsMiddleware } from './middlewares/cors.js';

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(corsMiddleware());

app.get('/', (req, res) => {
  res.status(200).json({
    message: "This is the API of Bitt",
    repositories: {
      frontend: 'https://github.com/kemtch19/bitt-frontend',
      backend: 'https://github.com/Juankyyy/bitt-backend'
    }
  });
});

app.get('/status', (req, res) => {
  res.status(200).send("OK");
});

const PORT = process.env.PORT || 1111;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})