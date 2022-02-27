import mongoose from "mongoose";

const ProduceSchema = mongoose.Schema({
    line_item_id: String,
    process_time: Date,
    status: String,
    machine_ids: [String]
});

const Produce = mongoose.model('produce', ProduceSchema);

export default Produce;