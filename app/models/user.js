/**
 * @description: 用户登录操作模型
 * 
 */
const bcrypt = require('bcryptjs')
const {
    sequelize
} = require('../../core/db')


const {
    Sequelize,
    Model
} = require('sequelize')

class User extends Model {
    //通过email查询，验证账号密码是否正确
    static async verifyEmailPassword(email, plainPassword) {
        const user = await User.findOne({
            where: {
                email
            }
        })
        if (!user) {
            throw new global.errs.AuthFailed('账号不存在')
        }
        // user.password === plainPassword
        const correct = bcrypt.compareSync(
            plainPassword, user.password)
        if(!correct){
            throw new global.errs.AuthFailed('密码不正确')
        }
        return user
    }

    //获取openid
    static async getUserByOpenid(openid) {
        const user = await User.findOne({
            where: {
                openid
            }
        })
        return user
    }

    //将openid存储到数据库
    static async registerByOpenid(openid) {
        return await User.create({
            openid
        })
    }
}

//创建表
User.init({
    //主键:不能重复 不能为空
    id: {
        type:Sequelize.INTEGER, //设置参数类型
        primaryKey:true, //设置主键
        autoIncrement: true
    },
    nickname:Sequelize.STRING,
    email: {
        type:Sequelize.STRING(128), //参数是字符串，长度128
        unique: true, //不变且唯一的
    },
    password:{
        type: Sequelize.STRING,
        set(val) {
            const salt = bcrypt.genSaltSync(10)
            const pwd = bcrypt.hashSync(val,salt)
            this.setDataValue('password',pwd)
        }
    },
    openid:{
        type:Sequelize.STRING(64),
        unique:true
    }
},{
    sequelize,
    tableName: 'user'
})

module.exports = {
    User
}

// 数据迁移 SQL 更新 风险