const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    taskName: String,
    completed: Boolean

})

const taskModels = mongoose.model('task',taskSchema)

module.exports=taskModels