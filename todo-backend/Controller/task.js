const task = require('../taskSchema')

const completeTask = async (req, res) => {

    try {
        const completeTask = req.body[1].completeTask
        const taskId = req.body[0].taskId
        console.log(completeTask)
        console.log(req.body)

        const updateCompleteTask = await task.findByIdAndUpdate(
            { _id: taskId }, { completed: completeTask }
        )
        res.json("task updated")
  
    } catch (err) {
        console.log("err")
    }
}

const getTask = async (req, res) => {
    try {
        const get_Task = await task.find({})
        res.send(get_Task)
    }
    catch (err) {
        console.log(err)
    }
}

const getOneTask = async (req, res) => {
    try {
        const getOneTask = req.params.getOneTask
        if (getOneTask.length !== 24) {
            res.json("Page not Found")
        } else {
            const get_Task = await task.findOne({ _id: getOneTask })
            if (!get_Task) {
                return res.json("Something went Wrong")
            }
            else {
                res.json(get_Task)
            }
        }

    }
    catch (err) {
        res.send(err)
        console.log(err)
    }
}

const addTask = async (req, res) => {
    // console.log(req.body.taskName)
    let numberOfTask = await task.find({})
    console.log(numberOfTask.length)
    if (numberOfTask.length === 10) {

        let numberOfTask = await task.deleteMany({}, { limit: 1 })
        console.log("this is delete task")

    }
    const add_task = new task({
        taskName: req.body.taskName,
        completed: req.body.completed
    })
    await add_task.save()

    res.send(add_task)
}

const deleteTask = async (req, res) => {
    console.log(req.params.deleteTask)
    try {
        const delete_Task = await task.findByIdAndDelete({ _id: req.params.deleteTask })
        res.send("task deleted!!!")
    }
    catch (err) {
        res.json("Can't Delete Task")
    }

}

const updateTask = async (req, res) => {

    const param = req.params.updateTask
    try {
        if (param.length !== 24) {
            return res.json("Page not Found")
        } else {

            const update_Task = await task.findByIdAndUpdate(
                { _id: req.params.updateTask },
                { taskName: req.body.taskName, completed: req.body.completed }
            )
            if (!update_Task) {
                res.json("Can't Update")
            }
            return res.json("task updated successfully")
        }

    }
    catch (err) {
        console.log(err)
    }

}



module.exports = { getTask, addTask, deleteTask, updateTask, getOneTask, completeTask }