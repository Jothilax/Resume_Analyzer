import mongoose from "mongoose";

const connectToDb = async ()=>{
   mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

}
export default connectToDb;