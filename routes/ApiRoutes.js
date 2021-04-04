const router = require('express').Router();
const passport = require('passport');
const {signInUser} = require('../controller/UserController');
const {getBoard,boardList,createNewBoard,singleBoard} = require('../controller/BoardController');


router.post('/singin', signInUser);
// router.get('/board', getBoard);
router.get('/boards/list', boardList);

router.post('/board-new', createNewBoard);
router.get('/board-new/:id', singleBoard);

module.exports = router;

// router.get('/login', (req,res,next)=>{

    // })
    
    // // login 
    
    // router.get('/google', passport.authenticate('google',{
    //     scope:['profile']
    // }), (req,res,next)=>{
    //     // handle with passport
    // })
    
    // router.get('/logout', (req,res)=>{
    //     // handle with passport
    // })
    
    // // google redirect
    // router.get('/google-redirect', passport.authenticate('google'), (req,res,next)=>{
    //     console.log(req.user);
    //     res.json({msg:" you've redirected ", user:req.user})
    // })
    