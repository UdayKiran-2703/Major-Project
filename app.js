const express=require('express');
const app=express();
const mongoose = require('mongoose');
const Listing=require("./models/listing.js");
const path=require("path");
const methodOverride=require("method-override");
const ejsMate=require("ejs-mate");
const wrapAsync=require("./utils/wrapAsync.js");
const ExpressError=require("./utils/ExpressError.js");
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname,"/public")));
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.engine("ejs",ejsMate);
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

app.get("/listings",wrapAsync(async (req,res)=>{
    let allListing=await Listing.find({});
    res.render("./listings/index.ejs",{allListing});
}));
//new Route
app.get("/listings/new",wrapAsync((req,res)=>{
    res.render("listings/new.ejs");
}));
//Create Route
app.post("/listings",wrapAsync(async (req,res)=>{
    let {title,description,image,price,location,country}=req.body;
    const Listing1=new Listing({
        title:title,
        description:description,
        price:price,
        location:location,
        country:country
    });
    await Listing1.save();
    res.redirect("/listings");
}));
//show Route
app.get("/listing/:id",wrapAsync(async (req,res)=>{
    let {id}=req.params;
    let listing=await Listing.findById(id);
    res.render("listings/show.ejs",{listing});
}));
//Edit Route
app.get("/listings/:id/edit",wrapAsync(async (req,res)=>{
    let {id}=req.params;
    let listing=await Listing.findById(id);
    res.render("./listings/edit.ejs",{listing});
}));
//Update Route
app.put("/listing/:id",wrapAsync(async (req,res)=>{
    let {id}=req.params;
    let listing=await Listing.findByIdAndUpdate(id,{...req.body.listing});
    res.redirect(`/listing/${id}`);
}));

app.delete("/listings/:id",wrapAsync(async (req,res)=>{
    let {id}=req.params;
   let deletedmsg= await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
}));

app.all("*",(req,res,next)=>{
    next(new ExpressError(404,"Page not found"));
});

app.use((req,res,err,next)=>{
let {status=500,message="Something went wrong"}=err;
res.status(status).send(message);
});



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