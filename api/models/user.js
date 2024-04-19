const mongoose = require('mongoose');
const validator = require('email-validator');
const { v4 } = require('uuid');

const uuidv4 = v4;
// user schema
const userSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: () => uuidv4().replace(/-/g, ''),
    },
    email: String,
    username: String,
    hash_stamp: String,
    password: String,
    bkgImg: String,
    userImg: String,
    address: {
      detail: String,
      state: String,
      city: String,
      zip: String,
      country: String,
    },
    personal: {
      firstname: String,
      lastname: String,
      phone: String,
      fax: String,
      birth: Date,
      career: String,
      gender: { type: String, enum: ['Male', 'Female', 'Others'] },
      description: String,
      introduction: String,
    },
    hourlyRate: Number,
    followers: [String],
    followings: [String],
    hashTag: [String],
    employed: {
      type: Boolean,
      default: false,
    },
    employer: String,
    employedActivated: {
      type: Boolean,
      default: false,
    },
    activationToken: String,
    settings: {
      accountType: {
        type: String,
        enum: ['public', 'private'],
      },
      accountReceivable: {
        type: String,
        enum: ['paypal', 'Venmo', 'GooglePay'],
      },
      paymentEmail: String,
      replayAccount: String,
      organizationEmail: String,
      guardianEmail: String,
      visiable: Number,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    lang: String,
    userType: String,
    userRole: [{ type: String, ref: 'UserRole' }],
    nickName: String,
    website: String,
    code: String,
    bio: String,
    fax: String,
    timeZone: String,
    recordEmail: String,
    lastLoginTime: Date,
  },
  {
    timestamps: true,
    collection: 'users',
  }
);

/**
 * @param {String} firstName
 * @param {String} lastName
 * @returns {Object} new user object created
 */
userSchema.statics.createUser = async function createUser(param) {
  let user;
  try {
    user = await this.create({ ...param });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    throw error;
  }
  return user;
};

/* decreped */
userSchema.statics.getUserByName = async function getUserByName(username) {
  try {
    const user = await this.findOne({ username });
    return user;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    throw error;
  }
};
/* decreped */
userSchema.statics.getUserByName = async function getUserByName(username) {
  let user;
  try {
    user = await this.findOne({ username });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    throw error;
  }
  return user;
};

userSchema.statics.getUserByEmailOrName = async function getUserByEmailOrName(emailOrName) {
  let user = null;
  try {
    if (validator.validate(emailOrName)) {
      // this is email
      user = await this.findOne({
        email: { $regex: `^${emailOrName}$`, $options: 'i' },
      });
    } else {
      user = await this.findOne({
        username: { $regex: `^${emailOrName}$`, $options: 'i' },
      });
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    throw error;
  }
  return user;
};
/**
 * @param {String} id - id of user
 * @return {Object} - details of action performed
 */
userSchema.statics.deleteByUserById = async function deleteByUserById(id) {
  let result;
  try {
    result = await this.remove({ _id: id });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    throw error;
  }
  return result;
};

/**
 * @param {String} id, user id
 * @return {Object} User profile object
 */
userSchema.statics.getUserById = async function (id) {
  try {
    const user = await this.findOne(
      { _id: id },
      {
        email: 1,
        username: 1,
        userImg: 1,
        bkgImg: 1,
        address: 1,
        personal: 1,
        settings: 1,
        experiences: 1,
        hourlyRate: 1,
        hashTag: 1,
        active: 1,
      }
    );
    if (!user) throw { error: "No user with this id found" };
    return user;
  } catch (error) {
    throw error;
  }
};

userSchema.statics.updateProfile = async function updateProfile(id, params) {
  let resultUser;
  try {
    const user = await this.getUserById(id);
    // update personal information
    if (params.personal) {
      const { phone, name, birth, career, gender, description, fax } = params.personal;
      if (user.personal == null) {
        user.personal = {};
      }
      if (name) user.username = name;
      user.personal = {
        ...user.personal,
        phone,
        name,
        birth,
        career,
        gender,
        description,
        fax,
      };
    }
    // update address information
    if (params.address) {
      const { detail, state, city, zip, country } = params.address;
      if (user.address == null) {
        user.address = {};
      }
      user.address = { ...user.address, detail, state, city, zip, country };
    }
    if (params.hourlyRate) user.hourlyRate = params.hourlyRate;

    const { userImg, bkgImg, nickName, website, phone, bio } = params;
    if (userImg) user.userImg = userImg;
    if (bkgImg) user.bkgImg = bkgImg;
    user.nickName = nickName;
    user.website = website;
    user.phone = phone;
    user.bio = bio;

    if (params.hashTag) user.hashTag = params.hashTag;
    const { _id } = user;
    await this.updateOne({ _id }, user);
    resultUser = await this.findOne({ _id });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    throw error;
  }
  return resultUser;
};

userSchema.statics.updateProfileBkgImg = async function updateProfileBkgImg(id, newBkgImg) {
  try {
    await this.findOneAndUpdate(
      {
        _id: id,
      },
      {
        bkgImg: newBkgImg,
      }
    );
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    throw error;
  }
};

userSchema.statics.updateProfileUserImg = async function updateProfileUserImg(id, newUserImg) {
  try {
    await this.findOneAndUpdate(
      {
        _id: id,
      },
      {
        userImg: newUserImg,
      }
    );
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    throw error;
  }
};

module.exports = mongoose.model('User', userSchema);
