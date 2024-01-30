const express=require('express');
const app=express();
const mongoose = require('mongoose');
const Listing=require("./models/listing.js");
const path=require("path");
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
main()
.then(()=>{
    console.log("connected to db");
})
.catch((err) => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/Wanderlust');
}
app.get("/",(req,res)=>{
    res.send("success");
});
app.get("/listings",async (req,res)=>{
    let allListing=await Listing.find({});
    res.render("./listings/index.ejs",{allListing});
});
app.get("/listing/:id",async (req,res)=>{
    let {id}=req.params;
    let listing=await Listing.findById(id);
    res.render("listings/show.ejs",{listing});
})







// app.get("/testListing",async (req,res)=>{
//     let sampleListing=new Listing({
//         title:"My New Villa",
//         description:"By the Beach",
//         price:1700,
//         location:"Calanguta,Goa",
//         country:"India",
//     });
//     await sampleListing.save();
//     res.send("success");
// });



app.listen(8000,()=>{
    console.log("app is listening");
});