const service = require("../services/mail.service");

const sendMail = async (req, res) => {
  const { name, subject, email, message } = req.body;

  try {
    const payload = await service.sendMailService(
      name,
      subject,
      email,
      message
    );
    res.status(200).json(payload);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { sendMail };
