import IService from '../iservice';
import { Produce } from '../../model';

class ProduceService extends IService {
  constructor(model) {
    super(model);
  }
}

export default new ProduceService(Produce);