// const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");
// const User = require("../models/User");

// const opts = {};

// opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
// opts.secretOrKey = process.env.SIGNATURE;

// module.exports = (passport) => {
//   passport.use(
//     new JwtStrategy(opts, (jwt_payload, done) => {
//       User.findById(jwt_payload.id)
//         .then((user) => {
//           if (user) {
//             return done(null, user);
//           }
//           return done(null, false);
//         })
//         .catch((err) => done(err, false));
//     })
//   );
// };
