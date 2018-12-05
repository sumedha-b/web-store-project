/**
 *  This fill will make a
 *  connection to the database
 *  This file is known as module
 */
//creating mongoose to define schema
//This mongoose is ORM for 
var mongoose = require('mongoose');
var VendorSchema  = new mongoose.Schema({
    vcode: { type: String,required: true, unique: true },
    name: { type: String},
    email: { type: String},
    mobile: { type: String},
    address: { type: String},
    comment: { type: String},
    photo: { type: String },
    doe: {type: Date},
    dom: {type: Date},
    userid: { type: String}
    },{collection: 'vendor_colletions'});

        //on every save, add the date
        VendorSchema.pre('save', function(next) {
    // get the current date
    var currentDate = new Date();
    // change the updated_at field to current date
    this.dom = currentDate;
    // if created_at doesn't exist, add to that field
    if (!this.doe){
      this.doe = currentDate;
    } 
    next(); //means go ahead and save it into db now
});

//Here we are registering ProductEntity as model in mongoose
var VendorSchema=mongoose.model('Vendor', VendorSchema);
//exporting object ProfileEntity
module.exports=VendorSchema;
