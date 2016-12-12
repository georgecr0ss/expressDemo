let LocalStrategy = require('passport-local').Strategy
let User = require('../app/models/users')

module.exports = (passport) => {

    passport.serializeUser((user, done) => {
        done(null, user.id)
    })

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user);
        })
    })

    //LOCAL SIGNUP

    passport.use('local-signup', new LocalStrategy({
        usernameField: 'email',
        passportField: 'password',
        passReqToCallback: true
    }, (req, email, password, done)=> {
        process.nextTick(() => {
            User.findOne({ 'local.email': email }, (err, user) => {
                if (err)
                    return done(err);

                if (user) {
                    return done(null, false, req.flash('signupMessage', 'This email is already taken'))
                } else {
                    var newUser = new User()

                    newUser.local.email = email
                    newUser.local.password = newUser.generateHash(password)

                    newUser.save((err) => {
                        if (err)
                            throw err;
                        return done(null, newUser)
                    })
                }
            })
        })
    }))

}
