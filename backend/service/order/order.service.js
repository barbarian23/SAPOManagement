import Order from '../../model/order/order.model';

export default class OrderService {
  static getInstance(){
    if(!this.instance){
      this.instance = new OrderService();
    }
    return this.instance
  }

  async insert(obj){
    return Order.insert(obj);
  }

  async getAllOrder(){
    console.log("get all order");
    await Order.find({id:450789469}).then(res=>{
      console.log(res);
      return res;
    }).catch(err=>{
      console.log(err);
    });
  }

  async updateOrder(body){
    
  }
}

