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
                  let _sortBy = sortBy ? sortBy : 'created_at';
                  
                  let _keyword = keyword ? keyword : null;
                  let _startDate = startDate ? Number(startDate) : 0;
                  let _endDate = endDate ? Number(endDate) : 0;
                  let _status = status ? status : null;
                  let orQueries = [];
                  let andQueries = [];
                  
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

                  if(_startDate > 0 && _endDate > 0){
                        let start = new Date(_startDate);
                        let end = new Date(_endDate);
                        andQueries.push({ created_at: {$gte: start.toISOString()} });
                        andQueries.push({ created_at: {$lte: end.toISOString()} });
                  }

                  if(andQueries.length > 0){
                        pipeline.push({$match: {$and: andQueries}});
                  }

                  if(_startDate == 0 || _endDate == 0){
                        if(_sortBy == 'created_at'){
                              pipeline.push({ $sort: {created_at: 1} });
                        }else if (_sortBy == '-created_at'){
                              pipeline.push({ $sort: {created_at: -1} });
                        }
                  }
                  
                  const total = await this.service.aggregateCount(pipeline);
                  pipeline = [
                        ...pipeline,
                        { $skip: _skip},
                        { $limit: _limit }
                  ];
                  const lineItems = await this.service.aggregate(pipeline);
                  responceJson(res, 200, {
                        items: lineItems,
                        total: total
                  });
            } catch (e) {
                  responceJson(res, 400, []);
                  next(e);
            }
      }

      async searchLineItemsBySKU(req, res, next) {
            try {
                  const { sku, keyword } = req.query;
                  let _sku = sku ? sku : null;
                  let _keyword = keyword ? keyword : null;
                  
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
                        {
                              $lookup: {
                                    from: 'machines',
                                    localField: 'items.machine_id',
                                    foreignField: '_id',
                                    as: 'machine'
                              }
                        },
                        { $unwind : "$machine" },
                        { $project: { 
                              order_id: {$toString: "$id"}, 
                              sku: "$items.sku",
                              machine_id: "$items.machine_id",
                              machine_code: "$machine.code",
                              machine_name: "$machine.name",
                              process_time: "$items.process_time",
                              status: "$items.status",
                        }},
                        { $match: {sku: _sku}},
                  ];
                  
                  if(_keyword){
                        pipeline.push({
                              $match: {
                                    order_id: {$regex: `.*${_keyword}.*`,  $options: 'i' }
                              }
                        });
                  }

                  const lineItems = await this.service.aggregate(pipeline);
                  responceJson(res, 200, lineItems);
            } catch (e) {
                  responceJson(res, 400, []);
                  next(e);
            }
      }
}
export default new OrderController(OrderService);
