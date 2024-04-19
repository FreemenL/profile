const express = require('express');
const ProfileController = require('../controller/profile-controller');
const UserController = require('../controller/user-controller');

const apiRouter = express.Router();

const profileRouter = express.Router();
const userRouter = express.Router();

apiRouter.use('/profile', profileRouter);
apiRouter.use('/user', userRouter);

profileRouter.get('/detail/:userId', (req, res) => {
  ProfileController.getProfileDetail(req, res);
});

profileRouter.post('/', (req, res) => {
  ProfileController.updateUserProfile(req, res);
});

userRouter.post('/add', (req, res) => {
  UserController.addUser(req, res);
});

module.exports = apiRouter;
