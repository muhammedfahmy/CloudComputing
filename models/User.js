const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,

        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        default: ""
    },
    lastName: {
        type: String,
        default: ""
    },
    email: {
        type: String,
        required: false
    },
    address: {
        street: String,
        city: String,
        zipcode: Number,
        state: String
    },
    billingAddress: {
        firstName:
            String, lastName: String,
        street: String,
        city: String,
        zipcode: String,
        state: String
    },
    phoneNumber: String,
    
    totalNights:
    {
        type: Number,
        default: 0
    },

    cardInfo:
    {
        cardType: String,
        cardNumber: String,
        nameOnCard: String,
        expDate: String,
        cardCvc: String
    },
    reservation: [{ type: Schema.Types.ObjectId, ref: 'Reservation' }],
    createAt: { type: Date, default: Date.now }
})

// built-in methods in Schema object
userSchema.pre('save', async function (next) {
    const saltRounds = 10;
    // isNew: Boolean flag specifying if the document is new.
    // isModified(FieldName): Returns true if any of the given paths is modified, else false.
    if (this.isNew || this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, saltRounds);
    }
})

userSchema.methods.isCorrectPassword = function (password) {
    return bcrypt.compare(password, this.password);
}

const User = mongoose.model('User', userSchema);

module.exports = User;