import { MachineController } from "../../controller";
import { applyMiddleware } from "../../util";

const express = require('express')
const router = express.Router()

applyMiddleware(router, "get", "/getAll", MachineController.getAll);
// applyMiddleware(router, "post", "/set/:id",)

export default router;