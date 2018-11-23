const Koa = require('koa')
const Router = require('koa-router')
const mysql = require('mysql');
const koaBody = require('koa-body')

const app = new Koa()
const router = new Router()

const port = 5000

const connection = mysql.createConnection({
  host: "localhost",
  port: 3366,
  database: "GroceryApp",
  user: "root",
  password: ""
});


connection.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});


router
  .get('/', ctx => {
    ctx.redirect('/item')
  })

  .get('/item', async ctx => {
    console.log(Date.now() + ": " + ctx.request.method + " for " + ctx.request.url);
    // console.log(JSON.stringify(ctx.query, null, 4));
    let query = ctx.query;
    ctx.body = await new Promise((resolve, reject) => {
      if (query.id != null) {
        connection.query('SELECT * FROM product WHERE id=? LIMIT 1', [query.id], (err, rows, fields) => {
          if (err) return reject(err)
          return resolve(rows)
        })
      } else {
        let queries = {};
        if (query.nameQ != null && query.nameQ.length > 0) {
          queries["name"]= query.nameQ;
        }
        if (query.brandQ != null && query.brandQ.length > 0) {
          queries["brand"]= query.brandQ;
        }
        let sql = "";
        let where = [];
        let queriesKey = Object.keys(queries);
        if (queriesKey.length > 0) {
          sql = 'SELECT * FROM product WHERE ' + queriesKey.join(" LIKE ? AND ") + " LIKE ?";
          where = Object.values(queries).map(e=>"%"+e+"%")
        } else {
          sql = 'SELECT * FROM product';
          where = [];
        }
        console.log("SQL: ",sql)
        console.log("WHERE: ",where)
        connection.query(sql, where , (err, rows, fields) => {
          if (err) return reject(err)
          return resolve(rows)
        })
      }
    });
  })

  .post('/item', async ctx => {
    // console.log(JSON.stringify(ctx, null, 4));
    let data = ctx.request.body;
    ctx.body = await new Promise((resolve, reject) => {
      if (data.id != null) {
        connection.query('Update GroceryApp.Product set name=?, brand=?, barcode=?, currency=?, price=?, last_updated_by=?, last_updated_by=? WHERE id=?', [data.name, data.brand, data.barcode, data.currency, data.price, "server.js", new Date(), data.id], (err, rows, fields) => {
          if (err) return reject(err)
          return resolve(rows)
        })
      } else {
        connection.query('Insert Into GroceryApp.Product(name,brand,barcode,currency, price, created_by, created_at) VALUES (?,?,?,?,?,?,?)', [data.name, data.brand, data.barcode, data.currency, data.price, "server.js", new Date()], (err, rows, fields) => {
          if (err) return reject(err)
          return resolve(rows)
        })
      }
    });
  })

  .del('/item/', async ctx => {
    // console.log(JSON.stringify(ctx.query, null, 4));
    let query = ctx.query;
    ctx.body = await new Promise((resolve, reject) => {
      if (query.id == null) {
        return reject({ "status": "failed" });
      }
      connection.query('DELETE FROM product WHERE id=?', [query.id], (err, rows, fields) => {
        if (err) return reject(err)
        return resolve(rows)
      })
    });
  })

app.use(async (ctx, next) => {
  await next()
  ctx.set('Access-Control-Allow-Origin', '*')
  ctx.set('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS')
  ctx.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
})

app
  .use(koaBody())
  .use(router.allowedMethods())
  .use(router.routes())
  .use(async (ctx, next) => {
    console.log(Date.now() + ": " + ctx.request.method + " for " + ctx.request.url);
    await setTimeout(function () {
      next();
    }, 300);
  })
app.listen(port, () => console.log(`Example app listening on port ${port}!`))