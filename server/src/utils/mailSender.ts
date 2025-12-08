import nodemailer from "nodemailer";

export const mailSender = async (email: string, title: string, body: string) => {
    const transporter = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS,
        },
    });

    const info = await transporter.sendMail({
        from: "BharatKatha || by Dhruv Chadha",
        to: email,
        subject: title,
        html: body,
    });

    console.log("Info of sent mail: ", info);
    return info;
};
