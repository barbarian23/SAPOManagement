import { User } from "../../service";
import { responceJson } from '../../util';

const DEFAULT_DELAY = 2000;

/**
 * 
 * @param {*} ms sleep đi 1 vài giây, đơn vị là milisecond
 */
function timer(ms) {
    ms = ms == null ? DEFAULT_DELAY : ms;
    return new Promise(res => setTimeout(res, ms));
}

// do login
export async function userLoginController(req, res) {
    try {

        //query
        //đ
        const result = User.getInstance().getAll();

        responceJson(res,200, {message: "Hello from backend"});
    } catch (e) {
        console.log("Login Error", e);
    }
}
