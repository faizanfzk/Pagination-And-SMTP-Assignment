const nodemailer=require("nodemailer")

module.exports = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "51a63d08881f82", // generated ethereal user
      pass: "436e9c6d63f468", // generated ethereal password
    },
  });