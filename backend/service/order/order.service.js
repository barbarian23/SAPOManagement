// import Postgres from "../../model/index"

// export default class OrderService {

//   static getInstance(){
//     if(!this.instance){
//       this.instance = new OrderService();
//     }
//     return this.instance
//   }

//   async insert(obj){
//     return Mongoose.getInstance().getOrder().insert(obj);
//   }

//   async getAllOrder(){
//     let connect = await Postgres.getInstance().dbconnect();
//     let result = await Postgres.getInstance().getAll("order",connect)
//     return result;
//   }

//   async updateOrder(body){
    
//   }
// }


import {sequelize} from "../../model/index"

export default class OrderService {

  static getInstance(){
    if(!this.instance){
      this.instance = new OrderService();
    }
    return this.instance
  }

  async insert(obj){
    return Mongoose.getInstance().getOrder().insert(obj);
  }

  // async getAllOrder(){
  //   let connect = await Postgres.getInstance().dbconnect();
  //   let result = await Postgres.getInstance().getAll("order",connect)
  //   return result;
  // }

  async getAllOrder(){
    console.log("get all order")
    let result = sequelize();
    return result;
  }

  async updateOrder(body){
    
  }
}

