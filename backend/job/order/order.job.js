import { OrderService } from "../../service";
import fetch from 'node-fetch';

const Order = function (schedule) {
    var cronExpress = '*/10 * * * * * *';
    var j = schedule.scheduleJob(cronExpress, function(fireDate){
        console.log(fireDate);
        let orderCreatedLast = await OrderService.getInstance().find().skip(0).limit(1).sort({created_at: -1}).exec();
        let createdLast = orderCreatedLast.created_at;
        if(!createdLast)
            createdLast = new Date();

        let orderUpdatedLast = await OrderService.getInstance().find().skip(0).limit(1).sort({updated_at: -1}).exec();
        let updatedLast = orderUpdatedLast.updated_at;
        if(!updatedLast)
            updatedLast = new Date();
    });
}
export default Order;