const ReviewService = require('../services/review');


module.exports.postReview = async (req, res) => {
    const reviewInfo = {
        rating: req.body.rating,
        feedback: req.body.feedback
    };
    try{
        const createReview = await ReviewService.addNewReview(reviewInfo);
        return res.status(201).send({
            msg: 'Review sent successfully.',
            reviewId: createReview._id
        });
    }   catch(err){
        return res.status(500).send({
            //error: err.message
            error: console.log(err) 
            
        });
    }
};