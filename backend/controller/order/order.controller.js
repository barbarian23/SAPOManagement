
import { OrderService } from "../../service";
import { responceJson } from '../../util';

export async function getOrders(req, res){
      console.log("getOrders");
      const {body} = req;
      //const {param} = req;

      let result = await OrderService.getInstance().getAll();
      console.log("result",result);
      responceJson(res, 200, {message: result});
}