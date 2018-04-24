import nodemailer from 'nodemailer';
import moment from 'moment';
import cfg from '../../cfg';

const mailCfg = cfg.mail;

// Nodemailer transporter - actually does the sending
const transporter = nodemailer.createTransport({
  host: 'email-smtp.us-east-1.amazonaws.com',
  port: 465,
  secure: true,
  auth: mailCfg.auth
});


const sendMessage = ({ body: {sender, recipient, msg} }, res) => {
  console.log(mailCfg.sender, sender, recipient, msg);
  transporter.sendMail({
    to: recipient,
    replyTo: sender,
    from: mailCfg.sender,
    sender: mailCfg.sender,
    subject: `${moment().format('M/D/YYYY h:mm a')} - Textbook Anarchy Message`,
    text: msg
  }, (err) => {
    // Handle return values
    if (err) {
      console.log(err.message);
      res.status(500);
      res.send({ success: false, message: err.message });
    } else {
      res.send({ success: true });
    }
  });
};

export {
  sendMessage
};
