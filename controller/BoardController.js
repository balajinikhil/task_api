const Board = require('../model/BoardModel');

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
        let {googleId} = req.params;
        let boards = await Board.find({
            googleId:googleId
        });
        
        console.log(boards)

        res.status(200).json({
            status:'success',
            length:boards.length,
            boards
        });
    }catch(err){
        next(err);
    }
}