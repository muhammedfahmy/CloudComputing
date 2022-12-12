
const {Schema, model} = require('mongoose');

const ReviewSchema = new Schema({
    rating: {
        type: 'Number',
        required: true
    },
    
    feedback: {
        type: 'String',
        required: true
    }
});

const reviewModel = model('review', ReviewSchema);

module.exports = reviewModel;