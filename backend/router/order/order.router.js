import { OrderController } from "../../controller";
import { applyMiddleware } from "../../util";

const express = require('express')
const router = express.Router()

applyMiddleware(router, "get", "/getAll", (...agrs) => OrderController.getAll(...agrs));
applyMiddleware(router, "get", "/getByID", (...agrs) => OrderController.getByID(...agrs));
applyMiddleware(router, "get", "/search", (...agrs) => OrderController.search(...agrs));
applyMiddleware(router, "get", "/searchLineItems", (...agrs) => OrderController.searchLineItems(...agrs));
// applyMiddleware(router, "post", "/set/:id",)

export default router;