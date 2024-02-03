const {Router} =require("express")
const {User,Todos}=require("../db/index")
const {userMiddleware}=require("../middleware/user")
const jwt=require("jsonwebtoken")
const jwtPassword=process.env.jwtPassword
const router=Router()

router.post("/signup",async(req,res)=>{
    const username=req.body.username;
    const password=req.body.password;
    const isExist=await User.findOne({
        username:username
    })
    if(isExist){
        res.status(404).json({
            message:"User already exist"
        })
    }
    else{
    const user=new User({
        username:username,
        password:password
    })
    await user.save();
    res.status(200).json({
        message:"User Created Successfully"
    })
}
})
router.post("/signin",async(req,res)=>{
    const username=req.body.username;
    const password=req.body.password;

    const user=await User.findOne({
        username:username,
        password:password
    })
    if(!user){
        res.status(404).json({
            message:"Incorrect Username or Password"
        })
    }
    const token=jwt.sign({
        username:username
    },jwtPassword)
    console.log(token)
    res.status(200).json({
        accessToken:token
    })
})
router.get("/todos",userMiddleware,async(req,res)=>{
    const user=await User.findOne(
        {username:req.user});
    if(user){
    const todos=await Todos.find({
        _id:{
            "$in":user.addedTodos
        }
    });
    res.status(200).json(todos)
    }
    else{
        res.status(404).json({
            message:"User does not exist"
        })
    }
});
router.post("/todos",userMiddleware,async(req,res)=>{
    const username=req.user
    const todo=req.body
    const newTodo=await Todos.create({
        title:todo.title,
        description:todo.description
    })
    await User.updateOne({
        username:username
    },{
        "$push":{
            addedTodos:newTodo._id
        }
    }).then(()=>res.status(200).json({
        message:"Todo Added"
    }))


})
module.exports=router