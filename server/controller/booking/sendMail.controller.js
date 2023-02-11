import nodemailer from "nodemailer";
export default function (req, res) {
    const transporter = nodemailer.createTransport({
        port: 465,
        host: "smtp.gmail.com",
        auth: {
            user: "primostepz@gmail.com",
            pass: "alphaprogrammerz",
        },
        secure: true,  
    });

    const mailData = {
        from: "primostepz@gmail.com",
        to: req.body.email,
        subject: "Message From KHB",
        text: `thank you ${req.body.name} for being contact with me,I'll reply as soon as possible`,
        html: `<!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Thank You</title>
      </head>
      <body>
        hey
      </body>
      </html>
      `,
    };
    transporter.sendMail(mailData, function (err, info) {
        if (err) console.log(err);
        else console.log(info);
    });
    return res.send({ status: 200 });
    console.log(req.body);
}