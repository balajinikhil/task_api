const passport = require('passport');
const GoogleStratergy = require('passport-google-oauth2');

const User = require('../model/UserModel');

// serialize user - to stuff in cookie
passport.serializeUser((user,done)=>{
    done(null,user._id);
})

passport.deserializeUser(async(id, done)=>{
    const user = await User.findById(id);
    done(null, user);
})


passport.use(
    new GoogleStratergy({
        // passport stratergy
        clientID:     process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:7000/api-v1/google-redirect",
        passReqToCallback: true
    },
    async function(request, accessToken, refreshToken, profile, done) {

            let oldUser = await User.findOne({
                googleId:profile.id
            })

            done(null, oldUser); //forward to serialize user

            if(oldUser.length === 0){
                const user = await User.create({
                    googleId:profile.id, 
                    username:profile.displayName,
                    profilePic:profile.picture,
                });
                done(null, user); //forward to serialize user
            }
    }
    )
)