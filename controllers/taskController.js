const db = require("../models")

const taskController = {
  postNewTask: async (req, res) => {
    try {
      const ids = req.body.map((item) => item.StatusId)
      const uniqueIds = ids.filter((item, index) => ids.indexOf(item) == index)

      const foundStatusById = await db.Status.findAll({
        where: {
          id: uniqueIds,
        },
      })

      if (foundStatusById.length !== uniqueIds.length) {
        throw new Error("Can't found all required status")
      }

      const structureData = req.body.map((item) => {
        return {
          description: item.description,
          StatusId: item.StatusId,
          ListId: req.params.id,
        }
      })

      const createNewTask = await db.Task.bulkCreate(structureData)

      return res.status(201).json({
        message: "success create new task",
        data: createNewTask,
      })
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        message: err.message,
      })
    }
  },
  updateTask: async (req, res) => {
    try {
      console.log(req.body.id, "ID")
      const findIdTask = await db.Task.findByPk(req.body.id)

      if (!findIdTask) {
        throw new Error("Task not found")
      }

      updateTask = await db.Task.update(
        {
          description: req.body.description,
          StatusId: req.body.StatusId,
          // ...req.body,
        },
        {
          where: {
            id: findIdTask.id,
          },
        }
      )

      return res.status(200).json({
        message: "update task successful",
        data: updateTask,
      })
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        message: err.message,
      })
    }
  },
  deleteTask: async (req, res) => {
    try {
      console.log(req.params.id)
      await db.Task.destroy({
        where: {
          id: req.params.id,
        },
      })

      return res.status(200).json({
        message: "Delete task successfull",
      })
    } catch (err) {
      console.log(err)
      res.status(500).json({
        message: err.message,
      })
    }
  },
}

module.exports = taskController
