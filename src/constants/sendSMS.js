import nodemailer from "nodemailer";

// Function to send SMS
export const sendSMS = async (data) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtpout.secureserver.net",
      auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.EMAIL_PASS_KEY,
      },
    });

    const { otp, email } = data;

    // Email message
    const mailOptions = {
      from: process.env.USER_EMAIL,
      to: email,
      subject: "verification otp",
      html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>OTP Verification</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 20px;
            color: #333;
        }
        .container {
            background-color: #ffffff;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
            padding-bottom: 20px;
        }
        .header h1 {
            margin: 0;
            color: #4CAF50;
        }
        .otp-code {
            background-color: #f9f9f9;
            padding: 10px;
            border-radius: 4px;
            text-align: center;
            font-size: 24px;
            letter-spacing: 2px;
            color: #333;
            margin: 20px 0;
            border: 1px solid #ddd;
        }
        .message {
            font-size: 16px;
            line-height: 1.6;
        }
        .footer {
            margin-top: 20px;
            font-size: 12px;
            color: #777;
            text-align: center;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Your OTP Code</h1>
        </div>
        <div class="message">
            <p>Dear [User's Name],</p>
            <p>We received a request to verify your identity. Please use the following One-Time Password (OTP) to complete your verification process:</p>
            <div class="otp-code">${otp}</div>
            <p>This OTP is valid for the next 2 minutes. Please do not share this code with anyone.</p>
            <p>If you did not request this verification, please ignore this email or contact our support team.</p>
            <p>Thank you</p>
        </div>
        <div class="footer">
            <p>If you have any questions, please contact our support team.</p>
        </div>
    </div>
</body>
</html>`,
    };

    // Send email
    let info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully:", info.response);
    return "Email sent successfully";
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send email");
  }
};

// Function to send SMS
export const bookingConfirmSMS = async (data) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtpout.secureserver.net",
      auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.EMAIL_PASS_KEY,
      },
    });

    // Email message
    const userTripConfirmation = {
      from: process.env.USER_EMAIL,
      to: data["0"].email,
      subject: "Trip Confirmation",
      html: `<!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Trip Confirmation</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 20px;
            color: #333;
        }
        .container {
            background-color: #ffffff;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
            padding-bottom: 20px;
        }
        .header h1 {
            margin: 0;
            color: #4CAF50;
        }
        .trip-details {
            margin-top: 20px;
        }
        .trip-details h3 {
            margin-bottom: 10px;
            color: #333;
        }
        .trip-details p {
            margin: 5px 0;
        }
        .footer {
            margin-top: 20px;
            font-size: 12px;
            color: #777;
            text-align: center;
        }
    </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>Your Trip is Confirmed!</h1>
            </div>
            <div class="trip-details">
                <h3>Dear ${data["0"]?.client_name},</h3>
                <p>We are excited to confirm your upcoming trip to <strong>${data["0"]?.destination}</strong>. Below are your trip details:</p>
                <p><strong>Booking ID:</strong>${data["0"]?._id}</p>
                <p><strong>Destination:</strong> ${data["0"]?.destination}</p>
                <p><strong>Departure Date:</strong> ${data["0"]?.start_date}</p>
                <p><strong>Return Date:</strong>${data["0"]?.end_date}</p>
                <p><strong>Traveler(s):</strong> [Traveler Names]</p>
                <p><strong>Total Cost:</strong> ${data["0"]?.total_amount}</p>
                <p><strong>Advance paid:</strong> ${data["0"]?.paid_amount}</p>
                <p>Please keep this email for your records. If you have any questions or need to make changes to your booking, feel free to contact us.</p>
                <p>We wish you a wonderful trip!</p>
                <p>Best regards,<br>[Your Company Name]</p>
            </div>
            <div class="footer">
                <p>If you have any questions, please contact our support team at [Support Email] or [Support Phone Number].</p>
            </div>
        </div>
    </body>
    </html>
`,
    };

    // Send email
    let info = await transporter.sendMail(userTripConfirmation);
    console.log("Email sent successfully:", info.response);
    return "Email sent successfully";
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send email");
  }
};

// Function to send SMS
export const adminBookingConfirmSMS = async (data) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtpout.secureserver.net",
      auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.EMAIL_PASS_KEY,
      },
    });

    // Email message
    const userTripConfirmation = {
      from: process.env.USER_EMAIL,
      to: process.env.USER_EMAIL,
      subject: "Trip Confirmation",
      html: `<!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Booking</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 20px;
            color: #333;
        }
        .container {
            background-color: #ffffff;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
            padding-bottom: 20px;
        }
        .header h1 {
            margin: 0;
            color: #4CAF50;
        }
        .trip-details {
            margin-top: 20px;
        }
        .trip-details h3 {
            margin-bottom: 10px;
            color: #333;
        }
        .trip-details p {
            margin: 5px 0;
        }
        .footer {
            margin-top: 20px;
            font-size: 12px;
            color: #777;
            text-align: center;
        }
    </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>New Booking</h1>
            </div>
            <div class="trip-details">
                <h3>Dear ${data["0"]?.client_name},</h3>
                <p>We are excited to confirm your upcoming trip to <strong>${data["0"]?.destination}</strong>. Below are your trip details:</p>
                <p><strong>Booking ID:</strong>${data["0"]?._id}</p>
                <p><strong>Destination:</strong> ${data["0"]?.destination}</p>
                <p><strong>Departure Date:</strong> ${data["0"]?.start_date}</p>
                <p><strong>Return Date:</strong>${data["0"]?.end_date}</p>
                <p><strong>Traveler(s):</strong> [Traveler Names]</p>
                <p><strong>Total Cost:</strong> ${data["0"]?.total_amount}</p>
                <p><strong>Advance paid:</strong> ${data["0"]?.paid_amount}</p>
                <p>Please keep this email for your records. If you have any questions or need to make changes to your booking, feel free to contact us.</p>
                <p>We wish you a wonderful trip!</p>
                <p>Best regards,<br>[Your Company Name]</p>
            </div>
            <div class="footer">
                <p>If you have any questions, please contact our support team at [Support Email] or [Support Phone Number].</p>
            </div>
        </div>
    </body>
    </html>
`,
    };

    // Send email
    let info = await transporter.sendMail(userTripConfirmation);
    console.log("Email sent successfully:", info.response);
    return "Email sent successfully";
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send email");
  }
};
