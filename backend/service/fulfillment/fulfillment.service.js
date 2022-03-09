import Mongoose from "../../model";

export default class FulfillmentService {

  static instance = null;

  static getInstance(){
    if(FulfillmentService.instance == null){
      FulfillmentService.instance = new FulfillmentService();
    }
  }

  static insert(obj){ 
    return Mongoose.getFulfillment().insert(obj);
  }

  static insertMany(objs){ 
    return Mongoose.getFulfillment().insertMany(objs);
  }

  static update(filter, update, upsert = false){ 
    return Mongoose.getFulfillment().findOneAndUpdate(filter, update, {
      new: true,
      upsert: upsert
    });
  }

  static deleteMany(obj){
    return Mongoose.getLineItem().deleteMany(obj);
  }

  static find(obj){
    return Mongoose.getFulfillment().find(obj);
  }
  
}
