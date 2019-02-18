
const Koa = require("koa");
const router = require("./router");
const bodyParser = require('koa-bodyparser')
const app = new Koa();

app.env = "production";

app
    .use(bodyParser())
    .use(router.routes())
    .use(router.allowedMethods());

app.listen(3000)