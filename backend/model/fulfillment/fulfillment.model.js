import mongoose from "mongoose";

const LineItemSchema = mongoose.Schema({
    id: Number,
    variant_id: Number,
    title: String,
    quantity: Number,
    price: String,
    grams: Number,
    sku: String,
    variant_title: String,
    vendor: String,
    fulfillment_service: String,
    product_id: Number,
    requires_shipping: Boolean,
    taxable: Boolean,
    gift_card: Boolean,
    name: String,
    variant_inventory_management: String,
    properties: [
        {
            name: String,
            value: String
        }
    ],
    product_exists: Boolean,
    fulfillable_quantity: Number,
    total_discount: String,
    fulfillment_status: String,
    tax_lines: [String]
})

const FulfillmentSchema = mongoose.Schema({
    id: Number,
    order_id: Number,
    status: String,
    created_on: Date,
    service: String,
    modified_on: Date,
    tracking_company: String,
    tracking_number: String,
    tracking_numbers: [String],
    tracking_url: String,
    tracking_urls: [String],
    receipt: Object,
    line_items: [String]
});

const Fulfillment = mongoose.model('fulfillment', FulfillmentSchema);

export default Fulfillment;