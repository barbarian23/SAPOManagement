import { Types } from 'mongoose';
import IService from '../iservice';
import { Order } from '../../model';

class OrderService extends IService {
  constructor(model) {
    super(model);
  }

  async getByOrderNumber(orderNumber) {
    try {
      let item = await this.model.findOne({ order_number: orderNumber });
      if (item) {
        return item;
      }
      return null;
    } catch (errors) {
      throw errors;
    }
  }

  async searchPagingOrders(page, pageSize, keyword, sortBy, startDate, endDate, status) {
    try {
      let skip = page > 0 ? (Number(page) - 1) * Number(pageSize) : 0;
      let limit = pageSize ? Number(pageSize) : 10;
      let orQueries = [];
      let andQueries = [];

      let pipeline = [
        {
          $lookup: {
            from: 'fulfillments',
            localField: 'id',
            foreignField: 'order_id',
            as: 'fulfillments'
          }
        },
        { $addFields: { fulfillment: { $first: "$fulfillments" } } },
        // { $unwind: { path: "$fulfillment", preserveNullAndEmptyArrays: true } },
        {
          $project: {
            _id: 0,
            id: { $toString: "$id" },
            confirmed_at: 1,
            created_at: 1,
            cancelled_at : 1,
            order_number: 1,
            status: 1,
            fulfillment: 1,
            fulfillment_status: "$fulfillment.status",
            fulfillment_id: "$fulfillment.id",
            is_printed: { $ifNull: ["$is_printed", false] },
          }
        },
        {
          $match: {
            cancelled_at: null 
          },
        },
      ];

      if (keyword) {
        //replace [ ] { } ( ) \ ^ $ . | ? * +
        const replaceArr = ["[", "]", "{", "}", "(", ")", "\\", "^", "$", ".", "|", "?", "*", "+"];
        for (let i = 0; i < replaceArr.length; i++) {
          keyword = keyword.replace(replaceArr[i], '\\' + replaceArr[i]);
        }
        orQueries.push({ order_number: { $regex: `.*${keyword}.*` } });
      }

      if (orQueries.length > 0) {
        pipeline.push({ $match: { $or: orQueries } });
      }

      if (startDate > 0 && endDate > 0) {
        let start = new Date(startDate);
        let end = new Date(endDate);
        andQueries.push({ created_at: { $gte: start } });
        andQueries.push({ created_at: { $lte: end } });
      }

      if (status) {
        if(status === 'PRINTED'){
          andQueries.push({ is_printed: true });
        }else{
          andQueries.push({ status: status });
        }
      }

      if (andQueries.length > 0) {
        pipeline.push({ $match: { $and: andQueries } });
      }

      // if (startDate == 0 || endDate == 0) {
      if (sortBy == 'created_at') {
        pipeline.push({ $sort: { created_at: 1 } });
      } else //if (sortBy == '-confirmed_at') 
      {
        pipeline.push({ $sort: { created_at: -1 } });
      }
      // }

      pipeline = [
        ...pipeline,
        { $skip: skip },
        { $limit: limit }
      ];
      const orders = await this.aggregate(pipeline);
      return orders;
    } catch (errors) {
      console.log(errors);
      throw errors;
    }
  }

  async countOrders(keyword, startDate, endDate, status) {
    try {
      let orQueries = [];
      let andQueries = [];

      let pipeline = [
        {
          $project: {
            _id: 0,
            id: { $toString: "$order_number" },
            created_at: 1,
            confirmed_at: 1,
            cancelled_at : 1,
            status: 1,
          }
        },
        {
          $match: {
            cancelled_at: null 
          },
        },
      ];

      if (keyword) {
        //replace [ ] { } ( ) \ ^ $ . | ? * +
        const replaceArr = ["[", "]", "{", "}", "(", ")", "\\", "^", "$", ".", "|", "?", "*", "+"];
        for (let i = 0; i < replaceArr.length; i++) {
          keyword = keyword.replace(replaceArr[i], '\\' + replaceArr[i]);
        }
        orQueries.push({ id: { $regex: `.*${keyword}.*` } });
      }

      if (orQueries.length > 0) {
        pipeline.push({ $match: { $or: orQueries } });
      }

      if (startDate > 0 && endDate > 0) {
        let start = new Date(startDate);
        let end = new Date(endDate);
        andQueries.push({ created_at: { $gte: start } });
        andQueries.push({ created_at: { $lte: end } });
      }

      if (status) {
        andQueries.push({ status: status });
      }

      if (andQueries.length > 0) {
        pipeline.push({ $match: { $and: andQueries } });
      }

      const count = await this.aggregateCount(pipeline);
      return count;
    } catch (errors) {
      console.log(errors);
      throw errors;
    }
  }

  async getOrdersByLineItemID(lineItemID) {
    try {
      let pipeline = [
        {
          $lookup: {
            from: 'lineitems',
            localField: 'line_items',
            foreignField: '_id',
            as: 'items'
          }
        },
        { $unwind: "$items" },
        {
          $project: {
            _id: 0,
            lineitem_id: "$items._id",
            order_number: 1,
            status: 1,
          },
        },
        {
          $match: {
            lineitem_id: lineItemID,
          },
        },
      ];

      const orders = await this.aggregate(pipeline);
      return orders;
    } catch (errors) {
      console.log(errors);
      throw errors;
    }
  }

  async searchPagingLineItems(page, pageSize, keyword, sortBy, startDate, endDate, status) {
    try {
      let skip = page > 0 ? (Number(page) - 1) * Number(pageSize) : 0;
      let limit = pageSize ? Number(pageSize) : 10;
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
        { $unwind: "$items" },
        {
          $project: {
            _id: 0,
            id: "$items._id",
            order_number: 1,
            confirmed_at: 1,
            created_at: 1,
            cancelled_at : 1,
            sku: "$items.sku",
            name: "$items.name",
            title: "$items.title",
            status: "$items.status",
            qty_onhand: "$items.qty_onhand",
            quantity: "$items.quantity",
          },
        },
        {
          $match: {
            cancelled_at: null,
          },
        },
      ];

      if (keyword) {
        //replace [ ] { } ( ) \ ^ $ . | ? * +
        const replaceArr = ["[", "]", "{", "}", "(", ")", "\\", "^", "$", ".", "|", "?", "*", "+"];
        for (let i = 0; i < replaceArr.length; i++) {
          keyword = keyword.replace(replaceArr[i], '\\' + replaceArr[i]);
        }
        orQueries.push({ sku: { $regex: `.*${keyword}.*`, $options: 'i' } });
        orQueries.push({ order_number: { $regex: `.*${keyword}.*`, $options: 'i' } });
        orQueries.push({ title: { $regex: `.*${keyword}.*`, $options: 'i' } });
      }

      if (orQueries.length > 0) {
        pipeline.push({ $match: { $or: orQueries } });
      }

      console.log(orQueries);

      if (startDate > 0 && endDate > 0) {
        let start = new Date(startDate);
        let end = new Date(endDate);
        andQueries.push({ created_at: { $gte: start } });
        andQueries.push({ created_at: { $lte: end } });
      }

      if (status) {
        andQueries.push({ status: status });
      }
      // console.log(andQueries);

      if (andQueries.length > 0) {
        pipeline.push({ $match: { $and: andQueries } });
      }

      //if (startDate == 0 || endDate == 0) {
      if (sortBy == 'created_at') {
        pipeline.push({ $sort: { created_at: 1 } });
      } else //if (sortBy == '-confirmed_at') 
      {
        pipeline.push({ $sort: { created_at: -1 } });
      }
      //}

      // console.log(pipeline)

      pipeline = [
        ...pipeline,
        { $skip: skip },
        { $limit: limit }
      ];
      const lineItems = await this.aggregate(pipeline);
      return lineItems;
    } catch (errors) {
      console.log(errors);
      throw errors;
    }
  }

  async countLineItems(keyword, startDate, endDate, status) {
    try {
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
        { $unwind: "$items" },
        {
          $project: {
            _id: 0,
            id: "$items._id",
            order_number: 1,
            confirmed_at: 1,
            created_at: 1,
            cancelled_at: 1,
            sku: "$items.sku",
            name: "$items.name",
            title: "$items.title",
            status: "$items.status",
            qty_onhand: "$items.qty_onhand",
            quantity: "$items.quantity",
          }
        },
        {
          $match: {
            cancelled_at: null,
          },
        },
      ];

      if (keyword) {
        //replace [ ] { } ( ) \ ^ $ . | ? * +
        const replaceArr = ["[", "]", "{", "}", "(", ")", "\\", "^", "$", ".", "|", "?", "*", "+"];
        for (let i = 0; i < replaceArr.length; i++) {
          keyword = keyword.replace(replaceArr[i], '\\' + replaceArr[i]);
        }
        orQueries.push({ sku: { $regex: `.*${keyword}.*`, $options: 'i' } });
        orQueries.push({ order_number: { $regex: `.*${keyword}.*`, $options: 'i' } });
        orQueries.push({ title: { $regex: `.*${keyword}.*`, $options: 'i' } });
      }

      if (orQueries.length > 0) {
        pipeline.push({ $match: { $or: orQueries } });
      }

      if (startDate > 0 && endDate > 0) {
        let start = new Date(startDate);
        let end = new Date(endDate);
        andQueries.push({ created_at: { $gte: start } });
        andQueries.push({ created_at: { $lte: end } });
      }

      if (status) {
        andQueries.push({ status: status });
      }

      if (andQueries.length > 0) {
        pipeline.push({ $match: { $and: andQueries } });
      }

      const count = await this.aggregateCount(pipeline);
      return count;
    } catch (errors) {
      console.log(errors);
      throw errors;
    }
  }

  async getLineItemsBySKU(sku, status = '', keyword = '') {
    try {
      let pipeline = [
        {
          $lookup: {
            from: 'lineitems',
            localField: 'line_items',
            foreignField: '_id',
            as: 'items'
          }
        },
        { $unwind: "$items" },
        {
          $lookup: {
            from: 'machines',
            localField: 'items.machine_id',
            foreignField: '_id',
            as: 'machine'
          }
        },
        { $unwind: { path: "$machine", preserveNullAndEmptyArrays: true } },
        {
          $project: {
            _id: 0,
            order_number: 1,
            sku: "$items.sku",
            name: "$items.name",
            title: "$items.title",
            quantity: "$items.quantity",
            machine_id: { $ifNull: ["$items.machine_id", ""] },
            machine_code: { $ifNull: ["$items.code", ""] },
            machine_name: { $ifNull: ["$items.name", ""] },
            process_time: { $ifNull: ["$items.process_time", null] },
            status: { $ifNull: ["$items.status", "NOT"] },
            id: "$items._id",
          }
        },
        { $match: { sku: sku } },
      ];

      if (keyword) {
        pipeline.push({
          $match: {
            order_number: { $regex: `.*${keyword}.*`, $options: 'i' }
          }
        });
      }

      if (status) {
        pipeline.push({ $match: { status: status } })
      }

      const lineItems = await this.aggregate(pipeline);
      return lineItems;
    } catch (errors) {
      console.log(errors);
      throw errors;
    }
  }

  async getLineItemsByID(id, status = '', keyword = '') {
    try {
      let pipeline = [
        {
          $lookup: {
            from: 'lineitems',
            localField: 'line_items',
            foreignField: '_id',
            as: 'items'
          }
        },
        { $unwind: "$items" },
        {
          $lookup: {
            from: 'machines',
            localField: 'items.machine_id',
            foreignField: '_id',
            as: 'machine'
          }
        },
        { $unwind: { path: "$machine", preserveNullAndEmptyArrays: true } },
        {
          $project: {
            _id: 0,
            order_number: 1,
            sku: "$items.sku",
            name: "$items.name",
            quantity: "$items.quantity",
            machine_id: { $ifNull: ["$items.machine_id", ""] },
            machine_code: { $ifNull: ["$items.code", ""] },
            machine_name: { $ifNull: ["$items.name", ""] },
            process_time: { $ifNull: ["$items.process_time", null] },
            status: { $ifNull: ["$items.status", "NOT"] },
            id: "$items._id",
          }
        },
        {
          $match: { id: Types.ObjectId(id) }
        }
      ];

      if (keyword) {
        pipeline.push({
          $match: {
            order_number: { $regex: `.*${keyword}.*`, $options: 'i' }
          }
        });
      }

      if (status) {
        pipeline.push({ $match: { status: status } })
      }

      const lineItems = await this.aggregate(pipeline);
      return lineItems;
    } catch (errors) {
      console.log(errors);
      throw errors;
    }
  }

  async isAllLineItemsDone(orderNumber) {
    let pipeline = [
      {
        $lookup: {
          from: 'lineitems',
          localField: 'line_items',
          foreignField: '_id',
          as: 'items'
        }
      },
      { $unwind: "$items" },
      {
        $project: {
          _id: 0,
          id: "$items._id",
          order_number: 1,
          confirmed_at: 1,
          sku: "$items.sku",
          status: "$items.status",
        }
      },
      {
        $match: {
          $and: [
            { order_number: orderNumber },
            { status: "NOT" }
          ]
        }
      },
    ];

    const count = await this.aggregateCount(pipeline);
    if (count > 0) {
      return false;
    } else {
      return true;
    }
  }

  async setStatusDone(orderNumber) {
    try {
      let order = await this.getByOrderNumber(orderNumber);
      if (order) {
        order.status = 'DONE';
        let result = order.save();
        return result;
      } else {
        // no order
        return null;
      }
    } catch (errors) {
      console.log(errors);
      throw errors;
    }
  }

  async setStatusNot(orderNumber) {
    try {
      let order = await this.getByOrderNumber(orderNumber);
      if (order) {
        order.status = 'NOT';
        let result = order.save();
        return result;
      }
      // no order
      return null;
    } catch (errors) {
      console.log(errors);
      throw errors;
    }
  }

  async setPrintedDone(orderNumber) {
    try {
      let order = await this.getByOrderNumber(orderNumber);
      if (order) {
        order.is_printed = true;
        let result = order.save();
        return result;
      } else {
        // no order
        return null;
      }
    } catch (errors) {
      console.log(errors);
      throw errors;
    }
  }

  async setPrintedNot(orderNumber) {
    try {
      let order = await this.getByOrderNumber(orderNumber);
      if (order) {
        order.is_printed = false;
        let result = order.save();
        return result;
      } else {
        // no order
        return null;
      }
    } catch (errors) {
      console.log(errors);
      throw errors;
    }
  }
}

export default new OrderService(Order);