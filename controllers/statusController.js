const db = require("../models")

const statusController = {
  getAllStatus: async (req, res) => {
    try {
      const getStatus = await db.Status.findAll()

      return res.status(200).json({
        message: "get all status",
        data: getStatus,
      })
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        message: err.message,
      })
    }
  },
}

module.exports = statusController
