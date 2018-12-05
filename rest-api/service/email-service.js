var nodemailer=require('nodemailer');
var EmailInfo=require('../config/email-login-info');

module.exports.sendVendorConfiramtionEmail=function(email) {
    var transporter=nodemailer.createTransport(
        {
            service:'gmail',
            auth:{
                user:EmailInfo.user,
                pass:EmailInfo.pass
            }
        }
    )
    
    var mailOptions= {
        from: 'noreply@gmail.com',
        to: email,
        subject: 'Vendor Registration Confirmation',
        text: 'Welcome! You have successfully completed your registration.'
    }

    transporter.sendMail(mailOptions, function(err, data) {
        if(err) {
            console.log(err);
        }
        else {
            console.log();
            console.log("FROM EMAIL SERVICE: ")
            console.log(data);
            console.log();
        }
    })

}