import Mongoose from "../../model";

export default class FulfillmentService {

  static instance = null;

  static getInstance(){
    if(FulfillmentService.instance == null){
      FulfillmentService.instance = new FulfillmentService();
    }
  }

  static insert(obj){  // {id: "123", lineitem: []}
    return Mongoose.getInstance().getFulfillment().insert(obj);
  }

  static insertMany(objs){ 
    return Mongoose.getInstance().getFulfillment().insertMany(objs);
  }

  static find(obj){
    return Mongoose.getInstance().getFulfillment().find(obj);
  }
  
}
