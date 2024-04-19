module.exports = {
  genHash(crypto, msg, key) {
    if (!msg) {
      return '';
    }
    return crypto.createHmac('sha256', key).update(msg).digest('hex');
  },
};
