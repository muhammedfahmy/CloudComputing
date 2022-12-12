const { Schema, model } = require("mongoose");

const RoomSchema = new Schema({
    type: {
        type: Number,
        required: true,
        enum: [1, 2, 3]
    },
    facilities: {
        type: [String],
        required: true,
        enum: ["AC", "WiFi", "Parking", "Sea View", "Gym"]
    },
    number: {
        type: Number,
        required: true
    },
    capacity: {
        type: Number,
        required: true,
    },
    reserved: {
        type: Boolean,
        required: true
    },
    imageURI: {
        type: 'String',
        required: false

    }
});

const RoomModel = model('room', RoomSchema);
module.exports = RoomModel;