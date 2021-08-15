const fs = require('fs/promises')
const path = require('path')
const jimp = require('jimp')
const { user: service } = require('../../services')

module.exports = async (req, res, next) => {
  if (!req.file) {
    return res.status(400).json({
      status: 'Error',
      code: 400,
      error: 'no file attached',
    })
  }

  const {
    user: { _id: userId },
    file: { path: tempFileName },
  } = req

  try {
    const uploadDir = path.join(process.cwd(), 'public/avatars')
    const fileName = path.join(uploadDir, `${userId}.jpg`)
    await optimizeImage(tempFileName)

    const { avatarURL } = await service.updateUser(userId, {
      avatarURL: fileName,
    })
    await fs.rename(tempFileName, fileName)

    res.status(200).json({
      status: 'Success',
      code: 200,
      data: { avatarURL },
    })
  } catch (error) {
    fs.unlink(tempFileName)
    next(error)
  }
}

const optimizeImage = async (imagePath) => {
  const image = await jimp.read(`${imagePath}`)
  await image.resize(250, jimp.AUTO)
  return await image.writeAsync(`${imagePath}`)
}
