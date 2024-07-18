const jwt = require("jsonwebtoken");
const Joi = require("joi");
const User = require("../models/User");
const { comparePassword } = require("../helpers/utils");
const { passwordRegex } = require("../constants");

const register = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const registerSchema = Joi.object({
      firstName: Joi.string(),
      lastName: Joi.string(),
      email: Joi.string().email(),
      password: Joi.string().pattern(new RegExp(passwordRegex)),
    });

    const { error } = registerSchema.validate(req.body);

    if (error) {
      return res.status(400).json({
        status: false,
        code: 400,
        msg: "Validation error",
        error: error,
      });
    }

    const isUserExists = await User.findOne({ email });
    if (isUserExists) {
      return res.status(400).json({
        status: false,
        code: 400,
        msg: "User already present",
      });
    }

    const user = new User({
      firstName,
      lastName,
      email,
      password,
    });
    const u = await user.save();

    if (u) {
      return res.status(201).json({
        status: true,
        code: 201,
        msg: "Registration Successful",
      });
    }

    return res.status(400).json({
      status: false,
      code: 400,
      msg: "Registration Failed",
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const loginBodySchema = Joi.object({
      email: Joi.string().email(),
      password: Joi.string().pattern(new RegExp(passwordRegex)),
    });

    const { error, value } = loginBodySchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        status: false,
        code: 400,
        msg: "Validation Error",
        error: error,
      });
    }
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        status: false,
        code: 404,
        msg: "User not found",
      });
    }

    const isMatch = comparePassword(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        status: false,
        code: 400,
        msg: "Invalid Credentials",
      });
    }

    // const accessTokenExp = process.env.ACCESS_TOKEN_EXP / 3600;
    // const refreshTokenExp = process.env.REFRESH_TOKEN_EXP / 3600;

    const payload = { id: user.id, username: user.username };
    const accessToken = jwt.sign(payload, process.env.SIGNATURE);
    // const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    //   expiresIn: refreshTokenExp,
    // });

    // const tokenData = await new Tokens({
    //   access_token: accessToken,
    //   // access_token_expiry: accessTokenExp,
    //   // refresh_token: refreshToken,
    //   // refresh_token_expiry: refreshTokenExp,
    //   user: user.id,
    // });

    // await tokenData.save();

    return res.status(200).json({
      status: true,
      code: 200,
      msg: "Login Successful",
      data: {
        access_token: accessToken,
        // refresh_token: refreshToken,
        user: {
          firstName: user?.firstName,
          lastName: user?.lastName,
          email: user?.email,
        },
        // access_token_exp: accessTokenExp,
        // refresh_token_exp: refreshTokenExp,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
};
