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

const toggleMFA = async (req, res, next) => {
  try {
    const { status } = req.body;
    const update = {
      mfa: status,
    };

    const data = await User.findByIdAndUpdate(req?.user?.id, update);

    if (data) {
      return res.status(200).json({
        status: true,
        msg: "MFA status updated",
      });
    }
    return res.status(400).json({
      status: false,
      msg: "Failed to update MFA status",
    });
  } catch (error) {
    next(error);
  }
};

const getUserProfile = async (req, res, next) => {
  try {
    const data = await User.findById(req?.user?.id).select([
      "-password",
      "-fcm_token",
    ]);
    console.log("🚀 ~ getUserProfile ~ data:", data);
    if (data) {
      return res.status(200).json({
        status: true,
        data: data,
        msg: "User profile fetched",
      });
    }
    return res.status(400).json({
      status: false,
      msg: "Failed to fetch user profile",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  updateDeviceToken,
  toggleMFA,
  getUserProfile,
};
