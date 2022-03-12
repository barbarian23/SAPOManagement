import {Types} from "mongoose";
import IController from "../icontroller";
import { LineItemService } from "../../service";
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
                // console.log(_id, _status, _machineID);
                responceJson(res, 400, {error: "Bad params"});
            } else {
                let lineItem = await this.service.getByID(_id);
                if(lineItem){
                    if(lineItem.status != _status || lineItem.machine_id != _machineID){
                        if(_status == "DONE"){
                            lineItem.status = _status;
                            lineItem.machine_id = Types.ObjectId(_machineID);
                            lineItem.process_time = Date.now();
                        }else{
                            lineItem.status = _status;
                            lineItem.machine_id = null;
                            lineItem.process_time = null;
                        }
                        let result = lineItem.save()
                        responceJson(res, 200, {id: result._id});
                    }else{
                        responceJson(res, 200, {id: lineItem._id});                
                    }
                }else{
                    responceJson(res, 400, {error: 'Cant find lineItem'});
                }
            }
        } catch (e) {
            responceJson(res, 400, {error: e});
            next(e);
        }
    }

}
export default new LineItemController(LineItemService);
