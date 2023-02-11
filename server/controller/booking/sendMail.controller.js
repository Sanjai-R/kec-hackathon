import nodemailer from "nodemailer";
export const sendMail = async(mailPerson,type)=>{
  console.log("mail event triggered")
  const transporter = nodemailer.createTransport({
    port: 465,
    host: "smtp.gmail.com",
    auth: {
      user: "primostepz@gmail.com",
      pass: "bscyddmvawffmkxh",
    },
    secure: true,
  });

  const mailData = {
    from: "primostepz@gmail.com",
    to: "rtskrishnan@gmail.com",
    subject: "Message From KHB",
    text: `Dear ${mailPerson} ,you have to accept or reject the booking request for ${type}
    `,

  };
  await transporter.sendMail(mailData, function (err, info) {
    if (err) console.log(err);
    else console.log(info);
  });
  return false;
  console.log(req.body);
}

