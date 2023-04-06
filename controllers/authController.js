const db = require("../models")
const bcrypt = require("bcrypt")
const { Op } = require("sequelize")

const authController = {
  registerUser: async (req, res) => {
    try {
      const findUserByUsernameOrEmail = await db.User.findOne({
        where: {
          [Op.or]: {
            email: req.body.email,
            username: req.body.username,
          },
        },
      })

      if (findUserByUsernameOrEmail) {
        return res.status(400).json({
          message: "Username or email has been taken",
        })
      }

      const hashedPassword = bcrypt.hashSync(req.body.password, 5)

      const newUser = await db.User.create({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
      })

      return res.status(201).json({
        message: "User registered",
        data: newUser,
      })
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        message: err.message,
      })
    }
  },
}

module.exports = authController
