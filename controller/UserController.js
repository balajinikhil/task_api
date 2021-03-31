const User = require('../model/UserModel');


exports.signInUser = async(req,res,next) => {
    try{

        let {
            name,
            imageUrl,
            googleId
        } = req.body;

        let existingUser = await User.findOne({
            googleId:googleId
        })

        if(!existingUser){
            const user = await User.create({
                username:name,
                profilePic:imageUrl,
                googleId
            });

            res.status(201).json({
                status:'created',
                user: user
            });
        }else{
            res.status(200).json({
                status:'existing',
                user: existingUser
            });
        }

    }catch(err){
        next(err);
    }
}