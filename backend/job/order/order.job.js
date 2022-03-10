import { OrderService, LineItemService, FulfillmentService } from "../../service";
import fetch from 'node-fetch';

const Order = function (schedule) {
    var cronExpress = '*/10 * * * * * *';
    var j = schedule.scheduleJob(cronExpress, function(fireDate){
        console.log(fireDate);
        let orderCreatedLast = OrderService.find().sort({created_at: -1}).skip(0).limit(1).exec();
        let createdLast = orderCreatedLast.created_at;

        let orderUpdatedLast = OrderService.find().sort({updated_at: -1}).skip(0).limit(1).exec();
        let updatedLast = orderUpdatedLast.updated_at;

        let headers = {
            Authorization: 'Bearer DCB2CD2B008A38320715C11F2CB8E6067A3E5E3FF675C8CB6FBD51214EE74BF9'
        };
        let urlGetOrder = new URL('https://apis.haravan.com/com/orders.json');

        /* Create Order */
        let params = { created_at_min: createdLast };
        urlGetOrder.search = new URLSearchParams(params).toString();

        let response = fetch(urlGetOrder, { method: 'GET', headers: headers });
        let data = response.json();

        if(data.orders && data.orders.length > 0){
            data.orders.forEach(order => {
                let orderResult = OrderService.insert(order);

                order.line_items.order_id = order.id;
                let lineItemResult = LineItemService.insertMany(order.line_items);
                let fulfillmentResult = FulfillmentService.insertMany(order.fulfillments);
            });
        }

        /* Update Order */
        params = { updated_at_min: updatedLast };
        urlGetOrder.search = new URLSearchParams(params).toString();

        response = fetch(urlGetOrder, { method: 'GET', headers: headers });
        data = response.json();

        if(data.orders && data.orders.length > 0){
            data.orders.forEach(order => {
                let orderResult = OrderService.update({id: order.id}, order, true);
                
                if(order.line_items && order.line_items.length > 0){
                    let lineItemResult = LineItemService.deleteMany({
                        id: { "$nin": order.line_items.map(x => x.id) },
                        order_id: order.id
                    });
                    order.line_items.forEach(line_item => {
                        line_item.order_id = order.id;
                        lineItemResult = LineItemService.update({id: line_item.id}, line_item, true);
                    });
                }
                
                if(order.fulfillments && order.fulfillments.length > 0){
                    let fulfillmentResult = FulfillmentService.deleteMany({
                        id: { "$nin": order.fulfillments.map(x => x.id) },
                        order_id: order.id
                    });
                    order.fulfillments.forEach(fulfillment => {
                        fulfillmentResult = FulfillmentService.update({id: fulfillment.id}, fulfillment, true);
                    });
                }
            });
        }

    });
}
export default Order;