const complainService = require('../services/complain');

module.exports.getAllComplain = async (req, res) => {
    try{
        const complains = await complainService.findAllComplain();
        res.send({ complains })
    } catch(err){
        // this denotes a server error, therfore status code should be 500.
        res.status(500);
        res.send({
            //error: err
            error: console.log(err) 
        });
    }
};

module.exports.postComplain = async (req, res) => {
    const complainInfo = {
        name: req.body.name,
        phoneNumber: req.body.phoneNumber,
        email: req.body.email,
        description: req.body.description
    };
    try{
        const createComplain = await complainService.addNewComplain(complainInfo);
        return res.status(201).send({
            msg: 'complain sent successfully.',
            complainId: createComplain._id
        });
    }   catch(err){
        return res.status(500).send({
            //error: err.message
            error: console.log(err) 
            
        });
    }
};