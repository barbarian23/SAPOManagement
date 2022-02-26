import autoBind from "auto-bind";
import IController from "../icontroller";
import { OrderService } from "../../service";
// import { responceJson } from '../../util';

class OrderController extends IController {
      constructor(service) {
            super(service);
            autoBind( this );
      }
}
export default new OrderController(OrderService);
