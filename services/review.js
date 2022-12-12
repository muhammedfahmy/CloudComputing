const { ObjectId } = require('mongoose').Types;

const reviewModel = require('../models/review');

module.exports.addNewReview = async (reviewInfo) => {
    try{
        const review = new reviewModel({
            rating: reviewInfo.rating,
            feedback: reviewInfo.feedback,
        });
    const createReview = await review.save();
    return createReview;
    }   catch(err){
        //throw new Error('Could not create complain.');
        throw new Error(console.log(err));
    }
};