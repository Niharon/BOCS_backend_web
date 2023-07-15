const UserNotification = require("../models/UserNotification.model");

exports.createNotification = async (user_id, message) => {

    try {

        const notification = await UserNotification.create({
            user_id,
            message
        });

        return notification;

    } catch (error) {
        return new Error(error);
    }

}

exports.getAllNotificationsByUser = async (user_id) => {
    try {
        const notifications = await UserNotification.findAll({
            where: {
                user_id
            },
            attributes: ["id", "message", "is_read"],
            order:[['created_at','DESC']]
        });
        return notifications;

    } catch (error) {
        return new Error(error);
    }
}
