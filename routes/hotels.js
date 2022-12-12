const { Router } = require('express');

const hotelsController = require('../controllers/hotels');
const hotelsRouter = Router();
hotelsRouter.get('/', hotelsController.getHotels);
hotelsRouter.post('/', hotelsController.postHotel);
hotelsRouter.get('/:id', hotelsController.getHotel);
hotelsRouter.post('/:id/rooms', hotelsController.postRoom);
hotelsRouter.get('/:id/rooms', hotelsController.getHotelRooms);

module.exports = hotelsRouter;