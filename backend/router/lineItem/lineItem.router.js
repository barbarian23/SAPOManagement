import { LineItemController } from "../../controller";
import { applyMiddleware } from "../../util";

const express = require('express')
const router = express.Router()

applyMiddleware(router, "post", "/updateState", (...agrs) => LineItemController.updateState(...agrs));

export default router;