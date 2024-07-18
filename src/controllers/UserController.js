const User = require("../models/User");

const updateDeviceToken = async (req, res, next) => {
  try {
    const { fcmToken } = req.body;
    const update = {
      fcm_token: fcmToken,
    };

    const data = await User.findByIdAndUpdate(req.user.id, update);
    if (data) {
      return res.status(200).json({
        status: true,
        msg: "Device token updated",
      });
    }
    return res.status(400).json({
      status: false,
      msg: "Failed to update device token",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  updateDeviceToken,
};
