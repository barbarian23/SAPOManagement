import { OrderService, LineItemService, FulfillmentService, ExceptionService } from "../../service";
import fetch from 'node-fetch';
import { json } from "express";
const schedule = require('node-schedule');
const moment = require('moment');

const headers = {
    Authorization: 'Bearer D9CBEEF3950683AB7BF852A3BED03E35AD68C117825CEBA2F54CCF8F60786212',
    Accept: "application/json, text/plain, */*",
    "Content-Type": "application/json",
};
const urlCountOrder = new URL('https://apis.haravan.com/com/orders/count.json');
const urlGetOrder = new URL('https://apis.haravan.com/com/orders.json');
const urlGetInventory = new URL('https://apis.haravan.com/com/inventory_locations.json');
const urlGetFulfillments = function(order_id){
    return new URL(`https://apis.haravan.com/com/orders/${order_id}/fulfillments.json`);
};
const dateAtMin = moment('2022-04-23T00:24:00').utcOffset(420);

const location = {
    id: 979462,
    name: "Kho Phúc Diễn",
};

const Sleep = function (ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const Order = function () {
    var cronExpress = '3 * * * * *';
    var isRun = false;
    var j = schedule.scheduleJob(cronExpress, async function(fireDate){
        if(isRun){
            return;
        }
        isRun = true;
        console.log("============================");
        console.log(fireDate, "Started");

        /* Create Order */
        await CreateOrder();
        
        /* Update Order */
        await UpdateOrder();
        

        console.log("============================");
        isRun = false;
    });
}

const GetInventory = async function (location_ids, variant_ids) {
    let qty_onhand = null;

    try{
        if(location_ids && variant_ids){
            let params = { location_ids, variant_ids };
            urlGetInventory.search = new URLSearchParams(params).toString();
        
            let status = 0;
            let data = {};
            while(status != 200){
                let response = await fetch(urlGetInventory, { method: 'GET', headers: headers });
                status = response.status;
                if(status == 200)
                {
                    data = await response.json();
                    if(data.inventory_locations && data.inventory_locations.length > 0){
                        qty_onhand = data.inventory_locations.map(item => item.qty_onhand).reduce((prev, next) => prev + next);
                        // console.log(qty_onhand, 'Get data qty_onhand');
                    }
                }
                else
                    await timer(2000);
            }
        }
    }
    catch(exception){
        await ExceptionService.insert({created_at: new Date(), content: exception.message})
    }

    return qty_onhand ? qty_onhand : 0;
} 

const timer = function (time) {
    return new Promise(res => setTimeout(res, time));
}

const GetFulfillments = async function (order_id) {
    let status = 0;
    let data = [];

    try{
        while(status != 200){
            let response = await fetch(urlGetFulfillments(order_id), { method: 'GET', headers: headers });
            status = response.status;
            if(status == 200)
            {
                let dataText = await response.text();
                if(dataText){
                    data = JSON.parse(dataText).fulfillments;
                    console.log(data.length, 'Create fulfillments count');
                }
                else status = 0;
            }
            else await timer(2000);
        }
    }
    catch(exception){
        await ExceptionService.insert({created_at: new Date(), content: exception.message})
    }

    return data;
} 

const GetCreatedLast = async function(){
    let orderCreatedLast = await OrderService.search(null, 0, 1, '-created_at');
    let createdLast = dateAtMin;
    if(orderCreatedLast && orderCreatedLast.length > 0)
        createdLast = moment(await orderCreatedLast[0].created_at).utcOffset(420);
    return createdLast;
}

const GetUpdatedLast = async function(){
    let orderUpdatedLast = await OrderService.search(null, 0, 1, '-updated_at');
    let updatedLast = dateAtMin;
    if(orderUpdatedLast && orderUpdatedLast.length > 0)
        updatedLast = moment(await orderUpdatedLast[0].updated_at).utcOffset(420);
    return updatedLast;
}

const CreateOrder = async function(){
    try{
        let createdLast = await GetCreatedLast();
        console.log(createdLast,"createdLast_check");
        console.log(moment(createdLast).format('YYYY-MM-DD[T]HH:mm:ss'),"createdLast_toLocaleString");

        let params = { created_at_min: createdLast ? moment(createdLast).format('YYYY-MM-DD[T]HH:mm:ss') : null };
        
        urlCountOrder.search = new URLSearchParams(params).toString();
        let countPages = 0;

        let status = 0;
        while(status != 200){
            let countResponse = await fetch(urlCountOrder, { method: 'GET', headers: headers });
            status = countResponse.status;
            if(status == 200)
            {
                countPages = parseInt(parseInt((await countResponse.json()).count) / 50) + 1;
            }
            else
                await timer(2000);
        }

        console.log(countPages, "Total orders pages");

        const LIMIT = countPages;
        const asyncIterable = {
            [Symbol.asyncIterator]() {
                let i = LIMIT;
                return {
                next() {
                    const done = i === 0;
                    const value = done ? undefined : i--;
                    return Promise.resolve({ value, done });
                },
                return() {
                    // This will be reached if the consumer called 'break' or 'return' early in the loop.
                    return { done: true };
                }
                };
            }
        };

        for await (const index of asyncIterable) {
            try {
                console.log("------------------------");
                console.log(index, "Start page index");
                params.page = index;
                params.limit = 50;
                urlGetOrder.search = new URLSearchParams(params).toString();

                let status = 0;
                let data = {};
                while(status != 200){
                    let response = await fetch(urlGetOrder, { method: 'GET', headers: headers });
                    status = response.status;
                    if(status == 200)
                        data = await response.json();
                    else
                        await timer(2000);
                }
        
                let checkOrders = await OrderService.searchAll({
                    id: {
                        $in: data.orders.map(x => x.id),
                    }
                });

                console.log(data.orders.length,"Create orders count befor of index " + index);

                data.orders = data.orders.filter(obj => {
                    let checkOrder = checkOrders.find(x => x.id == obj.id);
                    
                    console.log(obj.created_at, "obj.created_at");
                    console.log(moment(obj.created_at).utcOffset(420), "moment(obj.created_at).utcOffset(420)");
                    console.log(moment(obj.created_at).utcOffset(420).isSameOrAfter(createdLast), "res");

                    return moment(obj.created_at).utcOffset(420).isSameOrAfter(createdLast) && !checkOrder;
                });
        
                console.log(data.orders.length, "Create orders count of index " + index);
                if(data.orders && data.orders.length > 0){
                    data.orders.forEach(async order => {
                        order.line_items.forEach(async line_item => {
                            line_item.order_id = order.id;
                            line_item.qty_onhand = await GetInventory(location.id, line_item.variant_id);
                        });
                        let lineItemResults = await LineItemService.insertMany(order.line_items);

                        order.fulfillments = await GetFulfillments(order.id);
                        if(!order.fulfillments || order.fulfillments.length == 0){
                            console.log(order.order_number,"order.order_number 1");
                        }
                        order.fulfillments.forEach (async fulfillment => {
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
                console.log(index, "End page index");
            }
            catch(exe) {
                console.log(index,"Error page index");
                console.log(exe,"Error show");
                await ExceptionService.insert({created_at: new Date(), content: exe.message})
            }
            console.log("------------------------");
        }
    }
    catch(exception){
        await ExceptionService.insert({created_at: new Date(), content: exception.message})
    }
    
}

const UpdateOrder = async function(){
    try {
        let updatedLast = await GetUpdatedLast();
    
        if(updatedLast){
            let params = { updated_at_min: moment(updatedLast).format('YYYY-MM-DD[T]HH:mm:ss') };
            urlGetOrder.search = new URLSearchParams(params).toString();
    
            let status = 0;
            let data = {};
            while(status != 200){
                let response = await fetch(urlGetOrder, { method: 'GET', headers: headers });
                status = response.status;
                if(status == 200)
                    data = await response.json();
                else
                    await timer(2000);
            }
            
            let checkOrders = await OrderService.searchAll({
                id: {
                    $in: data.orders.map(x => x.id),
                }
            });

            data.orders = data.orders.filter(obj => {
                let checkOrder = checkOrders.find(x => x.id == obj.id);
                return moment(obj.updated_at).utcOffset(420) > updatedLast && checkOrder;
            });
    
            console.log(data.orders.length, "Update orders count");
            if(data.orders && data.orders.length > 0){
                data.orders.forEach(async order => {
                    let lineItemResults = [];
                    if(order.line_items && order.line_items.length > 0){
                        let lineItemDeletes = await LineItemService.deleteMany({
                            id: { "$nin": order.line_items.map(x => x.id) },
                            order_id: order.id
                        });
                        for await (const line_item of order.line_items) {
                            line_item.order_id = order.id;
                            line_item.qty_onhand = await GetInventory(location.id, line_item.variant_id);
    
                            let lineItemResult = await LineItemService.updateByField({id: line_item.id}, line_item, true);
                            if(lineItemResult){
                                lineItemResults.push(lineItemResult);
                            }
                        }
                        order.line_items = lineItemResults.map(x => x._id);
                    }
                    
                    let fulfillmentResults = [];
                    if(order.fulfillments && order.fulfillments.length > 0){
                        let fulfillmentResult = await FulfillmentService.deleteMany({
                            id: { "$nin": order.fulfillments.map(x => x.id) },
                            order_id: order.id
                        });
                        order.fulfillments = await GetFulfillments(order.id);
                        for await (const fulfillment of order.fulfillments) {
                            let result = lineItemResults.filter(async obj => {
                                return fulfillment.line_items.map(x => x.id).includes(obj.id);
                            });
                            fulfillment.line_items = result.map(x => x._id);
                            fulfillmentResult = await FulfillmentService.updateByField({id: fulfillment.id}, fulfillment, true);
                            
                            if(fulfillmentResult){
                                fulfillmentResults.push(fulfillmentResult);
                            }
                        }
                        order.fulfillments = fulfillmentResults.map(x => x._id);
                    }
    
                    let orderResult = await OrderService.updateByField({id: order.id}, order);
                });
            }
        }
    }
    catch(exe) {
        console.log(exe,"Error show");
        await ExceptionService.insert({created_at: new Date(), content: exe.message})
    }
}

export default Order;