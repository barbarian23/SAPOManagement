import OrderJob from "./order/order.job";

const schedule = require('node-schedule');

export default class Schedule{
    
  static instance = null;

  static {
    Schedule.Order = OrderJob(schedule);
  }

  static getInstance() {
    if (!Schedule.instance) {
        Schedule.instance = new Schedule();
    }
    return Schedule.instance;
  }

  static getOrderJob() {
    return Schedule.Order;
  }
}