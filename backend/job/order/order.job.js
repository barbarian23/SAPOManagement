import { OrderService, LineItemService, FulfillmentService } from "../../service";
import fetch from 'node-fetch';
const schedule = require('node-schedule');

const Order = function () {
    var cronExpress = '10 * * * * *';
    var j = schedule.scheduleJob(cronExpress, async function(fireDate){
        console.log("hehe");
        console.log(fireDate);
        let orderCreatedLast = await OrderService.find().sort({created_at: -1}).skip(0).limit(1).exec();
        let createdLast = orderCreatedLast.created_at;

        let orderUpdatedLast = await OrderService.find().sort({updated_at: -1}).skip(0).limit(1).exec();
        let updatedLast = orderUpdatedLast.updated_at;

        let headers = {
            Authorization: 'Bearer DCB2CD2B008A38320715C11F2CB8E6067A3E5E3FF675C8CB6FBD51214EE74BF9'
        };
        let urlGetOrder = new URL('https://apis.haravan.com/com/orders.json');

        /* Create Order */
        let params = { created_at_min: createdLast };
        urlGetOrder.search = new URLSearchParams(params).toString();

        let response = await fetch(urlGetOrder, { method: 'GET', headers: headers });
        let data = await response.json();

        console.log(data.orders.length, "Create orders length");
        if(data.orders && data.orders.length > 0){
            data.orders.forEach(async order => {
                let orderResult = await OrderService.insert(order);

                order.line_items.order_id = order.id;
                let lineItemResult = await LineItemService.insertMany(order.line_items);
                let fulfillmentResult = await FulfillmentService.insertMany(order.fulfillments);
            });
        }

        /* Update Order */
        params = { updated_at_min: updatedLast };
        urlGetOrder.search = new URLSearchParams(params).toString();

        response = await fetch(urlGetOrder, { method: 'GET', headers: headers });
        data = await response.json();

        console.log(data.orders.length, "Update orders length");
        if(data.orders && data.orders.length > 0){
            data.orders.forEach(async order => {
                let orderResult = await OrderService.update({id: order.id}, order, true);
                
                if(order.line_items && order.line_items.length > 0){
                    let lineItemResult = await LineItemService.deleteMany({
                        id: { "$nin": order.line_items.map(x => x.id) },
                        order_id: order.id
                    });
                    order.line_items.forEach(async line_item => {
                        line_item.order_id = order.id;
                        lineItemResult = await LineItemService.update({id: line_item.id}, line_item, true);
                    });
                }
                
                if(order.fulfillments && order.fulfillments.length > 0){
                    let fulfillmentResult = await FulfillmentService.deleteMany({
                        id: { "$nin": order.fulfillments.map(x => x.id) },
                        order_id: order.id
                    });
                    order.fulfillments.forEach(async fulfillment => {
                        fulfillmentResult = await FulfillmentService.update({id: fulfillment.id}, fulfillment, true);
                    });
                }
            });
        }
    });
}
export default Order;