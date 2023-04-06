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
}

module.exports = taskController
