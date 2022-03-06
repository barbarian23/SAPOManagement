import Order from "./order/order.job";

const schedule = require('node-schedule');

export default class Schedule{
    
  static instance = null;

  static {
    Schedule.Order = Order(schedule);
  }

  static getInstance() {
    if (!Schedule.instance) {
        Schedule.instance = new Schedule();
    }
    return Schedule.instance;
  }

  getOrderJob() {
    return Schedule.Order;
  }
}