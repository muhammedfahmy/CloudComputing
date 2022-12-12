const { Schema, model } = require("mongoose");
const RoomModel = require("./Room");

const HotelSchema = new Schema({
    name: {
        type: 'String',
        required: true
    },
    phoneNumber: {
        type: 'String',
        required: false
    },
    description: {
        type: 'String',
        required: true
    },
    address: {
        type: 'String',
        required: true
    },
    rooms: {
        type: [Schema.Types.ObjectId],
        ref: 'room',
        required: false
    },
    imageURI: {
        type: 'String',
        required: false

    }
});

const HotelModel = model('hotel', HotelSchema);
module.exports = HotelModel;