import { MachineController } from "../../controller";
import { applyMiddleware } from "../../util";

const express = require('express')
const router = express.Router()

applyMiddleware(router, "get", "/getAll", (...args) => MachineController.getAll(...args));
// applyMiddleware(router, "post", "/set/:id",)

export default router;