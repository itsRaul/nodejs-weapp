const bcrypt = require('bcryptjs') //密码加密
const Router = require('koa-router')

const {RegisterValidator} = require('../../validators/validator')

const {success} = require('../../lib/helper')

const {
    User
} = require('../../models/user')

const router = new Router({
    prefix: '/v1/user' //api前缀
})

/**
 * 接受参数
 * 校验参数 
 */
router.post('/register', async (ctx)=> {
    //校验参数
    const v = await new RegisterValidator().validate(ctx)
    //密码加密
    // const salt = bcrypt.genSaltSync(10)
    // const pwd = bcrypt.hashSync(v.get('body.password2'),salt)
    //获取请求参数
    const user = {
        email: v.get('body.email'),
        password: v.get('body.password2'),
        nickname: v.get('body.nickname')
    }
    //利用sequelize模型数据保存到数据库
    await User.create(user)

    success()
})

module.exports = router