import axios from "axios";

export const mailSender = async (email: string, title: string, body: string) => {
    const url = "https://api.brevo.com/v3/smtp/email";

    const payload = {
        sender: {
            email: process.env.BREVO_FROM_EMAIL,
            name: process.env.BREVO_FROM_NAME,
        },
        to: [{ email }],
        subject: title,
        htmlContent: body,
    };

    const response = await axios.post(url, payload, {
        headers: {
            "Content-Type": "application/json",
            "api-key": process.env.BREVO_API_KEY!,
        },
    });

    console.log("Mail sent: ", response.data);
    return response.data;
};
