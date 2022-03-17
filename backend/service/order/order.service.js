import { Types } from 'mongoose';
import IService from '../iservice';
import { Order } from '../../model';

class OrderService extends IService {
  constructor(model) {
    super(model);
  }

  async searchPagingOrders(page, pageSize, keyword, sortBy, startDate, endDate, status) {
    try {
      let skip = page > 0 ? (Number(page) - 1) * Number(pageSize) : 0;
      let limit = pageSize ? Number(pageSize) : 10;
      let orQueries = [];
      let andQueries = [];

      let pipeline = [
        {
          $project: {
            _id: 0,
            id: { $toString: "$order_number" },
            confirmed_at: 1,
            status: 1,
          }
        },
        {
          $match: {
            confirmed_at: { $ne: null },
          },
        },
      ];

      if (keyword) {
        orQueries.push({ id: { $regex: `.*${keyword}.*` } });
      }
      if (status) {
        orQueries.push({ status: status });
      }

      if (orQueries.length > 0) {
        pipeline.push({ $match: { $or: orQueries } });
      }

      if (startDate > 0 && endDate > 0) {
        let start = new Date(startDate);
        let end = new Date(endDate);
        andQueries.push({ confirmed_at: { $gte: start.toISOString() } });
        andQueries.push({ confirmed_at: { $lte: end.toISOString() } });
      }

      if (andQueries.length > 0) {
        pipeline.push({ $match: { $and: andQueries } });
      }

      if (startDate == 0 || endDate == 0) {
        if (sortBy == 'confirmed_at') {
          pipeline.push({ $sort: { confirmed_at: 1 } });
        } else //if (sortBy == '-confirmed_at') 
        {
          pipeline.push({ $sort: { confirmed_at: -1 } });
        }
      }

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
            confirmed_at: 1,
            status: 1,
          }
        },
        {
          $match: {
            confirmed_at: { $ne: null },
          },
        },
      ];

      if (keyword) {
        orQueries.push({ id: { $regex: `.*${keyword}.*` } });
      }
      if (status) {
        orQueries.push({ status: status });
      }

      if (orQueries.length > 0) {
        pipeline.push({ $match: { $or: orQueries } });
      }

      if (startDate > 0 && endDate > 0) {
        let start = new Date(startDate);
        let end = new Date(endDate);
        andQueries.push({ confirmed_at: { $gte: start.toISOString() } });
        andQueries.push({ confirmed_at: { $lte: end.toISOString() } });
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
            sku: "$items.sku",
            name: "$items.name",
            status: "$items.status",
          },
        },
        {
          $match: {
            confirmed_at: { $ne: null },
          },
        },
      ];

      if (keyword) {
        orQueries.push({ sku: { $regex: `.*${keyword}.*`, $options: 'i' } });
        orQueries.push({ order_number: { $regex: `.*${keyword}.*`, $options: 'i' } });
      }
      if (status) {
        orQueries.push({ status: status });
      }

      if (orQueries.length > 0) {
        pipeline.push({ $match: { $or: orQueries } });
      }

      if (startDate > 0 && endDate > 0) {
        let start = new Date(startDate);
        let end = new Date(endDate);
        andQueries.push({ confirmed_at: { $gte: start.toISOString() } });
        andQueries.push({ confirmed_at: { $lte: end.toISOString() } });
      }

      if (andQueries.length > 0) {
        pipeline.push({ $match: { $and: andQueries } });
      }

      if (startDate == 0 || endDate == 0) {
        if (sortBy == 'confirmed_at') {
          pipeline.push({ $sort: { confirmed_at: 1 } });
        } else //if (sortBy == '-confirmed_at') 
        {
          pipeline.push({ $sort: { confirmed_at: -1 } });
        }
      }

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
            sku: "$items.sku",
            status: "$items.status",
          }
        },
        {
          $match: {
            confirmed_at: { $ne: null },
          },
        },
      ];

      if (keyword) {
        orQueries.push({ sku: { $regex: `.*${keyword}.*`, $options: 'i' } });
        orQueries.push({ order_number: { $regex: `.*${keyword}.*`, $options: 'i' } });
      }
      if (status) {
        orQueries.push({ status: status });
      }

      if (orQueries.length > 0) {
        pipeline.push({ $match: { $or: orQueries } });
      }

      if (startDate > 0 && endDate > 0) {
        let start = new Date(startDate);
        let end = new Date(endDate);
        andQueries.push({ confirmed_at: { $gte: start.toISOString() } });
        andQueries.push({ confirmed_at: { $lte: end.toISOString() } });
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

  async getLineItemsBySKU(sku, keyword) {
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
      const lineItems = await this.aggregate(pipeline);
      return lineItems;
    } catch (errors) {
      console.log(errors);
      throw errors;
    }
  }

  async getLineItemsByID(id, keyword) {
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
            machine_id: { $ifNull: ["$items.machine_id", ""] },
            machine_code: { $ifNull: ["$items.code", ""] },
            machine_name: { $ifNull: ["$items.name", ""] },
            process_time: { $ifNull: ["$items.process_time", null] },
            status: { $ifNull: ["$items.status", "NOT"] },
            id: "$items._id",
          }
        },
        { $match: { id: Types.ObjectId(id) } },
      ];

      if (keyword) {
        pipeline.push({
          $match: {
            order_number: { $regex: `.*${keyword}.*`, $options: 'i' }
          }
        });
      }
      const lineItems = await this.aggregate(pipeline);
      return lineItems;
    } catch (errors) {
      console.log(errors);
      throw errors;
    }
  }
}

export default new OrderService(Order);