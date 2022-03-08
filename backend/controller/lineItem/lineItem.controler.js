import IController from "../icontroller";
import { LineItemService } from "../../service";
import { responceJson } from '../../util';

class LineItemController extends IController {
    constructor(service) {
        super(service);
    }
}
export default new LineItemController(LineItemService);
