import nodemailer from "nodemailer";

// Function to send SMS
export const sendSMS = async (data) => {
  try {
    const transporter = nodemailer.createTransport({
      // host: "smtpout.secureserver.net",
      service: 'gmail',
      auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.EMAIL_PASS_KEY,
      },
    });

    const { otp, email } = data;

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

    // Send email asynchronously
    transporter
      .sendMail(mailOptions)
      .then((info) => console.log("Email sent successfully:", info.response))
      .catch((error) => console.error("Error sending email:", error));

    // Return immediately
    return "Email process initiated successfully";
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send email");
  }
};

// Function to send SMS
export const bookingConfirmSMS = async (data) => {
  try {
    const transporter = nodemailer.createTransport({
      // host: "smtpout.secureserver.net",
      service: 'gmail',
      auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.EMAIL_PASS_KEY,
      },
    });
    const userTripConfirmation = {
      from: process.env.USER_EMAIL,
      to: data.email,
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
                <h3>Dear ${data?.client_name},</h3>
                <p>We are excited to confirm your upcoming trip to <strong>${data?.destination}</strong>. Below are your trip details:</p>
                <p><strong>Booking ID:</strong>${data?._id}</p>
                <p><strong>Destination:</strong> ${data?.destination}</p>
                <p><strong>Departure Date:</strong> ${data?.start_date}</p>
                <p><strong>Return Date:</strong>${data?.end_date}</p>
                <p><strong>Traveler(s):</strong> [Traveler Names]</p>
                <p><strong>Total Cost:</strong> ${data?.total_amount}</p>
                <p><strong>Advance paid:</strong> ${data?.paid_amount}</p>
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

    // Send email asynchronously
    transporter
      .sendMail(userTripConfirmation)
      .then((info) => console.log("Email sent successfully:", info.response))
      .catch((error) => console.error("Error sending email:", error));

    // Return immediately
    return "Email process initiated successfully";
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send email");
  }
};

// Function to send SMS
export const adminBookingConfirmSMS = async (data) => {
  try {
    const transporter = nodemailer.createTransport({
      // host: "smtpout.secureserver.net",
      service: 'gmail',
      auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.EMAIL_PASS_KEY,
      },
    });

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
                <h3>Dear ${data?.client_name},</h3>
                <p>We are excited to confirm your upcoming trip to <strong>${data?.destination}</strong>. Below are your trip details:</p>
                <p><strong>Booking ID:</strong>${data?._id}</p>
                <p><strong>Destination:</strong> ${data?.destination}</p>
                <p><strong>Departure Date:</strong> ${data?.start_date}</p>
                <p><strong>Return Date:</strong>${data?.end_date}</p>
                <p><strong>Traveler(s):</strong> [Traveler Names]</p>
                <p><strong>Total Cost:</strong> ${data?.total_amount}</p>
                <p><strong>Advance paid:</strong> ${data?.paid_amount}</p>
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

    // Send email asynchronously
    transporter
      .sendMail(userTripConfirmation)
      .then((info) => console.log("Email sent successfully:", info.response))
      .catch((error) => console.error("Error sending email:", error));

    // Return immediately
    return "Email process initiated successfully";
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send email");
  }
};

// Function to send SMS
export const customBookingConfirmSMS = async (data) => {
  try {
    const transporter = nodemailer.createTransport({
      // host: "smtpout.secureserver.net",
      service: 'gmail',
      auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.EMAIL_PASS_KEY,
      },
    });

    const userTripConfirmation = {
      from: process.env.USER_EMAIL,
      to: data?.email,
      subject: "Trip Confirmation",
      html: `<a href="https://comeflywithme.co.in/${data?.destination}/${data?.package}/${data?.plan}?token=${data?.accessToken}">https://comeflywithme.co.in/${data?.destination}/${data?.package}/${data?.plan}?token=${data?.accessToken}</a>`,
    };

    // Send email asynchronously
    transporter
      .sendMail(userTripConfirmation)
      .then((info) => console.log("Email sent successfully:", info.response))
      .catch((error) => console.error("Error sending email:", error));

    // Return immediately
    return "Email process initiated successfully";
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send email");
  }
};
