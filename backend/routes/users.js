const router = require('express').Router();

const {
  getUsers,
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

router.get('/users', getUsers);
router.get('/users/me',  getUserMe);
router.get('/users/:userId', validUserId, getUserId);
router.patch('/users/me', validAboutUser, updateUserInfo);
router.patch('/users/me/avatar', validAvatar, updateAvatar);

module.exports = router;