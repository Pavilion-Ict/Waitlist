import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
 host: "smtp.zoho.com",
  auth: {
    user: process.env.NEXT_ZOHO_EMAIL,
    pass: process.env.NEXT_ZOHO_PASSWORD,
  },
});

interface SendEmailParams {
  to: string;
  name: string;
  subject?: string;
}

export async function sendConfirmationEmail({
  to,
  name,
  subject = "Welcome to Pavillion Tech!",
}: SendEmailParams) {
  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; }
          .header { background: linear-gradient(135deg, #3E4095 0%, #14142F 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; text-align: center; }
          .header h1 { margin: 0; font-size: 28px; }
          .content { padding: 20px; }
          .footer { background-color: #f5f5f5; padding: 15px; text-align: center; font-size: 12px; color: #666; border-radius: 0 0 8px 8px; }
          .button { display: inline-block; background: linear-gradient(135deg, #3E4095 0%, #14142F 100%); color: white !important; padding: 12px 30px; border-radius: 50px; text-decoration: none; margin-top: 20px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Welcome to Pavilion Tech!</h1>
          </div>
          <div class="content">
            <p>Hi <strong>${name}</strong>,</p>
            <p>Thank you for joining our waitlist! We're excited to have you as part of the Pavillion Tech community.</p>
            <p>We'll keep you updated on our latest news, products, and services. Stay tuned for exclusive offers and early access opportunities!</p>
            <p>If you have any questions, feel free to contact us anytime.</p>
            <a href="https://wa.me/c/2348188549945" class="button">Get in Touch</a>
            <p>Best regards,<br><strong>The Pavilion Tech Team</strong></p>
          </div>
          <div class="footer">
            <p>&copy; 2026 Pavilion Tech. All rights reserved.</p>
            <p>You received this email because you signed up for our waitlist.</p>
          </div>
        </div>
      </body>
    </html>
  `;

  try {
    const info = await transporter.sendMail({
      from: "Pavilion <" + process.env.NEXT_ZOHO_EMAIL + ">",
      to,
      subject,
      html: htmlContent,
    });

    console.log("Email sent successfully:", info.response);
    return { success: true, message: "Confirmation email sent!" };
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send confirmation email");
  }
}
