const userModel = require('../models/user.js');

module.exports = {
  async getUserProfile(req, res) {
    try {
      const { userId } = req.params;
      const result = await userModel.findOne(
        { _id: userId },
        {
          email: 1,
          username: 1,
          userImg: 1,
          address: 1,
          personal: 1,
          hourlyRate: 1,
          bkgImg: 1,
          experiences: 1,
          followers: 1,
          followings: 1,
          hashTag: 1,
          isPresend: 1,
        }
      );
      return res.status(200).json({ success: true, profile: result });
    } catch (error) {
      return res.status(400).send({ success: false, error: error.message });
    }
  },

  async updateUserProfile(req, res) {
    try {
      const result = await userModel.updateProfile(req.body.userId, req.body);
      return res.status(200).json({ success: true, profile: result });
    } catch (error) {
      return res.status(400).send({ success: false, error: error.message });
    }
  },
  async getProfileDetail(req, res) {
    try {
      const { userId } = req.params;
      const user = await userModel.findOne({ _id: userId });
      if (user) {
        user.password = null;
        user.hash_stamp = null;
        user.activationToken = null;
        res.status(200).send({
          data: user,
        });
      } else res.status(400).send({ err: "the user doesn't exist" });
    } catch (err) {
      res.status(500).send({ err });
    }
  },
};
