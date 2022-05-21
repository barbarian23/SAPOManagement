import IController from "../icontroller";
import { LineItemService, OrderService } from "../../service";
import { responceJson } from '../../util';

class LineItemController extends IController {
    constructor(service) {
        super(service);
    }

    async updateStatus(req, res, next) {
        try {
            const { id, status, machine_id } = req.body;
            let _id = id ? id : '';
            let _status = status ? status : '';
            let _machineID = machine_id ? machine_id : '';

            if (_id == '' || _status == '' || (_status == 'DONE' && _machineID == '')) {
                responceJson(res, 400, { error: "Bad params" });
            } else {
                let result = null;
                if (_status == "DONE") {
                    result = await this.service.setStatusDone(_id, _machineID);
                } else {
                    result = await this.service.setStatusNot(_id);
                }
                //check orders in lineitems
                console.log(_id);
                let lineitems = await OrderService.getLineItemsByID(_id);
                console.log(lineitems)
                for(var i = 0; i< lineitems.length; i++){
                    let order_number = lineitems[i].order_number;
                    let status = await OrderService.isAllLineItemsDone(order_number);
                    console.log(status)
                    if (status) {
                        await OrderService.setStatusDone(order_number);
                    } else {
                        await OrderService.setStatusNot(order_number);
                    }
                }
                responceJson(res, 200, { result: result });
            }
        } catch (e) {
            responceJson(res, 400, { error: e });
            next(e);
        }
    }

}
export default new LineItemController(LineItemService);
