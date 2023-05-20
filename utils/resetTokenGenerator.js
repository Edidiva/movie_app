const crypto = require('crypto');

const generateResetToken = async (user) => {
    const token = crypto.randomBytes(20).toString('hex');
    user.resetToken =token;
    user.resetTokenExpiration = Date.now() + 60*60*60;
    await user.save();
    return token;
};

module.exports = {generateResetToken};


