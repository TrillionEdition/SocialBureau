const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const { generateGoogleMeetLink } = require('./src/utils/googleMeetGenerator.cjs');

dotenv.config();

async function main() {
  console.log('--- Starting Test Email with Real Link Generator ---');
  
  // 1. Generate the link
  const meetLink = await generateGoogleMeetLink();
  console.log('Generated Link:', meetLink);

  // 2. Setup Transporter
  const transporter = nodemailer.createTransport({
    service: process.env.MAIL_SERVICE || 'gmail',
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  // 3. Define Mail Options
  const mailOptions = {
    from: process.env.MAIL_USER,
    to: 'webasst.socialbureau@gmail.com',
    subject: 'SocialBureau: Your Meeting Link is Ready',
    html: `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #ddd; border-radius: 12px; overflow: hidden; background-color: #ffffff;">
        <div style="background-color: #111; padding: 30px; text-align: center;">
          <h1 style="color: #fff; margin: 0; font-size: 24px;">SocialBureau Partnerships</h1>
        </div>
        <div style="padding: 40px; color: #333;">
          <h2 style="color: #111; margin-top: 0;">Meeting Confirmation</h2>
          <p>Hi there,</p>
          <p>Your partnership discussion is scheduled. You can join the meeting using the official link below:</p>
          
          <div style="margin: 30px 0; text-align: center;">
            <a href="${meetLink}" style="background-color: #111; color: #fff; padding: 16px 32px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">
              Join Google Meet
            </a>
          </div>
          
          <p style="font-size: 14px; color: #666;">Link: <a href="${meetLink}" style="color: #007bff;">${meetLink}</a></p>
          
          <p style="margin-top: 30px;">This link was generated automatically by our new integration.</p>
          <hr style="border: 0; border-top: 1px solid #eee; margin: 30px 0;">
          <p style="font-size: 12px; color: #999; text-align: center;">© 2026 SocialBureau. All rights reserved.</p>
        </div>
      </div>
    `,
  };

  // 4. Send the mail
  try {
    console.log('Sending email...');
    const info = await transporter.sendMail(mailOptions);
    console.log('Success! Email sent: ' + info.response);
  } catch (error) {
    console.error('Error sending email:', error);
  }
}

main();
