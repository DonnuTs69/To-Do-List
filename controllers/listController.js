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
  listDelete: async (req, res) => {
    try {
      const listDeleted = await db.List.destroy({
        where: {
          id: req.params.id,
        },
      })

      return res.status(200).json({
        message: "List deleted",
        data: listDeleted,
      })
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        message: err.message,
      })
    }
  },
  listUpdate: async (req, res) => {
    try {
      const listUpdate = await db.List.update(
        {
          title: req.body.title,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      )

      return res.status(200).json({
        message: "List updated",
        data: listUpdate,
      })
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        message: err.message,
      })
    }
  },
  getAllListFromTheUser: async (req, res) => {
    try {
      // await db.User.findByPk(req.user.id)

      const foundAllListFromUser = await db.List.findAll({
        where: {
          UserId: req.user.id,
        },
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
        message: "get all list from user",
        data: foundAllListFromUser,
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
