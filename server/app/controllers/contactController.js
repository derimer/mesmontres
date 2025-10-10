/* eslint-disable camelcase */

const nodemailer = require("nodemailer");
const ContactRepository = require("../../database/models/contactRepository");

const contactRepository = new ContactRepository();

// Stocker un message et envoyer un mail à l’administrateur
exports.storeMessage = async (req, res) => {
  const { name, email, subject, message } = req.body;
  const ip_address = req.ip;
  const user_agent = req.headers["user-agent"];

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ message: "Champs obligatoires manquants." });
  }

  try {
    // 💾 Enregistrer dans la base
    const id = await contactRepository.create({
      name,
      email,
      subject,
      message,
      ip_address,
      user_agent,
    });

    console.info("Message saved successfully with ID:", id);

    // ✉️ Envoi de mail à l’administrateur
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com", // ou ton serveur SMTP
      port: 587,
      secure: false,
      auth: {
        user: process.env.ADMIN_EMAIL, // ton adresse email admin
        pass: process.env.ADMIN_PASSWORD, // mot de passe ou app password
      },
    });

    const mailOptions = {
      from: `"Formulaire Contact" <${process.env.ADMIN_EMAIL}>`,
      to: process.env.ADMIN_EMAIL, // l’admin reçoit le message
      subject: `📩 Nouveau message de ${name} - ${subject}`,
      text: `
Vous avez reçu un nouveau message depuis le formulaire de contact :

Nom : ${name}
Email : ${email}
Sujet : ${subject}

Message :
${message}

Informations techniques :
IP : ${ip_address}
User-Agent : ${user_agent}
      `,
    };

    await transporter.sendMail(mailOptions);
    console.info("✅ Email envoyé à l'administrateur avec succès");

    return res.status(200).json({
      success: true,
      message: "Votre message a été envoyé avec succès !",
      id,
    });
  } catch (error) {
    console.error("❌ Erreur dans storeMessage :", error);
    return res
      .status(500)
      .json({ message: "Erreur serveur : impossible d'envoyer le message." });
  }
};

// Récupérer les messages
exports.getMessages = async (req, res) => {
  try {
    const messages = await contactRepository.getAllMessages();
    res.json(messages);
  } catch (error) {
    console.error("Erreur dans getMessages:", error);
    res.status(500).json({
      message: "Erreur serveur : impossible de récupérer les messages.",
    });
  }
};
