const LineItem = function (mongoose) {
    const { Schema } = mongoose;
    return mongoose.model('LineItem', {
        fulfillable_quantity: Number,
        fulfillment_service:  String,
        fulfillment_status:   String,
        grams:                Number,
        id:                   Number,
        price:                Number,
        price_original:       Number,
        price_promotion:      Number,
        product_id:           String,
        quantity:             Number,
        requires_shipping:    Boolean,
        sku:                  String,
        title:                String,
        variant_id:           String,
        variant_title:        String,
        vendor:               String,
        type:                 String,
        name:                 String,
        gift_card:            Boolean,
        taxable:              Boolean,
        tax_lines:            String,
        product_exists:       Boolean,
        barcode:              String,
        properties:           String,
        applied_discounts:    [String],
        total_discount:       Number,
        image:                String,
        not_allow_promotion:  Boolean,
        ma_cost_amount:       Number,
        actual_price:         Number,
        process_time:         Date,
        machine_id:           Schema.Types.ObjectId,
        status:               {
            type: String,
            enum: ['NOT', 'DONE']
        },
    });
  }
  export default LineItem;