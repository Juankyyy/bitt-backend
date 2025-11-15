import cors from 'cors';

export const corsMiddleware = () =>
  cors({
    origin: (origin, callback) => {
      const ACCEPTED_ORIGINS = [process.env.PROD_FRONT, process.env.LOCAL_FRONT];

      if (ACCEPTED_ORIGINS.includes(origin)) {
        return callback(null, true);
      }

      if (!origin) {
        return callback(null, true);
      }

      return callback(new Error(`Origin ${origin} is not allowed by CORS`));
    },
  });
