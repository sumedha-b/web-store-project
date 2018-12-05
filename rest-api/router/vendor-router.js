
var VendorController=require('../controller/admin/vendor-controller')
module.exports=function(endPoint){

    //Mapping for add profile
    //@RequestMapping(value="profiles",method=RequestMethod.POST)
    endPoint.get("/admin/vendors",VendorController.findVendors);
    endPoint.get("/admin/vendor-image",VendorController.imageLoader);
    endPoint.post("/admin/vendors",VendorController.saveVendor);
    endPoint.delete("/admin/vendors", VendorController.deleteVendor);
    endPoint.patch("/admin/vendors", VendorController.editVendor);
    endPoint.get("/admin/vendor-by-code",VendorController.findByVcode);
};
