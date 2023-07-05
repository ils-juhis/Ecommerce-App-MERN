const nodemailer = require("nodemailer")

exports.sendMail = async(options)=>{

  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.NODEMAILER_EMAIL, // generated ethereal user
      pass: process.env.NODEMAILER_PASS, // generated ethereal password
    },
  });


  let sendMailNow = await transporter.sendMail({
    from: "ebms@gmail.com", // sender address
    to: options.email, // list of receivers
    subject: `Ecommerce Password recovery`, // Subject line
    html: `<div style="box-shadow: 1px 1px 9px -1px rgba(179,157,179,1); padding: 20px; font-family: sans-serif">
    <h2  style='text-align:center; color:gray'> Ecommerce</h2>
    <div>
        <div style="font-size: 14px; padding-top: 20px"> 
            Please click on the button to reset password. If you have not requested this email then please ignore it.
        </div>
    </div>
    <div style='margin: 40px 0;'>
        <a href="${options.resetPasswordUrl}" style="text-decoration:none; color: white; background-color: #764ABC; padding: 15px; font-size: 14px;  border-radius: 5px; font-family: 'Open Sans', sans-serif;">
            <b>Reset Password</b>
        </a>
    </div>
    <div style="font-size: 12px; color:red"> * Link is active for 15 minutes only. *</div>
  </div>`, // html body

  }, (error, result) => {
    if (error) return false;

    console.log("Message sent: %s", sendMailNow.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(sendMailNow));
  });

  return true;

}