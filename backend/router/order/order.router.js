import { getOrders } from "../../controller";

import { applyMiddleware } from "../../util";

const express = require('express')
const router = express.Router()


applyMiddleware(router, "get", "/getOrders", getOrders);
applyMiddleware(router, "post", "/set/:id",)

export default router;