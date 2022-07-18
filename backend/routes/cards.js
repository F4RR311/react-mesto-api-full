const router = require('express').Router();

const {
  getCard,
  createCard,
  likeCard,
  dislikeCard,
  deleteCard,
} = require('../controllers/cards');

const {
  validCardId, validCard,
} = require('../middlewares/validation');

router.get('/cards', getCard);
router.post('/cards', validCard, createCard);
router.delete('/cards/:cardId', validCardId, deleteCard);
router.put('/cards/:cardId/likes', validCardId, likeCard);
router.delete('/cards/:cardId/likes', validCardId, dislikeCard);

module.exports = router;
