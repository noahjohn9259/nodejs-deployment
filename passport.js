const db = require('./db');
const bcrypt = require('bcrypt-nodejs');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GitHubStrategy = require('passport-github');

passport.use(new LocalStrategy(authenticate));
passport.use('local-register', new LocalStrategy({passReqToCallback: true}, register));
passport.use(new GitHubStrategy({
    clientID: '1298f3a7634c6b6f0d93',
    clientSecret: 'ac7f67661589e6fc68a3b7df248324429c5b4bf9',
    callbackURL: "http://localhost:3000/auth/github/callback"
  },
  function(accessToken, refreshToken, profile, done) {
  	console.log(profile);
  	db('users')
  		.where('oauth_provider', 'github')
  		.where('oauth_id', profile.username)
  		.first()
  		.then((user) => {
  			if(user) {
  				return done(null, user);
  			}

  			const newUser = {
  				oauth_provider: 'github',
  				oauth_id: profile.username
  			}

  			return db('users')
  				.insert(newUser)
  				.then((ids) => {
  					newUser.id = ids[0];
  					done(null, newUser);
  				})
  		})
    // User.findOrCreate({ githubId: profile.id }, function (err, user) {
    //   return done(err, user);
    // });
  }
));

function authenticate(email, password, done) {
	db('users')
		.where('email', email)
		.first()
		.then((user) => {
			if(!user || !bcrypt.compareSync(password, user.password)) {
				return done(null, false, { message: 'Invalid username and password combination' });
			}
			done(null, user);
		}, done);
}

function register(req, email, password, done) {
	db('users')
		.where('email', email)
		.first()
		.then((user) => {
			if(user) {
				return done(null, false, { message: 'an account with that email has already been created' });
			}
			if(password !== req.body.password2) {
				return done(null, false, { message: 'password don\'t match' });
			}

			const newUser = {
				first_name: req.body.first_name,
				last_name: req.body.last_name,
				email: email,
				password: bcrypt.hashSync(password),
			}
			db('users')
				.insert(newUser)
				.then((ids) => {
					newUser.id = ids[0];
					done(null, newUser);
				})
		})
}

passport.serializeUser(function(user, done) {
	done(null, user.id);
});

passport.deserializeUser(function(id, done) {
	db('users')
		.where('id', id)
		.first()
		.then((user) => {
			done(null, user);
		}, done)
});