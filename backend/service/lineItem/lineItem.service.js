import IService from '../iservice';
import { LineItem } from '../../model';

class LineItemService extends IService {
  constructor(model) {
    super(model);
  }
}

export default new LineItemService(LineItem);