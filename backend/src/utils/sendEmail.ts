import nodemailer from "nodemailer";

export const sendEmailForAcceptingAndRejecting = async (
  to: string,
  subject: string,
  text: string
) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `"Job Portal" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    text,
  });
};

export const sendEmailForApplying = async (
  recipient_name: string,
  to: string,
  from: string,
  title: string
) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; max-width: 600px; padding: 20px; margin: auto; border: 1px solid #ddd; border-radius: 8px;">
      <p style="font-size: 18px; font-weight: bold; color: #333;">Application Received – Thank You for Applying</p>

      <p style="font-size: 16px; color: #333;">Dear <strong>${recipient_name}</strong>,</p>

      <p style="font-size: 15px; color: #555;">
        Thank you for applying for the <strong>${title}</strong> position at <strong>[Company Name]</strong>. 
        We have received your application and appreciate your interest in joining our team.
      </p>

      <p style="font-size: 15px; color: #555;">
        Our hiring team is currently reviewing applications, and if your profile matches our requirements, 
        we will reach out to you for the next steps.
      </p>



      <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;" />

      <p style="font-size: 14px; color: #888;"><strong>Note:</strong> This is an automated email. <strong>Please do not reply to this email.</strong></p>

      <p style="font-size: 15px; color: #333;"><strong>Best regards,</strong><br>${from}<br><strong>[Company Name]</strong></p>
    </div>
  `;

  await transporter.sendMail({
    from: `"Job Portal from Company Name"`,
    to,
    subject: "Application Received – Thank You for Applying",
    html: htmlContent,
  });
};
