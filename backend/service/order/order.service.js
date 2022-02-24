// const autoBind = require('auto-bind');

import {Order} from '../../model';

export default class OrderService {
  static getInstance() {
    if (!this.instance) {
      this.instance = new OrderService();
    }
    return this.instance
  }

  async getAll(query={}) {
    // let { skip, limit, sortBy } = query;

    // skip = skip ? Number(skip) : 0;
    // limit = limit ? Number(limit) : 10;
    // sortBy = sortBy ? sortBy : { createdAt: -1 };

    // delete query.skip;
    // delete query.limit;
    // delete query.sortBy;

    // if (query._id) {
    //   try {
    //     query._id = new mongoose.mongo.ObjectId(query._id);
    //   } catch (error) {
    //     throw new Error('Not able to generate mongoose id with content');
    //   }
    // }
    try {
      let items = await Order
        .find(query);
        // .sort(sortBy)
        // .skip(skip)
        // .limit(limit);

      let total = await Order.countDocuments(query);

      // return new HttpResponse(items, {totalCount: total});
      return {
        items: items,
        totalCount: total
      }
    } catch (errors) {
      throw errors;
    }
  }

  async insert(obj){
      return Order.insert(obj);
    }

  async getAllOrder(){
      console.log("get all order");
      await Order.find({ id: 450789469 }).then(res => {
        console.log(res);
        return res;
      }).catch(err => {
        console.log(err);
      });
    }

  async updateOrder(body){

    }
  }

