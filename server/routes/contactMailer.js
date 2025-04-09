const express = require("express");
const nodemailer = require("nodemailer");
const wrapAsync = require("../utils/wrapAsync");
const router = express.Router();

router.post(
  "/",
  wrapAsync(async (req, res) => {
    const { name, email, message } = req.body;

    //     Email:  fashionloginshop@gmail.com
    // Password:  Faisalabad12

    try {
      const transporter = nodemailer.createTransport({
        service: "gmail", // or use smtp
        auth: {
          user: "ubaidali975@gmail.com",
          pass: "YourmailpasswordHere",
        },
      });

      const mailOptions = {
        from: email,
        to: "ubaidali975@gmail.com", // where you want to receive messages
        subject: `New contact from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
      };

      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: "Message sent successfully!" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Failed to send message." });
    }
  })
);

module.exports = router;
