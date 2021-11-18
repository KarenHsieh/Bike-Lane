const Koa = require('koa')
const Router = require('koa-router')
const serve = require('koa-static')
const mount = require('koa-mount')
const bodyParser = require('koa-body')
const compression = require('compression')
const koaConnect = require('koa-connect')
const next = require('next')
const config = require('./config.js')
const dev = config.nodeEnv !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const attractionControllers = require('./controllers/attractionControllers')

//  errorHandler = require("./middleware/errorHandler");

app.prepare().then(() => {
  const server = new Koa()
  const router = new Router()

  //Gzip
  server.use(koaConnect(compression()))
  if (dev) {
    //local /build/images get webpack build image
    server.use(mount('/static/images', serve(__dirname + '/build/images')))
  }

  /**
   * @description page route
   */

  // index
  router.get('/', async ctx => {
    ctx.status = 200
    await app.render(ctx.req, ctx.res, '/home', ctx.query)
  })

  router.get('/attractions', async ctx => {
    ctx.status = 200
    await app.render(ctx.req, ctx.res, '/attractions', ctx.query)
    ctx.respond = false
  })

  // 景點列表
  router.get('/api/getScenicSpotList', attractionControllers.getScenicSpotList)
  router.get('/api/getRestaurantList', attractionControllers.getRestaurantList)
  // router.get('/api/getHotelList', attractionControllers.getHotelList)
  router.get('/api/getActivityList', attractionControllers.getActivityList)

  //for post data (ctx.request.body)
  server.use(
    bodyParser({
      multipart: true,
      formidable: {
        maxFileSize: 10 * 1024 * 1024,
      },
    })
  )
  // errorHandler
  // server.use(errorHandler());

  // routes
  server.use(router.routes())

  // 收集錯誤訊息
  server.on('error', (err, ctx) => {
    console.error(`error: ${ctx.request.method} ${ctx.request.url} - ${err.message}`)
  })
  process.on('unhandledRejection', (reason, promise) => {
    console.error(`Unhandled Rejection: ${promise} - ${reason}`)
  })
  process.on('uncaughtException', err => {
    console.error(`Uncaught Exception: ${err}`)
  })
  process.on('exit', code => {
    console.error(`exit code: ${code}`)
  })

  router.get('(.*)', async ctx => {
    await handle(ctx.req, ctx.res)
    ctx.respond = false
  })
  // router.get('(.*)', (ctx) => { ctx.body = 'ok' })

  // listen
  server.listen(config.port, () => {
    console.info(`server start on port:${config.port}`)
  })
})
