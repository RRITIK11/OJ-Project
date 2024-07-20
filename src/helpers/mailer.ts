import User from "@/models/user.model";
import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";

interface data {
  email: string;
  emailType: string;
  userId: string;
}

export const sendEmail = async ({ email, emailType, userId }: data) => {
  try {
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);
    console.log(" Hashed Token : ",hashedToken);

    // TODO: configure mail for usage
    if (emailType === "VERIFY") {
      const a = await User.findByIdAndUpdate(userId, {
        $set: {
          verifyToken: hashedToken,
          verifyTokenExpiry: Date.now() + 900000,
        },
      });
      console.log("Updated User : ",a);
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
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

    console.log("Transpot : ",transport);

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
    console.log("Mail Response : ",mailResponse)

    setTimeout(async ()=>{
      const a = await User.findById(userId);
      console.log("User : ",a);
      if(a.isVerified == false){
        await User.findByIdAndDelete(a._id);
        console.log("User deleted")
      }
    },900000)

    return mailResponse;
  } catch (error: any) {
    const a = await User.findByIdAndDelete(userId);
    console.log("User Delete : ",a);
    throw new Error(error.message);
  }
};
