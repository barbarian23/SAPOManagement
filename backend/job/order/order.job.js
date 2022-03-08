import { OrderService, LineItemService, FulfillmentService } from "../../service";
import fetch from 'node-fetch';

const Order = function (schedule) {
    var cronExpress = '*/10 * * * * * *';
    var j = schedule.scheduleJob(cronExpress, function(fireDate){
        console.log(fireDate);
        let orderCreatedLast = await OrderService.getInstance().find().sort({created_at: -1}).skip(0).limit(1).exec();
        let createdLast = orderCreatedLast.created_at;

        let orderUpdatedLast = await OrderService.getInstance().find().sort({updated_at: -1}).skip(0).limit(1).exec();
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

        if(data.orders && data.orders.length > 0){
            data.orders.forEach(order => {
                let orderResult = await OrderService.insert(order);
                let lineItemResult = await LineItemService.insertMany(order.line_items);
                let fulfillmentResult = await FulfillmentService.insertMany(order.fulfillments);
            });
        }

        /* Update Order */
        params = { updated_at_min: updatedLast };
        urlGetOrder.search = new URLSearchParams(params).toString();

        response = await fetch(urlGetOrder, { method: 'GET', headers: headers });
        data = await response.json();


    });
}
export default Order;