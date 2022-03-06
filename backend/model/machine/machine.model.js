const Machine = function (mongoose) {
    const { Schema } = mongoose;
    return mongoose.model('Machine', {
        code: String,
        name: String,
    });
  }
  export default Machine;