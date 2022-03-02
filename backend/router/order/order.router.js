import { OrderController } from "../../controller";
import { applyMiddleware } from "../../util";

const express = require('express')
const router = express.Router()

applyMiddleware(router, "get", "/getOrders", (...agrs) => OrderController.getAll(...agrs));
applyMiddleware(router, "get", "/searchOrders", (...agrs) => OrderController.search(...agrs));
// applyMiddleware(router, "post", "/set/:id",)

export default router;