import mongoose, {Schema} from "mongoose";

const ExceptionSchema = mongoose.Schema({
    created_at:                   Date,
    content:                      String,
});

const Exception = mongoose.model('Exception', ExceptionSchema);
export default Exception;