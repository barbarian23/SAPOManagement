import { applyMiddleware } from "../../util";
import { FulfillmentController } from "../../controller";

const express = require('express')
const router = express.Router()

applyMiddleware(router, "get", "/getAll", (...args) => FulfillmentController.getAll(...args));
applyMiddleware(router, "get", "/get", (...args) => FulfillmentController.get(...args));
applyMiddleware(router, "get", "/getDetailByID", (...args) => FulfillmentController.getDetailByID(...args));
// applyMiddleware(router, "post", "/set/:id",)

export default router;