import express from "express";
import http from "http";
import cors from "cors";
import dotend from "dotenv";
import userRoute from "./routes/user.js";
import postRoute from "./routes/post.js";
import db from "./db/mysql.js";

const app = express();
const server = http.createServer(app);

app.use(
  cors({
    origin: "*",
  }),
);

dotend.config();
db;

app.use(express.json());
app.use("/user", userRoute);
app.use("/post", postRoute);


server.listen(8080, () => console.log("server is running on port 8080"));
