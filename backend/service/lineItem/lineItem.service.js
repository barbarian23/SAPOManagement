import {Types} from "mongoose";
import IService from '../iservice';
import { LineItem } from '../../model';

class LineItemService extends IService {
  constructor(model) {
    super(model);
  }

  async setStatusDone(id, machine_id) {
    try {
      let lineItem = await this.getByID(id);
      if (lineItem) {
        if (lineItem.machine_id != machine_id) {
          lineItem.status = 'DONE';
          lineItem.machine_id = Types.ObjectId(machine_id);
          lineItem.process_time = Date.now();
          let result = lineItem.save();
          return result;
        } else {
          // no change
          return null;
        }
      }
      // no lineitem
      return null;
    } catch (errors) {
      console.log(errors);
      throw errors;
    }
  }

  async setStatusNot(id) {
    try {
      let lineItem = await this.getByID(id);
      if (lineItem) {
        lineItem.status = 'NOT';
        lineItem.machine_id = null;
        lineItem.process_time = null;
        let result = lineItem.save();
        return result; j
      }
      // no lineitem
      return null;
    } catch (errors) {
      console.log(errors);
      throw errors;
    }
  }
}

export default new LineItemService(LineItem);