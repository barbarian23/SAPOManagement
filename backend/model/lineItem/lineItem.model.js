import mongoose, {Schema} from "mongoose";

const LineItemSchema = mongoose.Schema({
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
    image:                Object,
    not_allow_promotion:  Boolean,
    ma_cost_amount:       Number,
    actual_price:         Number,
    process_time:         { type: Date, default: null },
    order_id:             Number,
    machine_id:           { type: Schema.Types.ObjectId, default: null },
    status:               {
        type: String,
        enum: ['NOT', 'DONE'],
        default: 'NOT'
    },
    qty_onhand:           { type: Number, default: null },
});

const LineItem = mongoose.model('LineItem', LineItemSchema);

export default LineItem;