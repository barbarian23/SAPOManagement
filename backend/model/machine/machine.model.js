import mongoose from "mongoose";

const MachineSchema = mongoose.Schema({
    code: String,
    name: String
});

const Machine = mongoose.model('machine', MachineSchema);

export default Machine;