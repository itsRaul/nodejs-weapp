const Router = require('koa-router')
const {Auth} = require('../../../middlewares/auth')

const {HotBook} = require('../../models/hot-book')
const {
    Book
} = require('../../models/book')

const {
    PositiveIntegerValidator,
    SearchValidator,
    AddShortCommentValidator
} = require('../../validators/validator')

const {Favor} = require('../../models/favor')

const {
    Comment
} = require('../../models/book-comment')

const {success} = require('../../lib/helper')



const router = new Router({
    prefix: '/v1/book'
})

//热门书籍
router.get('/hot_list',new Auth().m, async (ctx,next)=>{
    const books = await HotBook.getAll()
    ctx.body = books
})


router.get('/:id/detail', async ctx => {
    const v = await new PositiveIntegerValidator().validate(ctx)
    const book = new Book()
    ctx.body = await book.detail(v.get('path.id'))
})

//搜索书籍
router.get('/search', async ctx => {
    const v = await new SearchValidator().validate(ctx)
    const result = await Book.searchFromYuShu(
        v.get('query.q'), v.get('query.start'), v.get('query.count'))
    ctx.body = result
})

//获取书籍点赞情况
router.get('/:book_id/favor', new Auth().m, async ctx => {
    const v = await new PositiveIntegerValidator().validate(ctx, {
        id: 'book_id'
    })
    const favor = await Favor.getBookFavor(
        ctx.auth.uid, v.get('path.book_id'))
    ctx.body = favor
})

router.get('/favor/count', new Auth().m, async ctx => {
    const count = await Book.getMyFavorBookCount(ctx.auth.uid)
    ctx.body = {
        count
    }
})

router.post('/add/short_comment', new Auth().m, async ctx => {
    const v = await new AddShortCommentValidator().validate(ctx,{
        id:'book_id'
    })
    Comment.addComment(v.get('body.book_id'),v.get('body.content'))
    success()
})

router.get('/:book_id/short_comment', new Auth().m, async ctx=>{
    const v = await new PositiveIntegerValidator().validate(ctx,{
        id:'book_id'
    })
    const book_id = v.get('path.book_id')
    const comments = await Comment.getComments(book_id)
    ctx.body = {
        comments,
        book_id
    }
})

router.get('/hot_keyword', async ctx => {
    ctx.body = {
        'hot': ['Python',
            '哈利·波特',
            '村上春树',
            '东野圭吾',
            '白夜行',
            '韩寒',
            '金庸',
            '王小波'
        ]
    }
    // 搜索次数最多
    // 一部分参考算法，人工编辑
    // Lin-CMS，编辑热门关键字的功能
})


module.exports = router