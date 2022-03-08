import Mongoose from "../../model";

export default class OrderService {

  static instance = null;

  static getInstance(){
    if(OrderService.instance == null){
      OrderService.instance = new OrderService();
    }
  }

  static insert(obj){  // {id: "123", lineitem: []}
    return Mongoose.getInstance().getOrder().insert(obj);
  }

  static insertMany(objs){ 
    return Mongoose.getInstance().getOrder().insertMany(objs);
  }

  static find(obj){
    return Mongoose.getInstance().getOrder().find(obj);
  }
  
}
