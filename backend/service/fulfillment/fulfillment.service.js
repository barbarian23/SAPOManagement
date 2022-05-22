import IService from '../iservice';
import { Fulfillment } from '../../model';

class FulfillmentService extends IService {
  constructor(model) {
    super(model);
  }

  async getDetailByID(id) {
    try {
      let pipeline = [
        { $match: { id: id } },
        //get order
        {
          $lookup: {
            from: 'orders',
            localField: 'order_id',
            foreignField: 'id',
            as: 'orders'
          }
        },
        { $addFields: { order: { $first: "$orders" } } },
        //count quantity
        {
          $lookup: {
            from: 'lineitems',
            localField: 'order.line_items',
            foreignField: '_id',
            as: 'order.lineitems'
          }
        },
        //get lineitems
        {
          $lookup: {
            from: 'lineitems',
            // localField: 'line_items',
            // foreignField: '_id',
            let: { 'orderId': "$order_id" },
            pipeline: [
              { "$match": { "$expr": { "$eq": ["$order_id", "$$orderId"] } } },
              {
                $lookup: {
                  from: 'machines',
                  localField: 'machine_id',
                  foreignField: '_id',
                  as: 'machines'
                }
              },
              { $addFields: { machine: { $first: "$machines" } } },
              {
                $project: {
                  name: 1,
                  quantity: 1,
                  sku: 1,
                  id: 1,
                  // machine: { $ifNull: ["$machine", ""] },
                  // machine: 1,
                  machine_code: "$machine.code",
                  price: 1,
                }
              }
            ],
            as: 'lineitems'
          }
        },

        //end
        {
          $project: {
            _id: 0,
            id: 1,
            order_number: "$order.order_number",
            source_name: "$order.source_name",
            lineitems: {
              name: 1,
              quantity: 1,
              sku: 1,
              id: 1,
              machine_code: 1,
              price: 1,
            },
            customer: "$order.customer",
            gateway: "$order.gateway",
            confirmed_at: "$order.confirmed_at",
            tracking_number: 1,
            status: 1,
            shipping_address: 1,
            shipping_phone: 1,
            shipping_notes: 1,
            first_name: 1,
            last_name: 1,
            real_shipping_fee: 1,
            quantity: { $sum: "$lineitems.quantity" },
            total_quantity: { $sum: "$order.lineitems.quantity" },
          }
        },
      ];

      const fulfillments = await this.aggregate(pipeline);
      if (fulfillments.length > 0) {
        return fulfillments[0];
      } else {
        return null
      }
    } catch (errors) {
      console.log(errors);
      throw errors;
    }
  }
}

export default new FulfillmentService(Fulfillment);