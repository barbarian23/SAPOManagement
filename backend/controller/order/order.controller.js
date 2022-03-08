import IController from "../icontroller";
import { OrderService } from "../../service";
import { responceJson } from '../../util';

class OrderController extends IController {
      constructor(service) {
            super(service);
      }

      async searchLineItems(req, res, next) {
            try {
                  const { page, pageSize, keyword, sortBy, startDate, endDate, status } = req.query;
                  let _skip = page > 0 ? (Number(page) - 1) * Number(pageSize) : 0;
                  let _limit = pageSize ? Number(pageSize) : 10;
                  let _sortBy = sortBy ? sortBy : {created_time: -1};
                  
                  let _keyword = keyword ? keyword : null;
                  let _startDate = startDate ? startDate : null;
                  let _endDate = endDate ? endDate : null;
                  let _status = status ? status : null;
                  let orQueries = [];
                  
                  let pipeline = [
                        {
                              $lookup: {
                                    from: 'lineitems',
                                    localField: 'line_items',
                                    foreignField: '_id',
                                    as: 'items'
                              }
                        },
                        { $unwind : "$items" },
                        { $project: { 
                              _id: 0, 
                              order_id: {$toString: "$id"}, 
                              created_at: 1, 
                              sku: "$items.sku",
                              status: "$items.status",
                        }},
                  ];
                  
                  if(_keyword){
                        orQueries.push({sku: {$regex: `.*${_keyword}.*`,  $options: 'i' }});
                        orQueries.push({order_id: {$regex: `.*${_keyword}.*`}});
                  }
                  if(_status){
                        orQueries.push({status: _status});
                  }

                  if(orQueries.length > 0){
                        pipeline.push({$match: {$or: orQueries}});
                  }
                  
                  pipeline = [
                        ...pipeline,
                        // { $sort: _sortBy },
                        { $skip: _skip},
                        { $limit: _limit }
                  ];
                  const result = await this.service.aggregate(pipeline);
                  responceJson(res, 200, result);
            } catch (e) {
                  responceJson(res, 400, []);
                  next(e);
            }
      }
}
export default new OrderController(OrderService);
