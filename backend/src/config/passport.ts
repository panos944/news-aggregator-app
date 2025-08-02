import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User, { IUser } from '../models/User';

// Google OAuth Strategy
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID || '',
  clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
  callbackURL: process.env.GOOGLE_CALLBACK_URL || '/api/auth/google/callback'
}, async (accessToken, refreshToken, profile, done) => {
  try {
    // Check if user already exists with this Google ID
    let user = await User.findOne({ googleId: profile.id });

    if (user) {
      // User exists, return the user
      return done(null, user);
    }

    // Check if user exists with same email (link accounts)
    const existingUser = await User.findOne({ email: profile.emails?.[0]?.value });
    
    if (existingUser) {
      // Link Google account to existing user
      existingUser.googleId = profile.id;
      await existingUser.save();
      return done(null, existingUser);
    }

    // Create new user
    const newUser = new User({
      googleId: profile.id,
      email: profile.emails?.[0]?.value,
      firstName: profile.name?.givenName || profile.displayName?.split(' ')[0] || 'User',
      lastName: profile.name?.familyName || profile.displayName?.split(' ')[1] || 'Name',
      // No password needed for Google OAuth users
    });

    await newUser.save();
    return done(null, newUser);
  } catch (error) {
    console.error('Google OAuth error:', error);
    return done(error as Error);
  }
}));

// Serialize user for session
passport.serializeUser((user: any, done) => {
  done(null, user._id);
});

// Deserialize user from session
passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

export default passport; 