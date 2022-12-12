
const { ObjectId } = require('mongoose').Types;

const complainModel = require('../models/complain');

module.exports.findAllComplain = async () => {
    try{
        const complain = await complainModel.find();
        return complain;
    } catch(err){
        throw new Error('Could not retrieve complains');
    }
};

module.exports.addNewComplain = async (complainInfo) => {
    try{
        const complain = new complainModel({
            name: complainInfo.name,
            phoneNumber: complainInfo.phoneNumber,
            email: complainInfo.email,
            description: complainInfo.description,
        });
    const createComplain = await complain.save();
    return createComplain;
    }   catch(err){
        //throw new Error('Could not create complain.');
        throw new Error(console.log(err));
    }
};