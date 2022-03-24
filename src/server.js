
const app=require("./index")
const connect=require("./configs/db")
app.listen(4557,async()=>{
    try {
        await connect();
        console.log("Listening at port 4557")
    } catch (error) {
        console.log(error.message)
    }
})