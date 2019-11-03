const User = require('./models/User')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt


const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'secret'
}

module.exports = passport => {
    passport.use(
        new JwtStrategy(options, async (payload, done) => {
            try {
                const user = await User.findOne({where: {id: payload.userId}, attributes: ['email', 'id', 'admin']})

                if (user) {
                    done(null, user)
                } else {
                    done(null, false)
                }
            } catch (e) {
                console.log(e)
            }
        })
    )
}

// opts.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();
// opts.secretOrKey = 'secret';
//
// module.exports = passport => {
//     passport.use(new JWTStrategy(opts, (jwt_payload, done) => {
//          User.findOne({where: {id: payload.userId}, attributes: ['email', 'id', 'admin']})
//             .then(user => {
//                 if(user) {
//                     return done(null, user);
//                 }
//                 return done(null, false);
//             })
//             .catch(err => console.error(err));
//     }));
// }