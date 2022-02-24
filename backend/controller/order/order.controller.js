import {OrderService} from "../../service";
import { responceJson } from '../../util';

export async function getOrders(req, res, next) {
      // const { id } = req.params;
      try {
            const result = await OrderService.getAll();
            responceJson(res, 200, result);
      }
      catch (e) {
            next(e);
      }
}