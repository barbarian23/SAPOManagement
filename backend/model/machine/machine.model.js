import mongoose from "mongoose";

const MachineSchema = mongoose.Schema({
    code: String,
    name: String
});

const Machine = mongoose.model('Machine', MachineSchema);

export default Machine;
