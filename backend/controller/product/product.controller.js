import { Product } from "../../service";
import { responceJson } from '../../util';

export async function userProductFind(req, res) {
    try {
        responceJson(res,200, {message: "Hello from product"});
    } catch (e) {
        console.log("Product Error", e);
    }
}
