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

      async getByID(req, res, next) {
            try {
                  const { id } = req.query;
                  if(id){
                        const result = await this.service.getByID(id);
                        responceJson(res, 200, result);
                  }else{
                        responceJson(res, 200, []);
                  }
            }
            catch (e) {
                  next(e);
            }
      }
}