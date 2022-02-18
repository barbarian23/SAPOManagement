import Order from "./order/order.model";

const mongoose = require('mongoose');

export default class Mongoose {

  static instance = null;

  static {
    let db = mongoose.connect('mongodb://localhost:27017/admin');
    mongoose.connection.on("open", function(ref) {
      console.log("Connected to mongo server.");
    });
    
    mongoose.connection.on("error", function(err) {
      console.log("Could not connect to mongo server!");
    });

    //tao mot danh sach cac model
    Mongoose.Order = Order(mongoose);
    
  }

  static getInstance() {
    if (!Mongoose.instance) {
      Mongoose.instance = new Mongoose();
    }
    return Mongoose.instance;
  }

  getOrder() {
    return Mongoose.Order;
  }
  //Mongoose.getInstance().getOrder().save({someObj});

}