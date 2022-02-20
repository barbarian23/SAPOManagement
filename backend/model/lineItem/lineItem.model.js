const LineItem = function (mongoose) {
    const { Schema } = mongoose;
    return mongoose.model('LineItem', {
        id:                           Number,
    variant_id:                   Number,
    title:                        String,
    quantity:                     Number,
    price:                        String,
    grams:                        Number,
    sku:                          String,
    variant_title:                String,
    vendor:                       String,
    fulfillment_service:          String,
    product_id:                   Number,
    requires_shipping:            Boolean,
    taxable:                      Boolean,
    gift_card:                    Boolean,
    name:                         String,
    variant_inventory_management: String,
    product_exists:               Boolean,
    fulfillable_quantity:         Number,
    total_discount:               String,
    fulfillment_status:           String,
    machine_id:                   ObjectId,
    process_time:                 Date,
    status:                       String,
    });
  }
  export default LineItem;