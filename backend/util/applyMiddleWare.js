const fs = require('fs')
const path = require('path')
import { responceJson } from "./resJson.util";

/**
 * router, post/get/put,  đường dẫn, controller
 * normally we use
 * router.get("/", middleWare, renderController);
 * currently we use this function 
 * for check log and apply middleware like jwt
 * @param {*} router 
 * @param {*} method 
 * @param {*} controller 
 * @param {*} useMiddleWare 
 */
export function applyMiddleware(router, method, url, controller, ...middleWare) {
    // apply 1 middle ware
    let wrapper = async function (req, res, next) {
        try {
            await controller(req, res, next);
        } catch (e) {
            addLog(req, e);
            return responceJson(res, 400, 'Invalid param');
        }
    }

    //router.get("/url", middleWare, controller);
    //router["get"](controller, ...middleWare, wrapper);
    router[method](url, ...middleWare, wrapper);
}

function addLog(req, error) {
    const url = req.originalUrl || req.url
    const errMsg = error.stack
    let errFileMsg = `
    TIME: ${new Date().toLocaleString()}
    URL: ${url}
    MSG: ${errMsg}
    `
    if (req.method !== 'GET')
        errFileMsg += `BODY: ${JSON.stringify(req.body)}`

    console.log("an error occurs", errFileMsg);

    fs.exists(path.resolve(__dirname, '../logs/error.log'), function (exists) {
        // if (exists) {
        //     console.log("exist");
        // } else {
        //     console.log("not exist");

        // }
        fs.writeFileSync(path.resolve(__dirname, 'error.log'), errFileMsg + '\n\n', { encoding: "utf8", flag: 'w' }, function (err, data) {
            console.log("an error occurs, write to log", errFileMsg);
        })
    });


    //fs.appendFileSync(path.resolve(__dirname, '../logs/error.log'), errFileMsg + '\n\n', 'utf8')
}   
