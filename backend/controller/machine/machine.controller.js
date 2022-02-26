import autoBind from "auto-bind";
import IController from "../icontroller";
import { MachineService } from "../../service";
// import { responceJson } from '../../util';

class MachineController extends IController {
      constructor(service) {
            super(service);
            autoBind( this );
      }
}
export default new MachineController(MachineService);
