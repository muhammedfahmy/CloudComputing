const HotelModel = require("../models/Hotel");
const RoomModel = require("../models/Room");
const roomsService = require("./rooms");

module.exports.findAllHotels = async () => {
    try {
        const hotels = await HotelModel.find();
        return hotels;
    } catch(err) {
        console.log(err);
    }
};

module.exports.addNewHotel = async (hotelInfo) => {
    try {
        const hotel = new HotelModel({
            name: hotelInfo.name,
            phoneNumber: hotelInfo.phoneNumber,
            description: hotelInfo.description,
            address: hotelInfo.address,
            imageURI: hotelInfo.imageURI
        });
        const createdHotel = await hotel.save();
        return createdHotel;
    } catch(err) {
        console.log(err);
    }
};

module.exports.addHotelRoom = async (roomInfo) => {
    try {
        let hotel = await this.findHotelById(roomInfo.hotelId);
        const room = new RoomModel({
            type: roomInfo.type,
            facilities: roomInfo.facilities,
            number: roomInfo.number,
            capacity: roomInfo.capacity,
            reserved: roomInfo.reserved,
            imageURI: roomInfo.imageURI
        });
        const createdRoom = await room.save();
        hotel.rooms.push(createdRoom);
        hotel.save();
        return createdRoom;
    } catch(err) {
        console.log(err);
    }
};

module.exports.findHotelById = async (hotelId) => {
    try {
        const hotel = await HotelModel.find({_id: hotelId});
        return hotel[0];
    } catch(err) {
        console.log(err);
    }
};

module.exports.findHotelRooms = async (hotelId) => {
    try {
        const result = await HotelModel.find({_id: hotelId});
        const roomIds = result[0].rooms;
        const rooms = roomsService.findRooms(roomIds);
        return rooms;
    } catch(err) {
        console.log(err);
    }
};