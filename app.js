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

app.get('/status', (req, res) => {
  res.status(200).send("OK");
});

const PORT = process.env.PORT || 1111;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})