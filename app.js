const express = require("express");
const nodemailer = require("nodemailer");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 6000;
const XLSX = require("xlsx");
const sendEmail = (row, index) => {
  console.log(row["First Name"], ++index);
  try {
      let transporter = nodemailer.createTransport({
          host: "smtp.gmail.com",
        //  port: 587,
        //  secure: false, // true for 465, false for other ports
          // requireTLS: true,
          // tls : {
          //     rejectUnauthorized: false,
          // },
          auth: {
            user: process.env.SENDER_EMAIL,
            pass: process.env.SENDER_PASSWORD
          }
      });
      let mailOptions = {
          from: '"Bulk"<user.gmail.com>', // sender address
          to: row['Email'], // list of receivers
          subject: "Confirmation Email", // Subject line
          html: `<h1>Hi ${row['First Name']}</h1>`
      };

      transporter.sendMail(mailOptions, function(error, info){
         if (error) {
              console.log(error + "Email not sent to : " + row['Work Email ID']);
         }
        else {
            console.log('Email sent to : ' + row['Work Email ID'] + info.response);
         }
        });
  } catch (error) {
      console.log(error + "Email not sent to : " + row['Work Email ID']);
  }
};
async function getExcelData(filename) {
  const workbook = XLSX.readFile(filename);
  const sheet_name_list = workbook.SheetNames;
  const xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
  return xlData;

}
app.listen(port, async () => {
  console.log(`App is listening on port : ${port}`);
  const excelData = await getExcelData(process.env.FILENAME);
  excelData.map((row, index) => {
    setTimeout(() => {
      sendEmail(row, index);
    }, process.env.TIMEOUT_SECONDS*60*index);
  });
});
