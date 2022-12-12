const RoomModel = require("../models/Room");

module.exports.findRooms = async (roomIds) => {
    let rooms = [];
    try {
        for(var roomId of roomIds){
            const room = await RoomModel.find({_id: roomId});
            rooms.push(room[0]);
        }
        return rooms;
    } catch(err) {
        console.log(err);
        return err;
    }
};