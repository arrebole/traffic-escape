const Router = require("koa-router");
const sql = require("./sql");
const { newHashBase64 } = require("./utils");

const domain = "http://loaclhost/";


const router = new Router();
router.post('/api/save', async (ctx, next) => {
    ctx.set("Content-Type", "application/json")
    let inputText = ctx.request.body.content || "";
    if (inputText.length == 0) {
        return
    }
    let hash = newHashBase64(inputText)
    // 如果已经存在
    let exist = await sql.isExist(hash);
    if (exist != 0) {
        ctx.body = JSON.stringify({
            "code": 0,
            "message": "已存在",
            "content": `${domain + hash}`,
        })
        return;
    }
    // 如果不存在则储存
    sql.save(hash, inputText);
    ctx.body = JSON.stringify({
        "code": 0,
        "message": "存储成功",
        "content": `${domain + hash}`,
    })
})

router.get('/api/take', async (ctx, next) => {
    ctx.set("Content-Type", "application/json")
    takeHash = ctx.query["hash"];

    // 如果不存在
    let exist = await sql.isExist(takeHash);
    if (exist == 0) {
        ctx.body = JSON.stringify({
            "code": 1,
            "message": "不存在",
            "content": "",
        })
        return;
    }
    // 存在则去获取
    let data = await sql.take(takeHash);
    ctx.body = JSON.stringify({
        "code": 0,
        "message": "获取成功",
        "count": data.count,
        "content": `${data.content}`
    })
})

module.exports = router