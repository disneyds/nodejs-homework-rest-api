const Users = require('./schemas/usersSchema')

const findUserById = async (userId) => {
    return await Users.findById(userId)
}

const findUserByEmail = async (email) => {
    return await Users.findOne({email})
}

const findUserByVerifyToken = async (verifyToken) => {
    return await Users.findOne({verifyToken})
}

const createUser = async (userOptions) => {
    const user = new Users(userOptions)
    return await user.save()
}

const updateToken = async (id, token) => {
    return await Users.findByIdAndUpdate(id, { token })
}

const updateSubscription = async (id, subscription ) => {
    return await Users.findByIdAndUpdate(id, { subscription }, { new: true })
}
const updateAvatar = async (id, avatarURL, idCloudAvatar = null) => {
    return await Users.findByIdAndUpdate( id, { avatarURL, idCloudAvatar }, { new: true })
}

const updateVerifyToken = async (id, verify, verifyToken) => {
    return await Users.findByIdAndUpdate(id, {verify, verifyToken })
}

module.exports = {
  findUserById,
  findUserByEmail,
  findUserByVerifyToken,
  createUser,
  updateToken,
  updateSubscription,
  updateAvatar,
  updateVerifyToken
}