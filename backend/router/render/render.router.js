import {renderController} from "../../controller";
const express = require('express');
const router = express.Router();

router.get("/*", renderController);

export default router;