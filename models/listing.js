const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const listingSchema= new Schema({
    title:{type:String,required:true},
    description:String,
    image:{type:String,
        default:"https://unsplash.com/photos/a-lone-sailboat-in-the-middle-of-the-ocean-uI3CBm8udb4",
    set:(v)=>v===""?"https://unsplash.com/photos/a-lone-sailboat-in-the-middle-of-the-ocean-uI3CBm8udb4":v
    },
    price:Number,
    location:String,
    country:String,
});
const Listing=mongoose.model("Listing",listingSchema);
module.exports=Listing;