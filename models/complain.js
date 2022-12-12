// import schema and model from mongoose
const {Schema, model} = require('mongoose');

const complainSchema = new Schema({
    name: {
        type: 'String',
        required: true
    },
    phoneNumber: {
        type: 'Number',
        required: true
    },
    email: {
        type: 'String',
        required: true
    },
    description: {
        type: 'String',
        required: true
    }
});

const complainModel = model('complain', complainSchema);

module.exports = complainModel;

