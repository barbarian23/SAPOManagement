import {Types} from "mongoose";
import IController from "../icontroller";
import { LineItemService } from "../../service";
import { responceJson } from '../../util';

class LineItemController extends IController {
    constructor(service) {
        super(service);
    }

    async updateState(req, res, next) {
        try {
            const { id, status, machine_id } = req.body;
            console.log(req.body);
            let _id = id ? id : '';
            let _status = status ? status : '';
            let _machineID = machine_id ? machine_id : '';

            if (_id == '' || _status == '' || _machineID == '') {
                console.log(_id, _status, _machineID);
                responceJson(res, 400, {});
            } else {
                let lineItem = await this.service.getByID(_id);
                if(lineItem){
                    lineItem.status = status;
                    lineItem.machine_id = Types.ObjectId(_machineID);

                    let result = lineItem.save()
                    responceJson(res, 200, {
                        id: result._id
                    });
                }else{
                    responceJson(res, 400, {
                        error: 'Cant find lineItem'
                    });
                }
            }
        } catch (e) {
            responceJson(res, 400, {error: e});
            next(e);
        }
    }

}
export default new LineItemController(LineItemService);
