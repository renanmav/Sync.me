const passport = require('passport');
const Strategy = require('passport-google-oauth').OAuth2Strategy;
const User = require('./models/User');

function auth({ server }) {
  const verify = async (accessToken, refreshToken, profile, verified) => {
    let email;
    let avatarUrl;

    if (profile.emails) {
      email = profile.email[0].value;
    }

    if (profile.photos && profile.photos.length > 0) {
      avatarUrl = profile.photos[0].value.replace('sz=50', 'sz=128');
    }

    try {
      const user = await User.signInOrSignUp({
        googleId: profile.id,
        email,
        googleToken: { accessToken, refreshToken },
        displayName: profile.displayName,
        avatarUrl,
      });
      verified(null, user);
    } catch (err) {
      verified(err);
      // eslint-disable-next-line no-console
      console.log(err);
    }
  };

  passport.use(
    new Strategy({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.ROOT_URL}/auth/google/callback`,
    }),
    verify,
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, User.publicFields(), (err, user) => {
      done(err, user);
    });
  });

  server.use(passport.initialize());
  server.use(passport.session());
}

module.exports = auth;
