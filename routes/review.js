const {Router} = require('express');

const reviewController = require('../controllers/review');

const reviewRouter = Router();

reviewRouter.post('/addReview', reviewController.postReview);


module.exports = reviewRouter;