const { Reservation, User } = require('../models');
const mongoose = require('mongoose');


const getReservation = async () => {
    try {
        const response = await Reservation.find({});
        return response;
    } catch (error) {
        return { message: "Cannot find the reservation", error }
    }
}

const getReservationById = async (id) => {
    try {
        const response = await Reservation.find({ "_id": id });
        return response;
    } catch (error) {
        return { message: "Cannot find the reservation", error };
    }
}
const getReservationsByDay = async (isoStart, isoEnd, roomId) => {
    //finds noncancelled reservations that overlap a specified day for a specified room

    try {
        let isoDay = isoStart.slice(-2);
        let isoMonth = isoStart.slice(5, 7);
        let isoYear = isoStart.slice(0, 4);
        const inDate = new Date(isoYear, isoMonth - 1, isoDay); //breaking up iso date is necessary to avoid timezone issues
        isoDay = isoEnd.slice(-2);
        isoMonth = isoEnd.slice(5, 7);
        isoYear = isoEnd.slice(0, 4);
        const outDate = new Date(isoYear, isoMonth - 1, isoDay); //breaking up iso date is necessary to avoid timezone issues

        const timeDif = (new Date(isoEnd)).getTime() - (new Date(isoStart)).getTime(); //milliseconds
        const nights = timeDif / (1000 * 3600 * 24); //convert to days
        console.log(nights);

        let reservationsByDay = [];
        for (let i = 0; i < nights; i++) {
            let daysInMs = i * 24 * 60 * 60 * 1000; //hours, minutes, seconds, milliseconds
            let date = new Date(inDate.getTime() + daysInMs); //date can take ms as argument
            console.log(date);
            let reservations = await Reservation.find({
                dateStart: { $lte: date }, dateEnd: { $gt: date },
                roomId: roomId, isCancel: false
            });
            reservationsByDay.push(reservations);
        }

        return reservationsByDay; //returns a 2d array; an array for every day between start and end dates 
    } catch (error) {
        return { message: "Cannot find the reservation", error };
    }
}
const cancelReservationById = async (id, userId) => {
    try {
        console.log("reservation id", id)
        console.log("user id", userId)

        const userData = await User.find({ "_id": userId })
        const getReservation = await Reservation.find({ "_id": id });
        console.log("userData", userData[0])
        console.log("getReservation", getReservation[0]);

        // Storing the current Nights
       
        let currentNights = userData[0].totalNights;

        let inputStartDate = new Date(getReservation[0].dateStart);
        let inputEndDate = new Date(getReservation[0].dateEnd);

        let roomId = getReservation[0].roomId;
        let roomTypeArr = getReservation[0].roomType;
        // console.log("roomId", roomId)
        let selectedRoomType = roomTypeArr.filter(roomType => mongoose.Types.ObjectId(roomType._id).equals(roomId));
        // console.log("selectedRoomType", selectedRoomType)
        let roomPrice = selectedRoomType[0].price;

        let diffDate = (new Date(inputEndDate).getDate() + 1) - (new Date(inputStartDate).getDate() + 1)
        let diffMonth = (new Date(inputEndDate).getMonth() + 1) - (new Date(inputStartDate).getMonth() + 1)
        let diffYear = (new Date(inputEndDate).getFullYear() + 1) - (new Date(inputStartDate).getFullYear() + 1)

        console.log(diffDate, diffMonth, diffYear)

        let stayDays = diffDate + (diffMonth * 30) + (diffYear * 365);

        let updatedNights = currentNights - stayDays;

       

        // Update for Storing reservation id and  Nights to User.
        const userResponse = await User.updateOne({ "_id": userId },
            { $set: {  "totalNights": updatedNights } },
            { new: true })

        // Update Reservation
        const response = await Reservation.updateOne({ "_id": id }, { isCancel: true });
        return { message: "cancel it successfully", updatedNights };
    } catch (error) {
        return { message: "Cannot find the reservation", error };
    }
}



const createReservation = async (reservationData, userId, roomPrice = 0) => {
    try {
        // Validation for checking duplicate booked date.
        console.log("userId", userId, "userId")
        const userData = await User.find({ "_id": userId }).populate("reservation");
        console.log("userData[0]", userData);
        if (userData.length == 0) {
            return { message: "Cannot find the user" }
        }
        // Getting all upComing Reservation of the user to compare them with InputReservation.
        let upComingUserReservation = userData[0]["reservation"] ?
            userData[0].reservation.filter(userReservationData => {
                let currentDate = new Date();
                let dateStart = userReservationData.dateStart;
                if (dateStart >= currentDate && !userReservationData.isCancel) {
                    console.log(dateStart, "in if statment")
                    return userReservationData;
                }
            })
            : [];

        console.log("upComingUserReservation", upComingUserReservation);
        console.log("reservationData", reservationData)

        let inputStartDate = new Date(reservationData.dateStart);
        let inputEndDate = new Date(reservationData.dateEnd);

        for (let i = 0; i < upComingUserReservation.length; i++) {
            // InputStartDate is less then or equal to dateStart
            if (inputStartDate <= upComingUserReservation[i].dateStart && upComingUserReservation[i].dateStart <= inputEndDate) {
                //  exit reservation
                // new reservation
                throw { message: "You have a reservation for the date.", data: upComingUserReservation[i] }
            }
            // InputStartDate is greater then or equal to dateStart
            else if (upComingUserReservation[i].dateStart <= inputStartDate && inputStartDate <= upComingUserReservation[i].dateEnd) {
                //exit reservation
                //or new reservation
                throw { message: "You have a reservation for the date.", data: upComingUserReservation[i] }
            }
        }

        console.log("Make a reservation!!")
        const reservationInfo = await Reservation.create(reservationData);

        // Storing the current Nights
        
        let currentNights = userData[0].totalNights;


        let diffDate = (new Date(inputEndDate).getDate() + 1) - (new Date(inputStartDate).getDate() + 1)
        let diffMonth = (new Date(inputEndDate).getMonth() + 1) - (new Date(inputStartDate).getMonth() + 1)
        let diffYear = (new Date(inputEndDate).getFullYear() + 1) - (new Date(inputStartDate).getFullYear() + 1)

        console.log(diffDate, diffMonth, diffYear)
        let stayDays = diffDate + (diffMonth * 30) + (diffYear * 365);

        let updatedNights = stayDays + currentNights;

        



        //Update for Storing reservation id  Nights to User.
        const userResponse = await User.updateOne({ "_id": userId },
            { $set: {  "totalNights": updatedNights }, $push: { reservation: reservationInfo._id } },
            { new: true })
        console.log(userResponse);
        return { message: "Succeed", updatedNights }

    } catch (error) {
        throw error;
    }
}

module.exports = {
    getReservation,
    getReservationById,
    getReservationsByDay,
    cancelReservationById,
    createReservation

}