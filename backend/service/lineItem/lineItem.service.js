import Mongoose from "../../model";

export default class LineItemService {

  static instance = null;

  static getInstance(){
    if(LineItemService.instance == null){
      LineItemService.instance = new LineItemService();
    }
  }

  static insert(obj){  // {id: "123", lineitem: []}
    return Mongoose.getInstance().getLineItem().insert(obj);
  }

  static insertMany(objs){ 
    return Mongoose.getInstance().getLineItem().insertMany(objs);
  }

  static find(obj){
    return Mongoose.getInstance().getLineItem().find(obj);
  }
  
}
