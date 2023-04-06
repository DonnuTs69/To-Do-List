const db = require("../models")

const listController = {
  listPost: async (req, res) => {
    try {
      const foundUserById = await db.User.findByPk(req.user.id)

      const createNewTitle = await db.List.create({
        title: req.body.title,
        UserId: foundUserById.id,
      })

      return res.status(200).json({
        message: "Success post new tittle",
        data: createNewTitle,
      })
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        message: err.message,
      })
    }
  },
  getListById: async (req, res) => {
    try {
      const foundListById = await db.List.findByPk(req.params.id, {
        include: [
          {
            model: db.Task,
            include: {
              model: db.Status,
            },
          },
        ],
      })

      return res.status(200).json({
        message: "Success found list",
        data: foundListById,
      })
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        message: err.message,
      })
    }
  },
}

module.exports = listController
