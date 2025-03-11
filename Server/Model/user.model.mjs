import { model, Schema } from 'mongoose';

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
    username: {
      type: String,
      required: [true, 'Username is required'],
      unique: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    role: {
      type: String,
      enum: ['admin', 'user'], 
      default: 'user',
      required: true,
    },
    status: {
      type: String,
      enum: ['active', 'suspended', 'inactive'], 
      default: 'active',
    }
  },
  { timestamps: true }
);

export const User = model('Users', UserSchema);
