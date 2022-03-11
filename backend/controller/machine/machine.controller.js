import IController from "../icontroller";
import { MachineService } from "../../service";
// import { responceJson } from '../../util';

class MachineController extends IController {
      constructor(service) {
            super(service);
      }
}
export default new MachineController(MachineService);
