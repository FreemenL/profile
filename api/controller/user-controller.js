const validator = require('email-validator');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const userModel = require('../models/user.js');
const Util = require('../libs/index');

module.exports = {
  async addUser(req, res) {
    try {
      const isValidEmail = validator.validate(req.body.email);
      if (isValidEmail) {
        const existingUserByEmail = await userModel.getUserByEmailOrName(req.body.email);
        const existingUserByUserName = await userModel.getUserByEmailOrName(req.body.username);
        if (existingUserByEmail || existingUserByUserName) {
          res.status(500).send({ err: 'user_exists' });
          return;
        }
        req.body.hash_stamp = Buffer.from(new Date().getTime().toString()).toString('base64');
        req.body.password = Util.genHash(crypto, req.body.password, req.body.hash_stamp);
        req.body.image = req.body.gender;
        req.body.active = true;
        req.body.activationToken = jwt.sign({ username: req.body.username }, 'test_active_auth', {
          expiresIn: '24h',
        });
        await userModel.createUser(req.body);
        res.status(200).json({ success: true, message: 'add user success' });
      } else {
        res.status(500).send({ err: 'invalid_email_address' });
      }
    } catch (error) {
        res.status(500).send(error);
    }
  },
};
