// const Order = function (mongoose) {
//   const { Schema } = mongoose;
//   // return mongoose.model('Order', {
//   //   id:                      Number,
//   //   email:                   String,
//   //   closed_on:               Date,
//   //   created_on:              Date,
//   //   modified_on:             Date,
//   //   number:                  Number,
//   //   note:                    String,
//   //   token:                   String,
//   //   gateway:                 String,
//   //   test:                    Boolean,
//   //   total_price:             String,
//   //   subtotal_price:          String,
//   //   total_weight:             Number,
//   //   total_tax:               String,
//   //   taxes_included:           Boolean,
//   //   currency:                String,
//   //   financial_status:        String,
//   //   confirmed:                Boolean,
//   //   total_discounts:         String,
//   //   total_line_items_price:  String,
//   //   cart_token:              String,
//   //   buyer_accepts_marketing:  Boolean,
//   //   name:                    String,
//   //   referring_site:          String,
//   //   landing_site:            String,
//   //   cancelled_on:            Date,
//   //   cancel_reason:           String,
//   //   total_price_usd:         String,
//   //   checkout_token:          String,
//   //   reference:               String,
//   //   user_id:                 String,
//   //   location_id:             String,
//   //   source_identifier:       String,
//   //   source_url:              String,
//   //   processed_on:            Date,
//   //   device_id:               String,
//   //   browser_ip:             String,
//   //   landing_site_ref:        String,
//   //   order_number:             Number,
//   //   discount_codes:         [String],
//   //   note_attributes:        [String],
//   //   payment_gateway_names:  [String],
//   //   processing_method: String,
//   //   checkout_id:             Number,
//   //   source_name:             String,
//   //   fulfillment_status:      String,
//   //   tax_lines:               [String],
//   //   tags:                    String,
//   //   contact_email:           String,
//   //   line_items:               [String],
//   //   shipping_lines:           [String],
//   //   billing_address:          String,
//   //   shipping_address:         String,
//   //   fulfillments:              [String],
//   //   refunds:                  [String],
//   // });

//   return mongoose.model('Product', new Schema({
//     productName: String,
//     productDetail: String,
//     deliveryFee: String,
//     totalNumber: Number
//   }));
// }
// export default Order;


export function Order(sequelize, DataTypes){
    let order = sequelize.define('order',{
      
    })
}