const db = require("../models")
const bcrypt = require("bcrypt")
const { Op } = require("sequelize")
const { signToken } = require("../lib/jwt")

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
  loginUser: async (req, res) => {
    try {
      const findUserByUsernameOrEmail = await db.User.findOne({
        where: {
          [Op.or]: {
            username: req.body.usernameOrEmail,
            email: req.body.usernameOrEmail,
          },
        },
      })

      if (!findUserByUsernameOrEmail) {
        return res.status(400).json({
          message: "User not found",
        })
      }

      const passwordIsValid = bcrypt.compareSync(
        req.body.password,
        findUserByUsernameOrEmail.password
      )

      if (!passwordIsValid) {
        return res.status(400).json({
          message: "Password invalid",
        })
      }

      delete findUserByUsernameOrEmail.dataValues.password

      const token = signToken({
        id: findUserByUsernameOrEmail.id,
      })

      return res.status(201).json({
        message: "User Login",
        data: findUserByUsernameOrEmail,
        token,
      })
    } catch (err) {
      console.log(err)
      return res.status(500).json({
        message: err.message,
      })
    }
  },
  refreshToken: async (req, res) => {
    try {
      const findUserById = await db.User.findByPk(req.user.id)

      const renewedToken = signToken({
        id: req.user.id,
      })

      return res.status(200).json({
        message: "Renewed user token",
        data: findUserById,
        token: renewedToken,
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
