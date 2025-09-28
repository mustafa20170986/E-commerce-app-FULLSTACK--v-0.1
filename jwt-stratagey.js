import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { users } from "./jwt-initializer.js"; // Import your user data and secrets
import {secac} from './jwt-initializer.js'


const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secac,
};

passport.use(
  new JwtStrategy(opts, (jwt_payload, done) => {
    const fnduser = users.find((user) => user.id === jwt_payload.id);

    if (fnduser) {
      return done(null, fnduser);
    } else {
      return done(null, false, { message: "Token is not valid" });
    }
  })
);

export default passport;