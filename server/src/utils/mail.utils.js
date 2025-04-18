import dotenvConfig from "../config/dotenv.config.js";
import transporter from "../config/mail.config.js";
import ErrorHandler from "./ErrorHandler.utils.js";

const sendMail = async ({ to, subject, text = "", html = "" }) => {
  try {
    if (!to || !subject) {
      throw new ErrorHandler(400, "To va Subject majburiy maydonlar");
    }

    const mail = await transporter.sendMail({
      from: dotenvConfig.SMTP_USER,
      to,
      subject,
      text,
      html,
    });

    return mail.messageId;
  } catch (error) {
    console.log("Email yuborishda xatolik:", error.message);
    throw new ErrorHandler(500, "Email yuborishda xatolik");
  }
};

export default sendMail