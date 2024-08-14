import User, { UserInterface } from "@/models/user.model";
import nodemailer from "nodemailer";
import { v4 as uuid } from "uuid";

interface mailerInterface {
  email: string;
  emailType: string;
  username: string;
}

export const sendEmail = async ({ email, emailType, username }: mailerInterface) => {
  try {
    const hashedToken = uuid();

    // TODO: configure mail for usage
    if (emailType === "VERIFY") {
      await User.findOneAndUpdate({username:username}, {
        $set: {
          verifyToken: hashedToken,
          verifyTokenExpiry: Date.now() + 900000,
        },
      });
    } else if (emailType === "RESET") {
      await User.findOneAndUpdate({username : username}, {
        $set: {
          forgotPasswordToken: hashedToken,
          forgotPasswordTokenExpiry: Date.now() + 900000,
        },
      });
    }

    const transport = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: 587,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
      secure: false,
    });

    const mailOptions = {
      from: `"Algo Galaxy | Online Judge" <${process.env.MAIL_USER}>`, // sender address
      to: email, // list of receivers
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your password", // Subject line
      //   text: "Hello world?", // plain text body
      html: `<p>Click <a href="${
        process.env.DOMAIN
      }/verifyemail?token=${hashedToken}"> here</a> to ${
        emailType === "VERIFY" ? "verify your email" : "reset your password"
      } or copy and paste the link below in your browser. <br> ${
        process.env.DOMAIN
      }/verifyemail?token=${hashedToken}</p>
      <br>
      <h1>Note : This link will be valid for next 15 minutes only.</h1>`, // html body
    };

    const mailResponse = await transport.sendMail(mailOptions);

    setTimeout(async ()=>{
      const user : any = await User.findOne({username : username});
      if(user.isVerified === false){
        await User.findOneAndDelete({username:username});
      }
    },900000)

    return mailResponse;
  } catch (error: any) {
    await User.findOneAndDelete({username:username});
    throw new Error(error.message);
  }
};
