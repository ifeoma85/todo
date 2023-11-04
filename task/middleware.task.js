const taskModel = require("../models/task");


const createTask = async ({ task_name, state, user_id })=>{
    const taskInfo = { task_name, state, user_id };
if (!taskInfo){
    return {
        message: "invalid info",
        code: 404,
    };
}

const task = await taskModel.create(taskInfo);

return {
    message: "Task successfully created",
    code: 200,
    task,
};
};

const updateState = (req, res)=>{
    const id = req.params.id
    const update = req.body
    taskModel.findByIdAndUpdate(id, update, { new: true})
    .then(newState =>{
        
    })
}