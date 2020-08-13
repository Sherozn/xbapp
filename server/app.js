const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')

const xmlParse = require('./config/xmlParse')

const index = require('./routes/index')
const users = require('./routes/users')
const data = require('./routes/data')
const product = require('./routes/product')
const product_type = require('./routes/product_type')
const login = require('./routes/login')
const gzh = require('./routes/gzh')
const cors = require('koa-cors')

app.use(cors())

// error handler
onerror(app)

// middlewares

app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(xmlParse())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
app.use(data.routes(), data.allowedMethods())
app.use(product.routes(), product.allowedMethods())
app.use(product_type.routes(), product_type.allowedMethods())
app.use(login.routes(), login.allowedMethods())
app.use(gzh.routes(), gzh.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

app.listen(3303,() => {
	console.log("app已经运行，端口为3303")
	console.log("__dirname:",__dirname)
});

module.exports = app
