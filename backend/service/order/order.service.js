import Mongoose from "../../model";

export default class OrderService {

  static instance = null;

  static getInstance(){
    if(OrderService.instance == null){
      OrderService.instance = new OrderService();
    }
  }

  static insert(obj){ 
    return Mongoose.getOrder().insert(obj);
  }

  static insertMany(objs){ 
    return Mongoose.getOrder().insertMany(objs);
  }

  static update(filter, update, upsert = false){ 
    return Mongoose.getOrder().findOneAndUpdate(filter, update, {
      new: true,
      upsert: upsert
    });
  }

  static deleteMany(obj){
    return Mongoose.getLineItem().deleteMany(obj);
  }

  static find(obj){
    return Mongoose.getOrder().find(obj);
  }
  
}
