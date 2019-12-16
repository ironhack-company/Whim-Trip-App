const User = require('../models/User');
const passport = require('passport');
const bcrypt = require('bcryptjs')
const LocalStrategy = require('passport-local')

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser()); 
passport.deserializeUser(User.deserializeUser());

// passport.use(new LocalStrategy((username, password, next) => {
//     User.findOne({ username }, (err, foundUser) => {
//       if (err) {
//         next(err);
//         return;
//       }
//       if (!foundUser) {
//         next(null, false, { message: 'Incorrect username' });
//         return;
//       }

//       if (!bcrypt.compareSync(password, foundUser.hash)) {
//         next(null, false, { message: 'Incorrect password' });
//         return;
//       }
//       next(null, foundUser);
//     });
//   }));

module.exports = passport;
