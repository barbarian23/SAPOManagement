import { userLoginController } from "../../controller";
import { applyMiddleware } from "../../util";

const express = require('express')
const router = express.Router()

//normally we use
//router.get("/", renderController);
applyMiddleware(router, "get", "/login", userLoginController);

export default router;