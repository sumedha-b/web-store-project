var AdController=require('../controller/admin/ad-controller');
module.exports=function(app){
    app.post("/admin/advertisement",AdController.editAd); 
    app.get("/admin/advertisement",AdController.findById);
};