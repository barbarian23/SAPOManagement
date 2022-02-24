import IService from '../iservice';
import {Order} from '../../model';

class OrderService extends IService{
  constructor(model) {
    super(model);
  }
}

export default new OrderService(Order);