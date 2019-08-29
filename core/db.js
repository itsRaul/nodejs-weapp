const Sequelize = require('sequelize')
const {
    dbName,
    host,
    port,
    user,
    password
} = require('../config/config').database

const sequelize = new Sequelize(dbName,user,password,{
    dialect: 'mysql',//指定数据库类型
    host,
    port,
    logging:false, //显示具体的sql操作

    timezone:'+08:00', //北京时间记录相关的数据
    define:{
        timestamps:true,//禁止生成create_time  update_time delete_time
        paranoid:true,
        createdAt:'created_at', //自定义名字
        updatedAt:'updated_at',
        deletedAt:'deleted_at',
        underscored:true,
        freezeTableName:true,
        scopes: {
            bh: {
                attributes: {
                    exclude:['updated_at','deleted_at','created_at']
                }
            }
        }
    }
})

sequelize.sync({
    force:false //新增参数自动删除表创建，不要轻易true，会删除记录
})

module.exports = {
    sequelize
}