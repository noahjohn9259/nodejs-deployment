const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
var RedisStore = require('connect-redis')(session)
const passport = require('passport')
const authRoutes = require('./routes/auth')
const postsRoutes = require('./routes/posts')
const cache = require("./cache")
const db = require('./db')
require('./passport')
const staticAssets = __dirname + '/public'

express()
  .set('view engine', 'hjs')
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({extended: false}))
  .use(session({
    store: new RedisStore(),
    secret: '-8-(AN$c:1ENxWWz>+!GA*)$e9kPL6|o(!H|ol;[p.;63@aYl__FJKzl:pzk2XIg',
    resave: false,
    saveUninitialized: false
  }))
  .use(passport.initialize())
  .use(passport.session())
  .use(authRoutes)
  .use(postsRoutes)
  .get("/", cache.route({expire: 200, prefix: "home"}),  (req, res, next) => {

    // setTimeout(() => {
      const headlines = [
        "Fuschia is the New Black",
        "What will the Pacific Ocean do Next?",
        "Wall Street to Build Even More Walls",
      ];

      res.render("headlines", {headlines: headlines})
    // }, 2000)
  })

  // .get('/', (req, res, next) => {
  //   res.send(req.session);
  // })
  // .get('/set', (req, res, next) => {
  //   req.session.name = 'Noah';
  //   res.send(req.session);
  // })
  // .use(bodyParser.json())


  // .set('view engine', 'hjs')
  // .use(express.static(staticAssets))

  // .get('/users', (req, res, next) => {
  //   con('users').then((users) => {
  //     res.send(users);
  //   }, next)
  // })
  // .post('/users', (req, res, next) => {
  //   console.log(req.body);
  //   con('users')
  //     .insert(req.body)
  //     .then((userIds) => {
  //       res.send(userIds);
  //     }, next)
  // })
  // .get('/users/:id', (req, res, next) => {
  //   const { id } = req.params;
  //   con('users')
  //     .where('id', id)
  //     .first()
  //     .then((users) => {
  //       if(!users) {
  //         return res.send(400);
  //       }
  //       res.send(users);
  //     }, next)
  // })
  // .put('/users/:id', (req, res, next) => {
  //   const { id } = req.params;
  //   con('users')
  //     .where('id', id)
  //     .update(req.body)
  //     .then((result) => {
  //       if(result === 0) {
  //         return res.send(400);
  //       }
  //       res.send(200);
  //     }, next)
  // })
  // .delete('/users/:id', (req, res, next) => {
  //   const { id } = req.params;
  //   con('users')
  //     .where('id', id)
  //     .delete()
  //     .then((result) => {
  //       if(result === 0) {
  //         return res.send(400);
  //       }
  //       res.send(200);
  //     }, next)
  // })
  .listen(3000);