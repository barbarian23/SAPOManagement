import IController from "../icontroller";
import { FulfillmentService } from "../../service";
import { responceJson } from '../../util';

class FulfillmentController extends IController {
      constructor(service) {
            super(service);
      }


      async get(req, res, next) {
            try {
                  const pipeline = [
                        {
                              $lookup: {
                                    from: 'line_items',
                                    localField: 'line_items',
                                    foreignField: '_id',
                                    as: 'lines'
                              }
                        },
                        { $project: { _id: 0, order_id: 1, lines: 1 } }
                  ];
                  const result = await this.service.aggregate(pipeline);
                  responceJson(res, 200, result);
            } catch (e) {
                  responceJson(res, 400, []);
                  next(e);
            }
      }

      async getDetailByID(req, res, next) {
            try {
                  const { id } = req.query;
                  if(id){
                        const fulfillment = await this.service.getDetailByID(Number(id));
                        responceJson(res, 200, fulfillment);
                  }else{
                        responceJson(res, 400, {error: 'Bad params'})
                  }
            } catch (e) {
                  console.log(e);
                  responceJson(res, 400, {error: e});
                  next(e);
            }
      }
}
export default new FulfillmentController(FulfillmentService);
