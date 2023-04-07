const Task = require('../model/task')
const asyncWrapper = require('../middleware/async')
const {createCustomError} = require('../errors/custom-error')

const getAllTasks = asyncWrapper( async (req, res) => {
    
        const tasks = await Task.find({})
        res.status(200).json({tasks: tasks})
        /*  you can response in other way as well as for example following way*/
        // res.status(200).json({task, amount:tasks.length})
        // res.
        // status(200)
        // .json({status: "success", data:{
            // tasks, nbHits: tasks.length
        // }})

   
})

const createTask = asyncWrapper( async (req, res) => {
        let task = await Task.create(req.body)
        res.status(201).json({ task })
        task.save()
        console.log(req.body)
         // console.log(task)
        // console.log(req.body)
        // res.json(req.body)
        // console.log(req.body) 
})

const getTask = asyncWrapper( async (req, res, next) => {

        const {id: taskID} = req.params
        const task = await Task.findOne({_id:taskID})
        if(!task){
            return next(createCustomError(`no task with this id : ${taskID}`, 404))
            // const error = new Error("Not Found");
            // error.status = 404;
            // return next(error)
            // return res.status(404).json({msg: `no task with this id : ${taskID}`})
            // make sure you always return from this so js can return from the function
        }
        res.status(200).json({task})

} )

const updateTask = asyncWrapper( async (req, res) => {
   
        const {id: taskID} = req.params
        const task = await Task.findByIdAndUpdate({_id: taskID}, req.body, 
            // if you do not pass the option then it'll return the previous one, not the updated one 
            {
            new: true,
            runValidators: true,
        })
        if(!task){
            return next(createCustomError(`no task with this id : ${taskID}`, 404))
            // return res.status(404).json({msg: `no task with this id : ${taskID}`})
            // make sure you always return from this so js can return from the fun
        }
        res.status(200).json({task})
})
const deleteTask = asyncWrapper( async (req, res) => {
    
        const {id: taskID} = req.params
        const task = await Task.findOneAndDelete({_id:taskID})
        if(!task){
            return next(createCustomError(`no task with this id : ${taskID}`, 404))
            // return res.status(404).json({msg: `no task with this id : ${taskID}`})
            // make sure you always return from this so js can return from the function
        }
        res.status(200).json({task})
        // res.status(200).send()
        // res.status.json({task: null, status:'success'})
   
})

// ** refractoring try catch block method ** // 
//  above are asyncWrapper methods this only i left to understand long method as well as

const editTask = async (req, res) => {
    try {
        const {id: taskID} = req.params
        const task = await Task.findByIdAndUpdate({_id: taskID}, req.body, 
            // if you do not pass the option then it'll return the previous one, not the updated one 
            {
            new: true,
            runValidators: true,
            overwrite: true,
        })
        if(!task){
            return res.status(404).json({msg: `no task with this id : ${taskID}`})
            // make sure you always return from this so js can return from the fun
        }
        res.status(200).json({task})

    } catch (error) {
        res.status(505).json({message: error})
    }
}



module.exports = {
    getAllTasks,
    createTask,
    updateTask,
    getTask,
    deleteTask,
    editTask

}