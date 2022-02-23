// import Order from "./order/order.model";
// import {
//   mydemo
// } from "./dbconfig";
// const ps = require('pg');

// export default class Postgres {

//   static getInstance() {
//     if (!this.instance) {
//       this.instance = new Postgres();
//     }
//     return this.instance;
//   }

//   async dbconnect() {
//     return new Promise((resolve, reject) => {
//       let client = new ps.Client(mydemo)
//       client.connect((err) => {
//         if (err) {
//           reject(err);
//         } else {
//           resolve(client);
//         }
//       })
//     })
//   }

//   async execute(client, query) {

//     return new Promise((resolve, reject) => {
//       console.log("execute script")
//       return client.query(query, (err, res) => {
//         if (err) {
//           console.error(err);
//           return;
//         }
//         resolve(res.rows);
//         client.end();
//       });
//     });
//   }

//   async getAll(tablename, engine) {
//     // console.log()
//     let sql = "select * from public." + tablename;
//     console.log("sql " + sql);
//     let result = await Postgres.getInstance().execute(engine, sql);
//     return result;
//   }

// }

const Sequelize = require('sequelize');
import {
  mydemo
} from "./dbconfig";
export function sequelize() {
  var sequelize = new Sequelize(mydemo.database, mydemo.user, mydemo.password, {
    host: mydemo.host,
    dialect: 'postgres',
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    },
  });

  var Order = sequelize.define('Order', {
    id: {
      type: Sequelize.STRING,
      primaryKey: true
    },
    id_product: Sequelize.STRING,
    amount: Sequelize.INTEGER,
    name_product: Sequelize.STRING,
    status: Sequelize.STRING
  }, {
    tableName: 'order'
  });

  var Product = sequelize.define("Product", {
    id: {
      type: Sequelize.STRING,
      primaryKey: true
    },
    name: Sequelize.STRING,
    price: Sequelize.INTEGER,
    notice: Sequelize.STRING
  }, {
    tableName: 'product'
  })

  var result = Order.findAll();
  return result;
}