const router = require('express').Router();

const {
  getUser,
  getUserId,
  updateUserInfo,
  updateAvatar,
  getUserMe,
} = require('../controllers/users');

const {
  validUserId,
  validAboutUser,
  validAvatar,
} = require('../middlewares/validation');

router.get('/users', getUser);
router.get('/users/me', validUserId, getUserMe);
router.get('/users/:userId', validUserId, getUserId);
router.patch('/users/me', validAboutUser, updateUserInfo);
router.patch('/users/me/avatar', validAvatar, updateAvatar);

module.exports = router;
