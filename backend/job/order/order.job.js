import { OrderService } from "../../service";
import fetch from 'node-fetch';

const Order = function (schedule) {
    var cronExpress = '*/10 * * * * * *';
    var j = schedule.scheduleJob(cronExpress, function(fireDate){
        console.log(fireDate);
        let orderLast = await OrderService.getInstance().find().skip(0).limit(1).sort({created_on: -1}).exec();
        let createdOnLast = orderLast.created_on;
        if(!createdOnLast)
            createdOnLast = new Date();
    });
}
export default Order;