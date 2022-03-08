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

      async search(req, res, next) {
            try {
                  const { page, pageSize, keyword, sortBy } = req.query;
                  let _skip = page > 0 ? (Number(page) - 1) * Number(pageSize) : 0;
                  let _limit = pageSize ? Number(pageSize) : 10;
                  let _sortBy = sortBy ? sortBy : '_id';
                  let query = {};
                  const result = await this.service.search(query, _skip, _limit, _sortBy);
                  responceJson(res, 200, result);
            } catch (e) {
                  responceJson(res, 400, []);
                  next(e);
            }
      }


}