
import { OrderService } from "../../service";
import { responceJson } from '../../util';

export async function getOrders(req, res){

      const {body} = req;
      //const {param} = req;

      //let result = await OrderService.getInstance().query(body);

      responceJson(res, 200, {message: "order"});
}