/* eslint-disable no-unused-vars */
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth2';
import { User } from '../modules/user/user.model';
import { googleClient, googleSecrete } from './index';

passport.use(
  new GoogleStrategy(
    {
      clientID: googleClient as string,
      clientSecret: googleSecrete as string,
      callbackURL: 'http://localhost:8080/api/v1/auth/google/callback',
      passReqToCallback: true,
    },
    async (_request: any, _accessToken: string, _refreshToken: string, profile: any, done: (err: any, user?: any) => void) => {
      try {
        let user = await User.findOne({ googleId: profile.id });
        if (!user) {
          user = await User.findOne({ email: profile.emails?.[0].value });
        }

        if (!user) {
          user = await User.create({
            name: profile.displayName,
            username: profile.emails?.[0].value.split('@')[0],
            email: profile.emails?.[0].value,
            googleId: profile.id,
            avatar: profile.photos?.[0].value,
            password: null, 
          });
        }

        done(null, user);
      } catch (error) {
        done(error, null);
      }
    }
  )
);

// Serialize user into session
passport.serializeUser((user: any, done) => {
  done(null, user.id); // Serialize user by their ID
});

// Deserialize user from session
passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});
