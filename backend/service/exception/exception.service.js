import IService from '../iservice';
import { Exception } from '../../model';

class ExceptionService extends IService{
  constructor(model) {
    super(model);
  }
}

export default new ExceptionService(Exception);