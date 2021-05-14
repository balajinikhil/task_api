const randomString = require('randomstring');

const Board = require('../model/BoardModel');
const User = require('../model/UserModel');

exports.getBoard = async(req,res,next)=>{
    try{
        let googleId = req.params.user;
        const board = await Board.findOne({googleId});

        if(board){
            res.status(200).json({
                status:'success',
                board
            });
        }else{
            const newBoard = await Board.create({
                googleid:googleId
            });
            
            res.status(201).json({
                status:'created',
                newBoard
            });
        }
        
    }catch(err){
        next(err);
    }
}

exports.boardList = async(req,res,next)=>{
    try{

        let user = await User.findOne({
            googleId: req.headers.authorization
        })

        if(!user){
            res.status(200).json({
                message:'Unauthorized, Login In'
            })
        }else{

            let {googleId} = req.query;
            
            let boards = await Board.find({
                googleid:`${googleId}`
            });
            
            res.status(200).json({
                status:'success',
                length:boards.length,
                boards
            });
        }
    }catch(err){
        next(err);
    }
};

exports.createNewBoard = async(req,res,next) => {
    try{
        const user = await User.findOne({
            googleId: req.headers.authorization
        });

        if(!user){
            res.status(200).json({
                message:'Unauthorized'
            })
        }else{
            let board = await Board.create({
                googleid:req.headers.authorization,
                boardname:req.body.boardname
            })

            res.status(200).json({
                message:'success',
                board
            })
        }
    }catch(err){
        next(err);
    }
}

exports.singleBoard = async(req,res,next)=>{
    try{
        const user = await User.findOne({
            googleId:req.headers.authorization
        });
        if(!user){
            res.status(200).json({
                message:'Unauthorized, Login in again'
            })
        }else{
            const board = await Board.findById(req.params.id);
            res.status(200).json({
                message:'success',
                board
            });
        }
    }catch(err){
        next(err);
    }
}

exports.updateBoard = async(req,res,next)=>{
    try{
        const user = await User.findOne({
            googleId:req.headers.authorization
        });
        if(!user){
            res.status(200).json({
                message:'Unauthorized, Login in again'
            })
        }else{
            let {id} = req.params;
            let board = await Board.updateOne({_id:req.params.id},{board:req.body});
            res.status(200).json({
                message:'updated'
            })
        }
    }catch(err){
        next(err);
    }
}

exports.inviteUser = async(req,res,next)=>{
    try{
        const user = await User.findOne({
            googleId:req.headers.authorization
        });
        if(!user){
            res.status(200).json({
                message:'Unauthorized, Login in again'
            })
        }else{
            const board = await Board.findByIdAndUpdate(
                req.params.id, 
                {inviteLink:randomstring.generate()}
                );

            res.status(201).json({
                message:"success",
                inviteLink:board.inviteLink
            });    
        }
    }catch(err){
        next(err);
    }

}

exports.acceptInviteUser = async(req,res,next)=>{
    try{
        const user = await User.findOne({
            googleId:req.headers.authorization
        });
        if(!user){
            res.status(200).json({
                message:'Unauthorized, Login in again'
            })
        }else{
            let board = await Board.findOne({
                inviteLink:req.params.link
            });

            if(!board){
                res.status(200).json({
                    success:'Failed',
                    message:"board doesn't exists anymore"
                })
            }else{
               board.users.push(req.headers.authorization);
               await board.save();
            }
        }

    }catch(err){
        next(err)
    }
}

exports.deleteBoard = async(req,res,next)=>{
    try{
        const user = await User.findOne({
            googleId:req.headers.authorization
        });
        if(!user){
            res.status(200).json({
                message:'Unauthorized, Login in again'
            })
        }else{
            const board = await Board.findById(req.headers.board);
            console.log(board.board.tasks);

            res.status(200).json({
                status:'dev'
            })
        }

    }catch(err){
        next(err);
    }
}