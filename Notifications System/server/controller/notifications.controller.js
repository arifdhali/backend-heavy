
const db = require("../models");

const getNotifications = async (req, res) => {
    const userid = req.body.user_id;
    let notifications = await db.Notifications.findAll({
        where: {
            user_id: userid,
        }
    })

    res.status(200).json({
        msg: "Notifications retrived successfull",
        notifications
    })
}


const getUnreadNotifications = async (req, res) => {
    let userid = req.body.user_id;


    let unread_notications = await db.Notifications.findAll({
        where: {
            user_id: userid,
            is_read: 0,
        }
    })

    res.status(200).json({
        msg: "Unread notifications retrived successfull",
        unread_notications
    })
}


const makeReadNotifications = async (req, res) => {

    

}

module.exports = {
    getNotifications,
    getUnreadNotifications,
    makeReadNotifications
}