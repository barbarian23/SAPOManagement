import { responceJson } from '../util';

export default class IController {

      constructor(service) {
            this.service = service;
      }

      async getAll(req, res, next) {
            try {
                  const result = await this.service.getAll();
                  responceJson(res, 200, result);
            }
            catch (e) {
                  next(e);
            }
      }

      
}