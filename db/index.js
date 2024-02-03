const mongoose=require("mongoose");

main()

async function main(){
    await mongoose.connect("mongodb://root:password@172.17.0.3:27017/");
}
const users=new mongoose.Schema({
    username: String,
    password: String,
    addedTodos:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Todos'
    }]
})
const todos=new mongoose.Schema({
    title: String,
    description: String
})

const User=mongoose.model('User',users)
const Todos=mongoose.model('Todos',todos)

module.exports={User,Todos}