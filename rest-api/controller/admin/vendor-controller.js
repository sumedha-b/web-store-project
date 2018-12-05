
var VendorEntity=require('../../model/vendor-entity');
var ImageFolderPath=require('../../config/image-folder-path');
var EmailService=require('../../service/email-service');

module.exports.findVendors=(req,res)=> {
   //console.log("@@@@@@@@@@@findVendors@@@@@@@@@@@@@@");
   VendorEntity.find({},function(err,data){
          //console.log(data);
          res.status(200).json(data);
   });
}

module.exports.saveVendor =(req,res)=>{
    console.log("___________________");
    //console.log(req);
    var vendor = req.body;
    console.log(vendor);
    //reading the image coming from client as a request
    let pphoto = req.files.photo;
    console.log("Printing the image!!!!!!!!!!!!!");
    console.log(pphoto.name); // name of the image
   // console.log(pphoto.data); //image as a byte array
  
   
    var vendorEntity = new VendorEntity();
    for (key in vendor) {
       vendorEntity[key] = vendor[key]; // copies each property to the vendorEntity object
    }
    vendorEntity.userid=vendor.userid;
    //saving image location into the database!
    var imgtext=pphoto.name.substring(pphoto.name.length-4);//retreiving the image type: .jpg, .png, etc
    //console.log("imgtext "+imgtext);
    var pphotoName=vendor.vcode+"_profile"+imgtext;
    //console.log(pphotoName);
    //this is just image path which we will save into the database 
    vendorEntity.photo=ImageFolderPath.VENDOR_PROFILES+"/"+pphotoName;
    //console.log(appRoot +"/"+ImageFolderPath.VENDOR_PROFILES+"/"+pphotoName);
    //----------------------------------------------------------------------------------------------------//
    //saving file on server file system
    pphoto.mv(appRoot +"/"+ImageFolderPath.VENDOR_PROFILES+"/"+pphotoName, function(err) {
            if(err){
                console.log(err); 
                res.status(500).json({status:"fail",message:"Sorry!! vendor profile image is not saved"});
            }else{
            vendorEntity.save(err =>{
                if(err){
                    console.log(err);
                    return res.status(200).json({status:"fail",message:"couldn't save to database"});
                }else{
                    EmailService.sendVendorConfiramtionEmail(vendorEntity.email);
                    return res.status(200).json({status:"success",message:"vendor sucessfully saved"})
                }
            }); //end of save entity
        }
    }); //end of mv method
}

module.exports.deleteVendor =function (req,res) {
   var vendorCode=req.query;
   console.log("From Controller: ");
   console.log(vendorCode);

   VendorEntity.find({vcode:vendorCode.vcode}).remove().exec();
   res.status(200).json({status:"success",message:"vendor sucessfully deleted!"});
}

module.exports.editVendor =function (req,res) {
    let vendorPhoto=req.files;
    var vendor = req.body;
    console.log("inside the backend........");
    console.log(vendor);

    if(!vendorPhoto) { //if the photo is NOT being updated
        console.log("no image found!!!!");
        let venPhoto={};
        VendorEntity.find({vcode:vendor.vcode}).then(vendor=>{
            venPhoto.data=vendor[0].photo.data;
            venPhoto.contentType=vendor[0].photo.contentType;
            console.log(venPhoto);
        })
        VendorEntity.updateOne({vcode: vendor.vcode}, {
            $set: {
                name: vendor.name,
                mobile: vendor.mobile,
                email: vendor.email,
                address: vendor.address,
                comment: vendor.comment,
                dom: vendor.dom
            }
        }, function(err, data) {
            if(err){
                console.log(err);
            }
        });
    }
    else { //if updated the photo
        console.log("Image found!!!!");
        console.log("PHOTO: "+vendorPhoto.name);
        var imgtext=vendorPhoto.photo.name.substring(vendorPhoto.photo.name.length-4);
        var pphotoName=vendor.vcode+"_profile"+imgtext;
        console.log(pphotoName);
        //this is just image path which we will save into the database 
        var venPhoto=ImageFolderPath.VENDOR_PROFILES+"/"+pphotoName;
        vendorPhoto.photo.mv(appRoot+'/'+venPhoto, function(err, data){
            if(err) {
                console.log(err); 
                res.status(500).json({status:"fail",message:"ERROR: Unable to save the vendor profile."});
            } else {
                console.log()
                VendorEntity.updateOne({vcode: vendor.vcode}, {
                    $set: {
                        name: vendor.name,
                        mobile: vendor.mobile,
                        email: vendor.email,
                        address: vendor.address,
                        comment: vendor.comment,
                        doe: vendor.doe,
                        dom: vendor.dom,
                        photo: {venPhoto}
                    }
                }, function(err) {
                    if (err) {
                        console.log(err);
                        res.status(500).json({status:"fail",message:"ERROR: Unable to edit the vendor profile."});
                    } else {
                        res.status(200).json({status:"success",message:"Vendor Data successfully updated."});
                    }
                });
            }
        });
    }
}

module.exports.imageLoader=(req, res) =>{
   var vencode=req.query.vcode;
   console.log(vencode);
   //var reader = new FileReader();
   if(vencode==undefined){
       return;
   }
   VendorEntity.find({vcode: vencode}).then(function(vendor){
       console.log("FINDING IMAGE FOR: "+vendor);
       res.contentType("image/png");
       var venPhoto=appRoot+'/'+vendor[0].photo;
       //venPhoto
       return res.send(reader.readAsDataURL(venPhoto));
   }).catch(err=>{
       console.log(err);
   });
};

module.exports.findByVcode=(req, res) =>{
    let vencode=req.query.vcode;
    console.log("FROM findByVcode: "+vencode);
    VendorEntity.find({vcode:vencode}).then(vendor=>{
        return res.send(vendor[0]);
    })
}