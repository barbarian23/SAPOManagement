import { LineItemController } from "../../controller";
import { applyMiddleware } from "../../util";

const express = require('express')
const router = express.Router()

applyMiddleware(router, "post", "/updateStatus", (...agrs) => LineItemController.updateStatus(...agrs));

export default router;