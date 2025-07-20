// backend/src/__tests__/models/User.test.ts
import User, { IUser } from '../models/User';
import bcrypt from 'bcryptjs';

describe('User Model', () => {
  describe('User Creation', () => {
    it('should create a valid user', async () => {
      const userData = {
        email: 'test@example.com',
        password: 'password123',
        firstName: 'Γιάννης',
        lastName: 'Παπαδόπουλος',
      };

      const user = new User(userData);
      const savedUser = await user.save();

      expect(savedUser._id).toBeDefined();
      expect(savedUser.email).toBe('test@example.com');
      expect(savedUser.firstName).toBe('Γιάννης');
      expect(savedUser.lastName).toBe('Παπαδόπουλος');
      expect(savedUser.role).toBe('user'); // default role
      expect(savedUser.isActive).toBe(true); // default active
      expect(savedUser.password).not.toBe('password123'); // should be hashed
    });

    it('should hash password before saving', async () => {
      const userData = {
        email: 'test@example.com',
        password: 'password123',
        firstName: 'Maria',
        lastName: 'Κώστα',
      };

      const user = new User(userData);
      const savedUser = await user.save();

      const isPasswordValid = await bcrypt.compare('password123', savedUser.password);
      expect(isPasswordValid).toBe(true);
    });

    it('should fail with invalid email', async () => {
      const userData = {
        email: 'invalid-email',
        password: 'password123',
        firstName: 'Test',
        lastName: 'User',
      };

      const user = new User(userData);
      await expect(user.save()).rejects.toThrow();
    });

    it('should fail with short password', async () => {
      const userData = {
        email: 'test@example.com',
        password: '123',
        firstName: 'Test',
        lastName: 'User',
      };

      const user = new User(userData);
      await expect(user.save()).rejects.toThrow();
    });

    it('should fail with missing required fields', async () => {
      const user = new User({});
      await expect(user.save()).rejects.toThrow();
    });
  });

  describe('User Methods', () => {
    it('should correctly compare passwords', async () => {
      const userData = {
        email: 'test@example.com',
        password: 'password123',
        firstName: 'Test',
        lastName: 'User',
      };

      const user = new User(userData);
      const savedUser = await user.save();

      const isValid = await savedUser.comparePassword('password123');
      const isInvalid = await savedUser.comparePassword('wrongpassword');

      expect(isValid).toBe(true);
      expect(isInvalid).toBe(false);
    });
  });
});