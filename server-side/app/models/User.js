import mongoose, {Schema} from 'mongoose';

let userSchema = new Schema({
  username: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 30
  },
  firstName: {
      type: String,
      required: true,
      maxlength: 50
  },
  lastName: {
      type: String,
      required: true,
      maxlength: 50
  },
  email: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 255,
      unique: true
  },
  password: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 1024
  }
}, { timestamps: true });

let User = mongoose.model('User', userSchema);

export default User;