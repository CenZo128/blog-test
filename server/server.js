const Koa = require('koa')
const app = new Koa()
const PORT = 3000
const bodyParser = require('koa-bodyparser');

const routes = require('./routes')

app.use(bodyParser());
app
    .use(routes.routes())
    .use(routes.allowedMethods())

const db = require('./config/config')
db.on("error", console.error.bind(console, "Connection Error"));
db.once("open", () => console.log("Connected to mongodb!"));

app.listen(PORT, () => {
    console.log("App is running at : ", PORT)
})
