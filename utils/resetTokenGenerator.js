const generateResetToken = async (user) => {
    const token = crypto.randomBytes(20).toString('hex');
    user.resetToken =token;
    user.resetToken
}