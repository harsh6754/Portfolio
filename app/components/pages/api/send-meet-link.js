import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { meetLink, meetDate, meetTime, companyName, companyUrl } = req.body;

  // Configure your SMTP transporter (use environment variables in production)
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER, // your gmail address
      pass: process.env.GMAIL_PASS, // your gmail app password
    },
  });

  const mailOptions = {
    from: `"Portfolio Bot" <${process.env.GMAIL_USER}>`,
    to: "agrawalharsh1028@gmail.com",
    subject: "New Google Meet Scheduled via Portfolio",
    html: `
      <h2>New Google Meet Scheduled</h2>
      <p><b>Company:</b> <a href="${companyUrl}" target="_blank">${companyName}</a></p>
      <p><b>Date:</b> ${meetDate}</p>
      <p><b>Time:</b> ${meetTime}</p>
      <p><b>Meet Link:</b> <a href="${meetLink}" target="_blank">${meetLink}</a></p>
      <br/>
      <p>This email was sent automatically from the portfolio site.</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}