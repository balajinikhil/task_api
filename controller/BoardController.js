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
            console.log(googleId);

            let boards = await Board.find({
                googleid:`${googleId}`
            });
            
            console.log(boards)

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