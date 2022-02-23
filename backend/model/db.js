import mongoose from "mongoose";

const mongodb = mongoose.connect('mongodb://sapodb:xhbXHCckwFK7W5pLZhYtNRHRfCZElLXm3KLERpGxbFntArb7BfbW4VcIKWCAXxFHYavsLJWIVzHewDfdIKIlVg==@sapodb.mongo.cosmos.azure.com:10255/sapomanager?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@sapodb@')
  .then((res) => {
    console.log("Connect mongodb successfully")
  }).catch((err) => {
    console.log("Connect mongodb falure");
  })

export default mongodb;