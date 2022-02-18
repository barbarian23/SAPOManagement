import Order from "./order/order.model";

const mongoose = require('mongoose');

export default class Mongoose {

  static instance = null;

  static getInstance() {
    if (!Mongoose.instance) {
      Mongoose.instance = new Mongoose();
      mongoose.connect('mongodb://SAPODB:Quang4310$@localhost:27017/tenDB')
    }
    return Mongoose.instance;
  }

  getOrder() {
    return new Order(mongoose);
  }
  //Mongoose.getInstance().getOrder().save({someObj});

}