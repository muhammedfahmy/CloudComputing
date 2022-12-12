const hotelService = require('../services/hotels');

module.exports.getHotels = async (req, res) => {
    try {
        const hotels = await hotelService.findAllHotels();
        res.send({ hotels });
    } catch (err) {
        res.status(500);
        res.send({
            error: error
        });
    }
};

module.exports.getHotel = async (req, res) => {
    try {
        const hotelId = req.params.id;
        const hotel = await hotelService.findHotelById(hotelId);
        res.send({hotel});
    } catch (err) {
        res.status(500);
        res.send({
            error: error
        });
    }
};

module.exports.getHotelRooms = async (req, res) => {
    try {
        const hotelId = req.params.id;
        const rooms = await hotelService.findHotelRooms(hotelId);
        res.send({rooms});
    } catch (err) {
        res.status(500);
        res.send({
            error: error
        });
    }
};

module.exports.postHotel = async (req, res) => {
    const hotelInfo = {
        name: req.body.name,
        phoneNumber: req.body.phoneNumber,
        description: req.body.description,
        address: req.body.address,
        imageURI: req.body.imageURI
    };
    try {
        const createdHotel = await hotelService.addNewHotel(hotelInfo);
        return res.status(201).send({
            result: 'Hotel added successfully',
            hotelId: createdHotel._id
        });
    } catch (error) {
        res.status(500);
        res.send({
            error: error
        });
    }
};

module.exports.postRoom = async (req, res) => {
    const roomInfo = {
        hotelId: req.params.id,
        type: req.body.type,
        facilities: req.body.facilities,
        number: req.body.number,
        capacity: req.body.capacity,
        imageURI: req.body.imageURI,
        reserved: false
    };
    try {
        const createdRoom = await hotelService.addHotelRoom(roomInfo);
        return res.status(201).send({
            result: 'Room added successfully',
            roomId: createdRoom._id
        });
    } catch (error) {
        res.status(500);
        res.send({
            error: error
        });
    }
};