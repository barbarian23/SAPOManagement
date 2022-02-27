import IController from "../icontroller";
import { ProduceService } from "../../service";
// import { responceJson } from '../../util';

class ProduceController extends IController {
      constructor(service) {
            super(service);
      }
}
export default new ProduceController(ProduceService);
