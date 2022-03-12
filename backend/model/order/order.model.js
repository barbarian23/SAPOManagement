import mongoose, {Schema} from "mongoose";

const OrderSchema = mongoose.Schema({
    billing_address:         Object,
    browser_ip:              String,
    buyer_accepts_marketing: Boolean,
    cancel_reason:           String,
    cancelled_at:            String,
    cart_token:              String,
    checkout_token:          String,
    client_details:          Object,
    closed_at:               String,
    created_at:              Date,
    currency:                String,
    customer:                Object,
    discount_codes:          [Object],
    email:                   String,
    financial_status:        String,
    fulfillment_status:      String,
    tags:                    String,
    gateway:                 String,
    gateway_code:            String,
    id:                      Number,
    landing_site:            String,
    landing_site_ref:        String,
    source:                  String,
    name:                    String,
    note:                    String,
    number:                  Number,
    order_number:            String,
    processing_method:       String,
    referring_site:          String,
    shipping_address:        Object,
    source_name:             String,
    subtotal_price:          Number,
    tax_lines:               String,
    taxes_included:          Boolean,
    token:                   String,
    total_discounts:         Number,
    total_line_items_price:  Number,
    total_price:             Number,
    total_tax:               Number,
    total_weight:            Number,
    updated_at:              Date,
    confirmed_at:            Date,
    closed_status:           String,
    cancelled_status:        String,
    confirmed_status:        String,
    assigned_location_id:    Number,
    assigned_location_name:  String,
    assigned_location_at:    Date,
    exported_confirm_at:     String,
    user_id:                 Number,
    device_id:               String,
    location_id:             Number,
    location_name:           String,
    ref_order_id:            Number,
    ref_order_date:          String,
    ref_order_number:        String,
    utm_source:              String,
    utm_medium:              String,
    utm_campaign:            String,
    utm_term:                String,
    utm_content:             String,
    payment_url:             String,
    contact_email:           String,
    order_processing_status: String,
    prev_order_id:           String,
    prev_order_number:       String,
    prev_order_date:         String,
    redeem_model:            String,
    line_items:              [Schema.Types.ObjectId],
    fulfillments:            [Schema.Types.ObjectId],
    status:                  {
        type: String,
        enum: ['NOT', 'DONE']
    },
});

const Order = mongoose.model('Order', OrderSchema);

export default Order;