import '@babel/polyfill';
// import compression from "compression";
import express from "express";
//import bodyParser from 'body-parser';
import path from "path";
import { responceJson } from "./util";
import cors from "cors";
import { router } from "./router";

const app = express();

//sử dụng thư mục static
app.use("/static", express.static(path.resolve(__dirname, "public")));

//middleware được sử dụng để nhận các request từ client
app.use(express.json());
app.use(cors({ origin: "*", credentials: true }));
app.use(express.urlencoded({ extended: true }));

router(app);

//catch 404
app.use((req, res) => {
    responceJson(res,404);
});

export default app;