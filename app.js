import "dotenv/config";
import mongoose from "mongoose";
import express from "express";
import morgan from "morgan";
import usersRouters from './routes/usersRouters.js'
import ticketsRouters from './routes/ticketsRouters.js'
import error from './middlewears/error.js'
import helmet from "helmet";
import cors from 'cors';
import compression from "compression";
import rateLimit from "./helpers/rateLimit.js";

const app = express();
const DB_URL =
  process.env.NODE_ENV === "test"
    ? "mongodb://localhost:27017/ticketing-db-test"
    : process.env.DB_URL || "mongodb://localhost:27017/ticketing-db";

  mongoose.connect(DB_URL)
    .then(()=> console.log(`Connected to db ${DB_URL}`))
    .catch((err) => console.error("Failed to connect to DB ", err ))

app.use(morgan("dev"));
app.use(express.json());
app.use(helmet())
app.use(cors())
if(process.env.NODE_ENV === "prod"){
  app.use(compression())
  app.use(rateLimit())
}
app.get("/", (req, res) => {
  res.send("Hello Word");
});

app.use('/api/users',usersRouters);

app.use('/api/tickets', ticketsRouters)

app.use(error);

export default app;
