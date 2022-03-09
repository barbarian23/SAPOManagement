import Order from "./order/order.model";
import LineItem from "./lineItem/lineItem.model";
import Fulfillment from "./fulfillment/fulfillment.model";

const mongoose = require('mongoose');

export default class Mongoose {

  static instance = null;

  static {
    let db = mongoose.connect('mongodb://localhost:27017/SapoManagement');
    mongoose.connection.on("open", function(ref) {
      console.log("Connected to mongo server.");
    });
    
    mongoose.connection.on("error", function(err) {
      console.log("Could not connect to mongo server!");
    });

    //tao mot danh sach cac model
    Mongoose.Order = Order(mongoose);
    Mongoose.LineItem = LineItem(mongoose);
    Mongoose.Fulfillment = Fulfillment(mongoose);
  }

  static getInstance() {
    if (!Mongoose.instance) {
      Mongoose.instance = new Mongoose();
    }
    return Mongoose.instance;
  }

  static getOrder() {
    return Mongoose.Order;
  }

  static getLineItem() {
    return Mongoose.LineItem;
  }

  static getFulfillment() {
    return Mongoose.Fulfillment;
  }
  //Mongoose.getInstance().getOrder().save({someObj});

}