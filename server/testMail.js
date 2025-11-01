require("dotenv").config();
const nodemailer = require("nodemailer");

async function testSMTP() {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.ADMIN_EMAIL,
        pass: process.env.ADMIN_PASSWORD,
      },
    });

    await transporter.verify();
    console.info("✅ Connexion SMTP réussie !");
  } catch (err) {
    console.error("❌ Erreur SMTP :", err);
  }
}

testSMTP();
