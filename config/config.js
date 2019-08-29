
module.exports = {
    // prod
    environment:'dev',
    database:{
        dbName:'island',
        host:'localhost',
        port:3306,
        user:'root',
        password:'',
    },
    security:{
        secretKey:"abcdefg",
        expiresIn:60*60*24*30
    },
    wx:{
        appId:'wx9511f6b1f2f1eb06',
        appSecret:'e17628f2f8c9f08cd1800c56c6c71547',
        loginUrl:'https://api.weixin.qq.com/sns/jscode2session?appid=%s&secret=%s&js_code=%s&grant_type=authorization_code'
    },
    yushu:{
        detailUrl:'http://t.yushu.im/v2/book/id/%s',
        keywordUrl:'http://t.yushu.im/v2/book/search?q=%s&count=%s&start=%s&summary=%s'
    },
    host:'http://localhost:3000/'
}