
const { Schema, model } = require('mongoose')
const bcrypt = require('bcryptjs')
const { subscriptions } = require('../../helpers/subscriptions')
const { nanoid } = require('nanoid')
require('dotenv').config()
const SALT_FACTOR = Number(process.env.SALT_FACTOR)

const usersSchema = new Schema(
{
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  subscription: {
      type: String,
      enum: {
        values: [...Object.values(subscriptions)],
        message: "Havn't this subscription type"
      },
      default: subscriptions.STARTER
    },
  name: {
    type: String,
    default: 'Guest',
    },
  token: {
    type: String,
    default: null,
    },
  verify: {
    type: Boolean,
    default: false,
  },
  verifyToken: {
    type: String,
    required: [true, 'Verify token is required'],
    default: nanoid()
  },
} , {
    versionKey: false,
    timestamps: true,
})


usersSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
      const salt = await bcrypt.genSalt(SALT_FACTOR)
      this.password = await bcrypt.hash(this.password, salt)
    }
    next()
})

usersSchema.methods.validatePassword = async function (password) {
  return bcrypt.compare(password, this.password)
}
  
const Users = model('user', usersSchema)

module.exports = Users