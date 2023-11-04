const express = require("express")
const middleware = require("./middleware.task")
const controller = require("./controller.task")
const auth = require("../authentication/auth")
const cookieParser = require("cookie-parser")
const task = require("../models/task")

const taskRouter = express.Router()

taskRouter.use(cookieParser())

taskRouter.post("/create", async (req,res)=>{
    const response = await controller.createTask({task_name:req.body.task_name,state:pending,user_id:res.locals.user_id})
    if(response.code===200){
        res.redirect("./dasboard")
    }else{
        res.redirect("/invalid_info")
    }
})

taskRouter.post("/update/:id", controller.updateState)
taskRouter.post("/:id", controller.deleteTask)

module.exports = taskRouter