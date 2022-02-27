import IService from '../iservice';
import {Fulfillment} from '../../model';

class FulfillmentService extends IService{
  constructor(model) {
    super(model);
  }
}

export default new FulfillmentService(Fulfillment);