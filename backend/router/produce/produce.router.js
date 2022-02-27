import { ProduceController } from "../../controller";
import { applyMiddleware } from "../../util";

const express = require('express')
const router = express.Router()

applyMiddleware(router, "get", "/getAll", (...args) => ProduceController.getAll(...args));
// applyMiddleware(router, "post", "/set/:id",)

export default router;