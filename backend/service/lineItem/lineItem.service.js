import Mongoose from "../../model";

export default class LineItemService {

  static instance = null;

  static getInstance(){
    if(LineItemService.instance == null){
      LineItemService.instance = new LineItemService();
    }
  }

  static insert(obj){  // {id: "123", lineitem: []}
    return Mongoose.getLineItem().insert(obj);
  }

  static insertMany(objs){ 
    return Mongoose.getLineItem().insertMany(objs);
  }

  static update(filter, update, upsert = false){ 
    return Mongoose.getLineItem().findOneAndUpdate(filter, update, {
      new: true,
      upsert: upsert
    });
  }

  static deleteMany(obj){
    return Mongoose.getLineItem().deleteMany(obj);
  }

  static find(obj){
    return Mongoose.getLineItem().find(obj);
  }
  
}
