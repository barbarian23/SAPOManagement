import { OrderService, LineItemService, FulfillmentService } from "../../service";
import fetch from 'node-fetch';
const schedule = require('node-schedule');

const Sleep = function (ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const Order = function () {
    var cronExpress = '2 * * * * *';
    var isRun = false;
    var j = schedule.scheduleJob(cronExpress, async function(fireDate){
        if(isRun){
            await Sleep(5000);
        }
        isRun = true;
        console.log(fireDate);

        let headers = {
            Authorization: 'Bearer D9CBEEF3950683AB7BF852A3BED03E35AD68C117825CEBA2F54CCF8F60786212'
        };
        let urlCountOrder = new URL('https://apis.haravan.com/com/orders/count.json');
        let urlGetOrder = new URL('https://apis.haravan.com/com/orders.json');

        /* Create Order */

        let orderCreatedLast = await OrderService.search(null, 0, 1, '-created_at');
        let createdLast = null;
        if(orderCreatedLast && orderCreatedLast.length > 0)
            createdLast = await orderCreatedLast[0].created_at;
        
        let params = { created_at_min: createdLast ? createdLast.toISOString() : null };
        
        urlCountOrder.search = new URLSearchParams(params).toString();
        let countResponse = await fetch(urlCountOrder, { method: 'GET', headers: headers });
        let countPages = parseInt(parseInt((await countResponse.json()).count) / 50) + 1;

        console.log(countPages, "Orders pages");
        for (let index = countPages; index > 0; index--){

            console.log(index, "Startindex");
            params.page = index;
            params.limit = 50;
            urlGetOrder.search = new URLSearchParams(params).toString();
            let response = await fetch(urlGetOrder, { method: 'GET', headers: headers });
            let data = await response.json();
    
            data.orders = data.orders.filter(obj => {
                return new Date(obj.created_at) > new Date(createdLast);
            });
    
            console.log(data.orders.length, "Create orders length");
            if(data.orders && data.orders.length > 0){
                data.orders.forEach(async order => {
                    order.line_items.forEach(async line_item => {
                        line_item.order_id = order.id;
                    });
                    let lineItemResults = await LineItemService.insertMany(order.line_items);
                    
                    order.fulfillments.forEach(async fulfillment => {
                        let result = lineItemResults.filter(async obj => {
                            return fulfillment.line_items.map(x => x.id).includes(obj.id);
                        });
                        fulfillment.line_items = result.map(x => x._id);
                    });
                    let fulfillmentResults = await FulfillmentService.insertMany(order.fulfillments);
    
                    order.line_items = lineItemResults.map(x => x._id);
                    order.fulfillments = fulfillmentResults.map(x => x._id);
                    let orderResult = await OrderService.insert(order);
                });
            }
    
            /* Update Order */
    
            let orderUpdatedLast = await OrderService.search(null, 0, 1, '-updated_at');
            let updatedLast = null
            if(orderUpdatedLast && orderUpdatedLast.length > 0)
                updatedLast = await orderUpdatedLast[0].updated_at;
            
            if(updatedLast){
                let params = { updated_at_min: updatedLast.toISOString() };
                urlGetOrder.search = new URLSearchParams(params).toString();
        
                let response = await fetch(urlGetOrder, { method: 'GET', headers: headers });
                let data = await response.json();
        
                data.orders = data.orders.filter(obj => {
                    return new Date(obj.updated_at) > new Date(updatedLast);
                });
    
                console.log(data.orders.length, "Update orders length");
                if(data.orders && data.orders.length > 0){
                    data.orders.forEach(async order => {
                        
                        let lineItemResults = [];
                        if(order.line_items && order.line_items.length > 0){
                            let lineItemDeletes = await LineItemService.deleteMany({
                                id: { "$nin": order.line_items.map(x => x.id) },
                                order_id: order.id
                            });
                            order.line_items.forEach(async line_item => {
                                line_item.order_id = order.id;
                                lineItemResults.push(await LineItemService.updateByField({id: line_item.id}, line_item));
                            });
                        }
    
                        order.line_items = lineItemResults.map(x => x._id);
                        
                        let fulfillmentResults = await FulfillmentService.searchAll({ order_id: order.id });
                        order.fulfillments = fulfillmentResults.map(x => x._id);
                        let orderResult = await OrderService.updateByField({id: order.id}, order, true);
                        
                        // if(order.fulfillments && order.fulfillments.length > 0){
                        //     let fulfillmentResult = await FulfillmentService.deleteMany({
                        //         id: { "$nin": order.fulfillments.map(x => x.id) },
                        //         order_id: order.id
                        //     });
                        //     order.fulfillments.forEach(async fulfillment => {
                        //         fulfillmentResult = await FulfillmentService.update({id: fulfillment.id}, fulfillment);
                        //     });
                        // }
                    });
                }
            }
            console.log(index, "Endindex");
        }

        isRun = false;
    });
}
export default Order;