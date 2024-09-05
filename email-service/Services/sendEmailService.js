const nodemailer=require('nodemailer');


module.exports= async function sendEmailService({
  to,
  subject,
  message,
  attachments = [],
} = {}) {

  // configurations
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  const emailInfo = await transporter.sendMail({
    from: `"HOME SHOPPING 🛒" <loz63214@gmail.com>`,
    to: to ? to : "",
    subject: subject ? subject : "Hello",
    html: message ? message : "",
    attachments,
  });
  console.log(emailInfo.accepted);
  console.log("ksj");
  if (emailInfo.accepted.length) {
    console.log("ksj");
    return true; 
  }

  return false;
}
