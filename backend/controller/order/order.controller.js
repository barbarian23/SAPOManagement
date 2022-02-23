import { OrderService } from "../../service";
import { responceJson } from '../../util';

export async function getOrders(req, res){
      console.log("getOrders");
      const {body} = req;
      //const {param} = req;

      let result = await OrderService.getInstance().getAllOrder();
      console.log("result",result);
      responceJson(res, 200, {message: result});
}

export async function updateOrder(req,res){
      console.log("updateOrder");
      const {body} = req;
      //const {param} = req;

      let result = await OrderService.getInstance().updateOrder(body);
      console.log("result",result);
      responceJson(res, 200, {message: result});
}