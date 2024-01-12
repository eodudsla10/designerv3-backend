import express from 'express';
import cors from 'cors';

import home from "./routes/index.js";

import dotenv from 'dotenv';
dotenv.config({ path: "../.env" });

const app = express();



app.use(cors());

app.use("/", home);

// 서버 실행
app.listen(parseInt(process.env.SERVER_DEV_PORT, 10), () => {
    console.log(`Server On : http://localhost:${parseInt(process.env.SERVER_DEV_PORT, 10)}/`);
})


