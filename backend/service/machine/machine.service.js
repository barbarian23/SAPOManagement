import IService from '../iservice';
import {Machine} from '../../model';

class MachineService extends IService{
  constructor(model) {
    super(model);
  }
}

export default new MachineService(Machine);