// import Express Router from express
const {Router} = require('express');

// import our complainController
const complainController = require('../controllers/complain');


// create an instance of Express Router
const complainRouter = Router();

complainRouter.get('/allComplains', complainController.getAllComplain);

complainRouter.post('/addComplains', complainController.postComplain);


// export the router instance we created
module.exports = complainRouter;
