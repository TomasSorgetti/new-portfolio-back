const service = require("../services/mail.service");

const sendMail = async (req, res, next) => {
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
    next(error);
  }
};

module.exports = { sendMail };
