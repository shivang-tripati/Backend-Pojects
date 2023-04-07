const express = require('express')
const router = express.Router();


const {
    createTask,
     getAllTasks, 
     updateTask, 
     getTask,
     deleteTask,
     editTask} = require('../controllers/task')

router.route('/').post(createTask).get(getAllTasks)
router.route('/:id').get(getTask).patch(updateTask).put(editTask).delete(deleteTask)


module.exports = router