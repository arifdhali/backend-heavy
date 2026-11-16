const { getNotifications, getUnreadNotifications, makeReadNotifications } = require("../controller/notifications.controller");

const notificationsRoute = require("express").Router();


notificationsRoute.get("/", getNotifications);
notificationsRoute.get("/unread", getUnreadNotifications);
notificationsRoute.patch(":id/read", makeReadNotifications)

module.exports = notificationsRoute;