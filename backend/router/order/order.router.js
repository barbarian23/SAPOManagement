import { OrderController } from "../../controller";
import { applyMiddleware } from "../../util";

const express = require('express')
const router = express.Router()

applyMiddleware(router, "get", "/getAll", (...agrs) => OrderController.getAll(...agrs));
applyMiddleware(router, "get", "/getByID", (...agrs) => OrderController.getByID(...agrs));
applyMiddleware(router, "get", "/search", (...agrs) => OrderController.search(...agrs));
applyMiddleware(router, "get", "/setStatus", (...agrs) => OrderController.setStatus(...agrs));
applyMiddleware(router, "get", "/setPrinted", (...agrs) => OrderController.setPrinted(...agrs));
applyMiddleware(router, "get", "/searchLineItems", (...agrs) => OrderController.searchLineItems(...agrs));
applyMiddleware(router, "get", "/getLineItemsBySKU", (...agrs) => OrderController.getLineItemsBySKU(...agrs));
applyMiddleware(router, "get", "/getLineItemsByID", (...agrs) => OrderController.getLineItemsByID(...agrs));
// applyMiddleware(router, "post", "/set/:id",)

export default router;