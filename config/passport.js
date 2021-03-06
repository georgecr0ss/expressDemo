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


    passport.use('local-login', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done) { // callback with email and password from our form

        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        User.findOne({ 'local.email' :  email }, function(err, user) {
            let response = (err,res) => {
                if(err)
                    throw err

                return true
            }

            // if there are any errors, return the error before anything else
            if (err)
                return done(err);

            // if no user is found, return the message
            if (!user)
                return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash

            if (user.validPassword(password,response))
                return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata

            // all is well, return successful user
            return done(null, user);
        });

    }));

}
