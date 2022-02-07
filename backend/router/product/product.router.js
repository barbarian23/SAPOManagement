import { userProductFind } from "../../controller";
import { applyMiddleware } from "../../util";

const express = require('express')
const router = express.Router()

//normally we use
//router.get("/", renderController);
applyMiddleware(router, "get", "/getAll", userProductFind);

export default router;