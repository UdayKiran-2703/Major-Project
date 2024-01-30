const mongoose=require("mongoose");
const initData =require("./data.js");
const Listing=require("../models/listing.js");
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/Wanderlust');
  }
main()
.then(()=>{
    console.log("connected to db");
})
.catch((err) => console.log(err));
const initDb=async ()=>{
    await Listing.deleteMany({});
    await Listing.insertMany(initData.data);
    console.log("data was initialised");
};
initDb();