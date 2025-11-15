import express from "express";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import "dotenv/config";

import { corsMiddleware } from "./middlewares/cors.js";
import { connectDB } from "./config/db.js";
import { userRouter } from "./modules/user/user.router.js";

const app = express();
app.use(corsMiddleware());
app.use(helmet());
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.status(200).type("html").send(`
    <h1>this is the api of bitt</h1>
    <h2>repositories:</h2>
    <ul>
      <li><strong>frontend:</strong> <a href="https://github.com/kemtch19/bitt-frontend">https://github.com/kemtch19/bitt-frontend</a></li>
      <li><strong>backend:</strong> <a href="https://github.com/Juankyyy/bitt-backend">https://github.com/Juankyyy/bitt-backend</a></li>
    </ul>
  `);
});

app.get("/status", (req, res) => {
  res.status(200).send("OK");
});

// routers
app.use("/users", userRouter);

connectDB();

const PORT = process.env.PORT || 1111;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
