const Fulfillment = function (mongoose) {
    const { Schema } = mongoose;
    return mongoose.model('Fulfillment', {
        id:               Number,
        order_id:         Number,
        status:           String,
        created_on:       Date,
        service:          String,
        modified_on:      Date,
        tracking_company: String,
        tracking_number:  String,
        tracking_numbers: [String],
        tracking_url:     String,
        tracking_urls:    [String],
        line_items:       [Schema.Types.ObjectId],
    });
  }
  export default Fulfillment;