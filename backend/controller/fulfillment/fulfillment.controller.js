import IController from "../icontroller";
import { FulfillmentService } from "../../service";
// import { responceJson } from '../../util';

class FulfillmentController extends IController {
      constructor(service) {
            super(service);
      }
}
export default new FulfillmentController(FulfillmentService);
